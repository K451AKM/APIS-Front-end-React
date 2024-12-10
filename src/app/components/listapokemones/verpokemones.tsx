'use client'

import { FaTimes, FaPaw } from 'react-icons/fa'

interface VerPokemonProps {
    pokemon: Pokemon
    onClose: () => void
}

interface Pokemon {
    id: number
    nombre: string
    tipo: string
    habilidad: string
    foto_url: string | null
}

export default function VerPokemon({ pokemon, onClose }: VerPokemonProps) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold">Detalles del Pokémon</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FaTimes className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-4">
                    <div className="flex flex-col items-center mb-6">
                        {pokemon.foto_url ? (
                            <img
                                src={pokemon.foto_url}
                                alt={`Imagen de ${pokemon.nombre}`}
                                className="w-32 h-32 rounded-full object-cover mb-2"
                            />
                        ) : (
                            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                                <FaPaw className="w-16 h-16 text-gray-400" />
                            </div>
                        )}
                        <h3 className="text-lg font-semibold">{pokemon.nombre}</h3>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Tipo</label>
                            <p className="mt-1">{pokemon.tipo}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Habilidad</label>
                            <p className="mt-1">{pokemon.habilidad}</p>
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-b-lg">
                    <button
                        onClick={onClose}
                        className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    )
}
