import React, { useState } from 'react'
import { format } from 'date-fns'
import { FaEye, FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface Usuario {
    id: number
    nombre: string
    apellido: string
    correo_electronico: string
    fecha_nacimiento: string
    url_imagenPerfil: string | null
}

interface TableUsuariosProps {
    usuarios: Usuario[]
    onVerUsuario: (id: number) => void
    onEditarUsuario: (id: number) => void
    onEliminarUsuario: (id: number) => void
}

export function TableUsuarios({
    usuarios,
    onVerUsuario,
    onEditarUsuario,
    onEliminarUsuario
}: TableUsuariosProps) {
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const indexOfLastRow = currentPage * rowsPerPage
    const indexOfFirstRow = indexOfLastRow - rowsPerPage
    const currentRows = usuarios.slice(indexOfFirstRow, indexOfLastRow)

    const totalPages = Math.ceil(usuarios.length / rowsPerPage)

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    }

    return (
        <div className="w-full">
            <div className="mb-4 flex items-center">
                <label htmlFor="rowsPerPage" className="mr-2 text-sm text-gray-700">Mostrar</label>
                <select
                    id="rowsPerPage"
                    className="border rounded px-2 py-1"
                    value={rowsPerPage}
                    onChange={(e) => setRowsPerPage(Number(e.target.value))}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={usuarios.length}>Todos</option>
                </select>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo Electrónico</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Nacimiento</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentRows.map((usuario) => (
                            <tr key={usuario.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            {usuario.url_imagenPerfil ? (
                                                <img className="h-10 w-10 rounded-full" src={usuario.url_imagenPerfil} alt={`${usuario.nombre} ${usuario.apellido}`} />
                                            ) : (
                                                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                                    <span className="text-gray-600 font-medium">{usuario.nombre[0]}{usuario.apellido[0]}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{usuario.nombre} {usuario.apellido}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{usuario.correo_electronico}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{format(new Date(usuario.fecha_nacimiento), 'dd/MM/yyyy')}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => onVerUsuario(usuario.id)}
                                        className="text-blue-600 hover:text-blue-900 mr-2"
                                    >
                                        <FaEye className="inline mr-1" /> Ver
                                    </button>
                                    <button
                                        onClick={() => onEditarUsuario(usuario.id)}
                                        className="text-yellow-600 hover:text-yellow-900 mr-2"
                                    >
                                        <FaEdit className="inline mr-1" /> Editar
                                    </button>
                                    <button
                                        onClick={() => onEliminarUsuario(usuario.id)}
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
                        Mostrando {indexOfFirstRow + 1} a {Math.min(indexOfLastRow, usuarios.length)} de {usuarios.length} resultados
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

