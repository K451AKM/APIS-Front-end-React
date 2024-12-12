'use client'

import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'

interface Pokemon {
    id: number
    nombre: string
    foto_url: string | null
    tipo: string
    habilidad: string
}

interface SearchPokemonesProps {
    onSearch: (results: Pokemon[]) => void
    onError: (message: string) => void
}

export function SearchPokemones({ onSearch, onError }: SearchPokemonesProps) {
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchQuery) {
                handleSearch()
            } else {
                // Si el query está vacío, carga todos los pokémones
                fetchAllPokemons()
            }
        }, 300)

        return () => clearTimeout(delayDebounceFn)
    }, [searchQuery])

    const handleSearch = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pokemonoes/buscar?q=${encodeURIComponent(searchQuery)}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                    'Accept': 'application/json'
                }
            })
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.message || 'Error en la búsqueda de pokémones')
            }
            if (data.length === 0) {
                onError('No se encontraron pokémones')
            } else {
                onSearch(data)
            }
        } catch (error) {
            console.error('Error:', error)
            onError('Error al realizar la búsqueda')
        }
    }

    const fetchAllPokemons = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pokemonoes`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                    'Accept': 'application/json'
                }
            })
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.message || 'Error al obtener pokémones')
            }
            onSearch(data)
        } catch (error) {
            console.error('Error:', error)
            onError('Error al cargar los pokémones')
        }
    }

    return (
        <div className="mb-4">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Buscar pokémones..."
                    className="w-full p-2 pl-10 border rounded-md"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
            </div>
        </div>
    )
}
