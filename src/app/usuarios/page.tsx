'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/app/components/headers/headerDs'
import { withAuth } from '@/app/components/auth/withAuth'
import { FaUserPlus } from 'react-icons/fa'
import { TableUsuarios } from '@/app/components/tables/tablasUsuarios'
import VerUsuario from '@/app/components/listaUsuarios/verusuario'
import EditarUsuario from '@/app/components/listaUsuarios/editarUsuario'
import AgregarUsuario from '@/app/components/listaUsuarios/agregarUsuario'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

interface Usuario {
    id: number
    nombre: string
    apellido: string
    correo_electronico: string
    fecha_nacimiento: string
    url_imagenPerfil: string | null
}

function UsuariosPage() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([])
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<number | null>(null)
    const [mostrarVerUsuario, setMostrarVerUsuario] = useState(false)
    const [mostrarEditarUsuario, setMostrarEditarUsuario] = useState(false)
    const [mostrarAgregarUsuario, setMostrarAgregarUsuario] = useState(false)

    useEffect(() => {
        fetchUsuarios()
    }, [])

    const fetchUsuarios = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuarios`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            })
            if (!response.ok) throw new Error('Error al obtener usuarios')
            const data = await response.json()
            setUsuarios(data)
        } catch (error) {
            console.error('Error:', error)
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudieron cargar los usuarios. Por favor, intente de nuevo más tarde.',
            })
        }
    }

    const handleVerUsuario = (id: number) => {
        setUsuarioSeleccionado(id)
        setMostrarVerUsuario(true)
    }

    const handleEditarUsuario = (id: number) => {
        setUsuarioSeleccionado(id)
        setMostrarEditarUsuario(true)
    }

    const handleEliminarUsuario = async (id: number) => {
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
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuarios/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                    }
                })
                if (!response.ok) throw new Error('Error al eliminar usuario')
                await fetchUsuarios() // Recargar la lista de usuarios
                MySwal.fire(
                    'Eliminado!',
                    'El usuario ha sido eliminado.',
                    'success'
                )
            } catch (error) {
                console.error('Error:', error)
                MySwal.fire(
                    'Error',
                    'No se pudo eliminar el usuario. Por favor, intente de nuevo.',
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
                    backgroundImage: "url('/weaves.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.2,
                }}
            ></div>

            <Header />
            <main className="container mx-auto px-4 py-8 relative">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="p-4 flex justify-between items-center border-b">
                        <h1 className="text-2xl font-bold text-gray-800">Usuarios</h1>
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center"
                            onClick={() => setMostrarAgregarUsuario(true)}
                        >
                            <FaUserPlus className="mr-2" />
                            Agregar Usuario
                        </button>
                    </div>
                    <div className="p-4">
                        <TableUsuarios
                            usuarios={usuarios}
                            onVerUsuario={handleVerUsuario}
                            onEditarUsuario={handleEditarUsuario}
                            onEliminarUsuario={handleEliminarUsuario}
                        />
                    </div>
                </div>
            </main>
            {mostrarVerUsuario && usuarioSeleccionado && (
                <VerUsuario
                    usuarioId={usuarioSeleccionado}
                    onClose={() => setMostrarVerUsuario(false)}
                />
            )}
            {mostrarEditarUsuario && usuarioSeleccionado && (
                <EditarUsuario
                    usuarioId={usuarioSeleccionado}
                    onClose={() => setMostrarEditarUsuario(false)}
                    onUpdate={fetchUsuarios}
                />
            )}
            {mostrarAgregarUsuario && (
                <AgregarUsuario
                    onClose={() => setMostrarAgregarUsuario(false)}
                    onAdd={fetchUsuarios}
                />
            )}
        </div>
    )
}

export default withAuth(UsuariosPage)

