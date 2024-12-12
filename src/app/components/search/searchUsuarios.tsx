'use client'

import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'

interface Usuario {
    id: number
    nombre: string
    apellido: string
    correo_electronico: string
    fecha_nacimiento: string
    url_imagenPerfil: string | null
}

interface SearchUsuariosProps {
    onSearch: (results: Usuario[]) => void
    onError: (message: string) => void
}

export function SearchUsuarios({ onSearch, onError }: SearchUsuariosProps) {
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchQuery) {
                handleSearch()
            } else {
                // Si el query está vacío, carga todos los usuarios
                fetchAllUsers()
            }
        }, 300)

        return () => clearTimeout(delayDebounceFn)
    }, [searchQuery])

    const handleSearch = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuarios/buscar?q=${encodeURIComponent(searchQuery)}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                    'Accept': 'application/json'
                }
            })
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.message || 'Error en la búsqueda de usuarios')
            }
            if (data.length === 0) {
                onError('No se encontraron usuarios')
            } else {
                onSearch(data)
            }
        } catch (error) {
            console.error('Error:', error)
            onError('Error al realizar la búsqueda')
        }
    }

    const fetchAllUsers = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuarios`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                    'Accept': 'application/json'
                }
            })
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.message || 'Error al obtener usuarios')
            }
            onSearch(data)
        } catch (error) {
            console.error('Error:', error)
            onError('Error al cargar los usuarios')
        }
    }

    return (
        <div className="mb-4">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Buscar usuarios..."
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
