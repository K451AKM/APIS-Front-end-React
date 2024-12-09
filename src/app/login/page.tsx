"use client";

import { useState } from "react";
import { FaEnvelope, FaLock, FaHome } from "react-icons/fa";
import Link from "next/link"; // Importamos Link para la navegación
import { useAuth } from "@/app/hooks/useAuth";
import HeaderPrincipal2 from "../components/headers/HeaderPrincipallogin";

export default function LoginPage() {
    const [correoElectronico, setCorreoElectronico] = useState("");
    const [contraseña, setContraseña] = useState("");
    const { login, error } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(correoElectronico, contraseña);
    };

    return (
        <>
            <HeaderPrincipal2 />
            <div
                className="min-h-screen flex items-center justify-center p-4"
                style={{
                    backgroundImage: `url('/360_F_501523654_iTeRiR15SpnekpBQCWf11sip7THqF5oU.jpg')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6 space-y-4">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-900">Inicio de Sesión</h2>
                            <p className="text-sm text-gray-600 mt-1">
                                Ingresa tus credenciales para acceder a tu cuenta
                            </p>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="correoElectronico" className="block text-sm font-medium text-gray-700">
                                    Correo Electrónico
                                </label>
                                <div className="mt-1 flex items-center">
                                    <FaEnvelope className="text-gray-400 mr-2" size={20} />
                                    <input
                                        id="correoElectronico"
                                        type="email"
                                        placeholder="correo@ejemplo.com"
                                        value={correoElectronico}
                                        onChange={(e) => setCorreoElectronico(e.target.value)}
                                        required
                                        className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                  focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="contraseña" className="block text-sm font-medium text-gray-700">
                                    Contraseña
                                </label>
                                <div className="mt-1 flex items-center">
                                    <FaLock className="text-gray-400 mr-2" size={20} />
                                    <input
                                        id="contraseña"
                                        type="password"
                                        placeholder="••••••••"
                                        value={contraseña}
                                        onChange={(e) => setContraseña(e.target.value)}
                                        required
                                        className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                  focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                            {error && <div className="text-sm text-red-600 text-center">{error}</div>}
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Iniciar Sesión
                            </button>
                        </form>
                        <div className="text-center mt-4">
                            <Link href="/" passHref>
                                <button
                                    className="flex items-center justify-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                >
                                    <FaHome className="mr-2" size={20} />
                                    Volver al inicio
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
