import React, { useState } from 'react'
import { FaEye, FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface Pokemon {
    id: number
    nombre: string
    foto_url: string | null
    tipo: string
    habilidad: string
}

interface TablePokemonesProps {
    pokemones: Pokemon[]
    onVerPokemon: (pokemon: Pokemon) => void
    onEditarPokemon: (pokemon: Pokemon) => void
    onEliminarPokemon: (pokemon: Pokemon) => void
}

export function TablePokemones({
    pokemones,
    onVerPokemon,
    onEditarPokemon,
    onEliminarPokemon
}: TablePokemonesProps) {
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const indexOfLastRow = currentPage * rowsPerPage
    const indexOfFirstRow = indexOfLastRow - rowsPerPage
    const currentRows = pokemones.slice(indexOfFirstRow, indexOfLastRow)

    const totalPages = Math.ceil(pokemones.length / rowsPerPage)

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    }

    return (
        <div className="w-full px-4">
            <div className="mb-4 flex items-center">
                <span className="mr-2 text-sm text-gray-700">Mostrar</span>
                <select
                    className="border rounded px-2 py-1"
                    value={rowsPerPage}
                    onChange={(e) => setRowsPerPage(Number(e.target.value))}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={pokemones.length}>Todos</option>
                </select>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pokémon</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Habilidad</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentRows.map((pokemon) => (
                            <tr key={pokemon.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            {pokemon.foto_url ? (
                                                <img className="h-10 w-10 rounded-full" src={pokemon.foto_url} alt={pokemon.nombre} />
                                            ) : (
                                                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                                    <span className="text-gray-600 font-medium">{pokemon.nombre[0]}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{pokemon.nombre}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        {pokemon.tipo}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {pokemon.habilidad}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => onVerPokemon(pokemon)}
                                        className="text-blue-600 hover:text-blue-900 mr-2"
                                    >
                                        <FaEye className="inline mr-1" /> Ver
                                    </button>
                                    <button
                                        onClick={() => onEditarPokemon(pokemon)}
                                        className="text-yellow-600 hover:text-yellow-900 mr-2"
                                    >
                                        <FaEdit className="inline mr-1" /> Editar
                                    </button>
                                    <button
                                        onClick={() => onEliminarPokemon(pokemon)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <FaTrash className="inline mr-1" /> Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 flex justify-between items-center">
                <div>
                    <span className="text-sm text-gray-700">
                        Mostrando {indexOfFirstRow + 1} a {Math.min(indexOfLastRow, pokemones.length)} de {pokemones.length} resultados
                    </span>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                        className="px-2 py-1 border rounded text-sm disabled:opacity-50"
                    >
                        Inicio
                    </button>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-2 py-1 border rounded text-sm disabled:opacity-50"
                    >
                        <FaChevronLeft />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={`px-2 py-1 border rounded text-sm ${currentPage === pageNumber ? 'bg-blue-500 text-white' : ''}`}
                        >
                            {pageNumber}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-2 py-1 border rounded text-sm disabled:opacity-50"
                    >
                        <FaChevronRight />
                    </button>
                    <button
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                        className="px-2 py-1 border rounded text-sm disabled:opacity-50"
                    >
                        Último
                    </button>
                </div>
            </div>
        </div>
    )
}

