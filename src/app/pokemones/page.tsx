'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/app/components/headers/headerDs'
import { withAuth } from '@/app/components/auth/withAuth'
import { FaPlus } from 'react-icons/fa'
import { TablePokemones } from '@/app/components/tables/tablesPokemones'
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
    const [pokemonSeleccionado, setPokemonSeleccionado] = useState<Pokemon | null>(null)
    const [mostrarVerPokemon, setMostrarVerPokemon] = useState(false)
    const [mostrarEditarPokemon, setMostrarEditarPokemon] = useState(false)
    const [mostrarAgregarPokemon, setMostrarAgregarPokemon] = useState(false)

    useEffect(() => {
        fetchPokemones()
    }, [])

    const fetchPokemones = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pokemonoes`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
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
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudieron cargar los pokémones. Por favor, intente de nuevo más tarde.',
            })
        }
    }

    const handleVerPokemon = (pokemon: Pokemon) => {
        setPokemonSeleccionado(pokemon)
        setMostrarVerPokemon(true)
    }

    const handleEditarPokemon = (pokemon: Pokemon) => {
        setPokemonSeleccionado(pokemon)
        setMostrarEditarPokemon(true)
    }

    const handleEliminarPokemon = async (pokemon: Pokemon) => {
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
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pokemonoes/${pokemon.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                    }
                })
                if (!response.ok) throw new Error('Error al eliminar el pokémon')
                await fetchPokemones() // Recargar la lista de pokémones
                MySwal.fire(
                    'Eliminado!',
                    'El pokémon ha sido eliminado.',
                    'success'
                )
            } catch (error) {
                console.error('Error:', error)
                MySwal.fire(
                    'Error',
                    'No se pudo eliminar el pokémon. Por favor, intente de nuevo.',
                    'error'
                )
            }
        }
    }

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
                        <TablePokemones
                            pokemones={pokemones}
                            onVerPokemon={handleVerPokemon}
                            onEditarPokemon={handleEditarPokemon}
                            onEliminarPokemon={handleEliminarPokemon}
                        />
                    </div>
                </div>
            </main>
            {mostrarVerPokemon && pokemonSeleccionado && (
                <VerPokemon
                    pokemon={pokemonSeleccionado}
                    onClose={() => setMostrarVerPokemon(false)}
                />
            )}
            {mostrarEditarPokemon && pokemonSeleccionado && (
                <EditarPokemon
                    pokemon={pokemonSeleccionado}
                    onClose={() => setMostrarEditarPokemon(false)}
                    onUpdate={fetchPokemones}
                />
            )}
            {mostrarAgregarPokemon && (
                <AgregarPokemon
                    onClose={() => setMostrarAgregarPokemon(false)}
                    onAdd={fetchPokemones}
                />
            )}
        </div>
    )
}

export default withAuth(PokemonesPage)

