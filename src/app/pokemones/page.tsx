'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/app/components/headers/headerDs'
import { withAuth } from '@/app/components/auth/withAuth'
import {
    FaSearch, FaEdit, FaTrash, FaPlus, FaChevronLeft, FaChevronRight,
    FaEye, FaAngleDoubleLeft, FaAngleDoubleRight
} from 'react-icons/fa'
import VerPokemon from '@/app/components/listapokemones/verpokemones'
import EditarPokemon from '@/app/components/listapokemones/editarpokemon'
import AgregarPokemon from '@/app/components/listapokemones/agregarpokemon'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

interface Pokemon {
    id: number
    nombre: string
    foto_url: string | null
    tipo: string
    habilidad: string
}

function PokemonesPage() {
    const [pokemones, setPokemones] = useState<Pokemon[]>([])
    const [busqueda, setBusqueda] = useState('')
    const [paginaActual, setPaginaActual] = useState(1)
    const [pokemonesPorPagina, setPokemonesPorPagina] = useState(10)
    const [pokemonSeleccionado, setPokemonSeleccionado] = useState<Pokemon | null>(null)
    const [mostrarVerPokemon, setMostrarVerPokemon] = useState(false)
    const [mostrarEditarPokemon, setMostrarEditarPokemon] = useState(false)
    const [mostrarAgregarPokemon, setMostrarAgregarPokemon] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchPokemones = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const token = localStorage.getItem('auth_token')
            if (!token) {
                throw new Error('No se encontró el token de autenticación')
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pokemonoes`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || 'Error al obtener pokémones')
            }

            const data = await response.json()
            setPokemones(data)
        } catch (error) {
            console.error('Error:', error)
            setError(error instanceof Error ? error.message : 'Error desconocido al obtener pokémones')
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudieron cargar los pokémones. Por favor, intente de nuevo más tarde.',
            })
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchPokemones()
    }, [])

    const handleEliminarPokemon = async (pokemon: Pokemon) => {
        try {
            const result = await MySwal.fire({
                title: '¿Estás seguro?',
                text: "No podrás revertir esta acción!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar!',
                cancelButtonText: 'Cancelar'
            })

            if (result.isConfirmed) {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pokemonoes/${pokemon.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                    }
                })

                if (!response.ok) {
                    throw new Error('Error al eliminar el pokémon')
                }

                await fetchPokemones() // Recargar la lista después de eliminar
                MySwal.fire(
                    'Eliminado!',
                    'El pokémon ha sido eliminado.',
                    'success'
                )
            }
        } catch (error) {
            console.error('Error:', error)
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo eliminar el pokémon. Por favor, intente de nuevo.',
            })
        }
    }

    const pokemonesFiltrados = pokemones.filter(pokemon =>
        pokemon.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        pokemon.tipo.toLowerCase().includes(busqueda.toLowerCase()) ||
        pokemon.habilidad.toLowerCase().includes(busqueda.toLowerCase())
    )

    const indexOfLastPokemon = paginaActual * pokemonesPorPagina
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonesPorPagina
    const pokemonesActuales = pokemonesFiltrados.slice(indexOfFirstPokemon, indexOfLastPokemon)
    const totalPaginas = Math.ceil(pokemonesFiltrados.length / pokemonesPorPagina)

    const cambiarPagina = (numeroPagina: number) => setPaginaActual(numeroPagina)
    const irAPrimeraPagina = () => setPaginaActual(1)
    const irAUltimaPagina = () => setPaginaActual(totalPaginas)

    return (
        <div className="min-h-screen relative">
            <div
                className="absolute inset-0 -z-10"
                style={{
                    backgroundImage: "url('/wabesr.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.2,
                }}
            ></div>
            <Header />
            <main className="container mx-auto px-4 py-8 relative">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="p-4 flex justify-between items-center border-b">
                        <h1 className="text-2xl font-bold text-gray-800">Pokémones</h1>
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center"
                            onClick={() => setMostrarAgregarPokemon(true)}
                        >
                            <FaPlus className="mr-2" />
                            Agregar Pokémon
                        </button>
                    </div>
                    <div className="p-4">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center flex-1 mr-4">
                                <FaSearch className="text-gray-400 mr-2" />
                                <input
                                    type="text"
                                    placeholder="Buscar pokémones..."
                                    className="w-full p-2 border rounded-md"
                                    value={busqueda}
                                    onChange={(e) => setBusqueda(e.target.value)}
                                />
                            </div>
                            <select
                                className="p-2 border rounded-md"
                                value={pokemonesPorPagina}
                                onChange={(e) => setPokemonesPorPagina(Number(e.target.value))}
                            >
                                <option value={5}>5 por página</option>
                                <option value={10}>10 por página</option>
                                <option value={20}>20 por página</option>
                                <option value={pokemonesFiltrados.length}>Mostrar todos</option>
                            </select>
                        </div>
                        {isLoading ? (
                            <p>Cargando pokémones...</p>
                        ) : error ? (
                            <p className="text-red-500">Error: {error}</p>
                        ) : (
                            <>
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-indigo-100 text-gray-600 uppercase text-sm leading-normal">
                                            <th className="py-3 px-6 text-left">Nombre</th>
                                            <th className="py-3 px-6 text-left">Tipo</th>
                                            <th className="py-3 px-6 text-left">Habilidad</th>
                                            <th className="py-3 px-6 text-center">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 text-sm font-light">
                                        {pokemonesActuales.map((pokemon) => (
                                            <tr key={pokemon.id} className="border-b border-gray-200 hover:bg-gray-100">
                                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="mr-2">
                                                            {pokemon.foto_url ? (
                                                                <img
                                                                    className="w-12 h-12 rounded-full object-cover"
                                                                    src={pokemon.foto_url}
                                                                    alt={`Imagen de ${pokemon.nombre}`}
                                                                />
                                                            ) : (
                                                                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                                                                    <span className="text-gray-600 font-medium">{pokemon.nombre[0]}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <span>{pokemon.nombre}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-left">{pokemon.tipo}</td>
                                                <td className="py-3 px-6 text-left">{pokemon.habilidad}</td>
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs flex items-center"
                                                            onClick={() => {
                                                                setPokemonSeleccionado(pokemon)
                                                                setMostrarVerPokemon(true)
                                                            }}
                                                        >
                                                            <FaEye className="mr-1" />
                                                            Ver
                                                        </button>
                                                        <button
                                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-xs flex items-center"
                                                            onClick={() => {
                                                                setPokemonSeleccionado(pokemon)
                                                                setMostrarEditarPokemon(true)
                                                            }}
                                                        >
                                                            <FaEdit className="mr-1" />
                                                            Editar
                                                        </button>
                                                        <button
                                                            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs flex items-center"
                                                            onClick={() => handleEliminarPokemon(pokemon)}
                                                        >
                                                            <FaTrash className="mr-1" />
                                                            Eliminar
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="flex justify-between items-center mt-4">
                                    <div>
                                        Mostrando {indexOfFirstPokemon + 1} - {Math.min(indexOfLastPokemon, pokemonesFiltrados.length)} de {pokemonesFiltrados.length} pokémones
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={irAPrimeraPagina}
                                            disabled={paginaActual === 1}
                                            className="px-3 py-1 border rounded-md disabled:opacity-50"
                                        >
                                            <FaAngleDoubleLeft />
                                        </button>
                                        <button
                                            onClick={() => cambiarPagina(paginaActual - 1)}
                                            disabled={paginaActual === 1}
                                            className="px-3 py-1 border rounded-md disabled:opacity-50"
                                        >
                                            <FaChevronLeft />
                                        </button>
                                        {[...Array(totalPaginas)].map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => cambiarPagina(index + 1)}
                                                className={`px-3 py-1 border rounded-md ${paginaActual === index + 1 ? 'bg-blue-500 text-white' : ''}`}
                                            >
                                                {index + 1}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => cambiarPagina(paginaActual + 1)}
                                            disabled={paginaActual === totalPaginas}
                                            className="px-3 py-1 border rounded-md disabled:opacity-50"
                                        >
                                            <FaChevronRight />
                                        </button>
                                        <button
                                            onClick={irAUltimaPagina}
                                            disabled={paginaActual === totalPaginas}
                                            className="px-3 py-1 border rounded-md disabled:opacity-50"
                                        >
                                            <FaAngleDoubleRight />
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </main>
            {mostrarVerPokemon && pokemonSeleccionado && (
                <VerPokemon
                    pokemon={pokemonSeleccionado}
                    onClose={() => {
                        setMostrarVerPokemon(false)
                        setPokemonSeleccionado(null)
                    }}
                />
            )}
            {mostrarEditarPokemon && pokemonSeleccionado && (
                <EditarPokemon
                    pokemon={pokemonSeleccionado}
                    onClose={() => {
                        setMostrarEditarPokemon(false)
                        setPokemonSeleccionado(null)
                    }}
                    onUpdate={async () => {
                        await fetchPokemones()
                        setMostrarEditarPokemon(false)
                        setPokemonSeleccionado(null)
                    }}
                />
            )}
            {mostrarAgregarPokemon && (
                <AgregarPokemon
                    onClose={() => setMostrarAgregarPokemon(false)}
                    onAdd={async () => {
                        await fetchPokemones()
                        setMostrarAgregarPokemon(false)
                    }}
                />
            )}
        </div>
    )
}

export default withAuth(PokemonesPage)

