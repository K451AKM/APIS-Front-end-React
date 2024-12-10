'use client'

import { useState, useEffect, useRef } from 'react'
import { FaBars, FaTimes, FaUserCircle, FaSignOutAlt, FaUsers, FaThLarge, FaDragon } from 'react-icons/fa';
import Link from 'next/link'
import { useAuth } from '@/app/hooks/useAuth'

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { user, logout } = useAuth()
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <header className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between py-4">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-500 hover:text-gray-600"
                            aria-label="Abrir menú"
                        >
                            <FaBars className="h-6 w-6" />
                        </button>

                        {user && (
                            <>
                                {user.url_imagenPerfil ? (
                                    <img
                                        src={user.url_imagenPerfil}
                                        alt="Foto de perfil"
                                        className="w-10 h-10 rounded-full"
                                    />
                                ) : (
                                    <FaUserCircle className="w-10 h-10 text-gray-500" />
                                )}
                                <div className="flex flex-col">
                                    <span className="font-semibold">{user.nombre} {user.apellido}</span>
                                    <span className="text-sm text-gray-500">{user.correo_electronico}</span>
                                </div>
                            </>
                        )}
                    </div>

                    <button
                        onClick={logout}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
                    >
                        <FaSignOutAlt className="mr-2" />
                        Cerrar Sesión
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                    <div ref={menuRef} className="relative top-0 left-0 w-64 h-full bg-white shadow-md">
                        <div className="p-4">
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-600"
                                aria-label="Cerrar menú"
                            >
                                <FaTimes className="h-6 w-6" />
                            </button>
                            <nav className="mt-8 flex flex-col h-full">
                                <ul className="flex-grow">
                                    <li>
                                        <Link href="/dashboard" className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105 hover:text-blue-600">
                                            <FaThLarge className="mr-2" />
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/usuarios" className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105 hover:text-blue-600">
                                            <FaUsers className="mr-2" />
                                            Lista de Usuarios
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/pokemones" className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105 hover:text-blue-600">
                                            <FaDragon className="mr-2" />
                                            Administrar Pokémones
                                        </Link>
                                    </li>
                                    {/* Agrega más opciones de menú aquí */}
                                </ul>
                                <div className="mt-auto">
                                    <button
                                        onClick={() => {
                                            logout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="flex items-center w-full py-2 px-4 text-gray-700 hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105 hover:text-blue-600"
                                    >
                                        <FaSignOutAlt className="mr-2" />
                                        Cerrar Sesión
                                    </button>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}

