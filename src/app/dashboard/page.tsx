'use client'

import { withAuth } from '@/app/components/auth/withAuth'
import { Header } from '@/app/components/headers/headerDs'
import { useAuth } from '@/app/hooks/useAuth'
import { FaUsers, FaPaw } from 'react-icons/fa'
import Link from 'next/link'

function DashboardPage() {
    const { user } = useAuth()

    return (
        <div className="min-h-screen relative">
            {/* Fondo con la imagen */}
            <div
                className="absolute inset-0 -z-10"
                style={{
                    backgroundImage: "url('/weaves.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.2, // Aplica opacidad a la imagen
                }}
            ></div>

            <Header />
            <div className="relative max-w-7xl mx-auto p-6">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                        {user && (
                            <div>
                                <p className="text-lg font-semibold">
                                    Bienvenido, {user.nombre} {user.apellido}
                                </p>
                                <p className="text-gray-600">{user.correo_electronico}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-12 text-center flex justify-center space-x-4">
                    <Link
                        href="/usuarios"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full inline-flex items-center transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        <FaUsers className="mr-2" />
                        <span>Administrar Usuarios</span>
                    </Link>
                    <Link
                        href="/pokemones"
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-full inline-flex items-center transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        <FaPaw className="mr-2" />
                        <span>Administrar Pokémones</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default withAuth(DashboardPage)

