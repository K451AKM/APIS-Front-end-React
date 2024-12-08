"use client";

import { withAuth } from '../../app/components/auth/withAuth';
import { useAuth } from '@/app/hooks/useAuth';
import { User } from '@/app/dashboard/types'; // Importamos la interfaz User
import { FaUserCircle } from 'react-icons/fa'; // Usamos un ícono de FontAwesome para el avatar

function DashboardPage() {
    const { user, logout } = useAuth(); // Accedemos al estado 'user' y a la función 'logout'

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                {user && (
                    <div>
                        <p>Bienvenido, {user.nombre} {user.apellido}</p>
                        <p>Correo: {user.correo_electronico}</p>

                        {/* Si no hay foto de perfil, mostramos un ícono de usuario */}
                        {user.url_imagenPerfil ? (
                            <img
                                src={user.url_imagenPerfil}
                                alt="Imagen de perfil"
                                className="w-32 h-32 rounded-full"
                            />
                        ) : (
                            <FaUserCircle className="w-32 h-32 text-gray-500" /> // Ícono de usuario
                        )}
                    </div>
                )}
                <button
                    onClick={logout}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
}

export default withAuth(DashboardPage);
