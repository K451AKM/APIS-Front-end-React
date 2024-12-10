'use client'

import { useState, useRef } from 'react'
import { FaTimes, FaPaw } from 'react-icons/fa'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

interface EditarPokemonProps {
    pokemon: Pokemon
    onClose: () => void
    onUpdate: (updatedPokemon: Pokemon) => void
}

interface Pokemon {
    id: number
    nombre: string
    tipo: string
    habilidad: string
    foto_url: string | null
}

const POKEMON_TYPES = [
    'Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice',
    'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic',
    'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'
]

export default function EditarPokemon({ pokemon, onClose, onUpdate }: EditarPokemonProps) {
    const [formData, setFormData] = useState<Pokemon>({
        id: pokemon.id,
        nombre: pokemon.nombre,
        tipo: pokemon.tipo,
        habilidad: pokemon.habilidad,
        foto_url: pokemon.foto_url
    })
    const [previewImage, setPreviewImage] = useState<string | null>(pokemon.foto_url)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const formDataToSend = new FormData()

        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                formDataToSend.append(key, value.toString())
            }
        })

        if (fileInputRef.current?.files?.[0]) {
            formDataToSend.append('imagen', fileInputRef.current.files[0])
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pokemonoes/${pokemon.id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                    'X-HTTP-Method-Override': 'PUT',
                },
                body: formDataToSend
            })

            if (!response.ok) throw new Error('Error al actualizar Pokémon')

            const updatedPokemon = await response.json()
            onUpdate(updatedPokemon)
            MySwal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Pokémon actualizado correctamente',
            })
        } catch (error) {
            console.error('Error al actualizar Pokémon:', error)
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo actualizar el Pokémon. Por favor, intente de nuevo.',
            })
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold">Editar Pokémon</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FaTimes className="w-5 h-5" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-4 space-y-4">
                        <div className="flex flex-col items-center">
                            {previewImage ? (
                                <img
                                    src={previewImage}
                                    alt="Vista previa"
                                    className="w-32 h-32 rounded-full object-cover mb-2"
                                />
                            ) : (
                                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                                    <FaPaw className="w-16 h-16 text-gray-400" />
                                </div>
                            )}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                accept="image/*"
                                className="hidden"
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2"
                            >
                                Cambiar foto
                            </button>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Nombre</label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Tipo</label>
                            <select
                                name="tipo"
                                value={formData.tipo}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            >
                                <option value="">Seleccionar Tipo</option>
                                {POKEMON_TYPES.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Habilidad</label>
                            <input
                                type="text"
                                name="habilidad"
                                value={formData.habilidad}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-b-lg flex gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

