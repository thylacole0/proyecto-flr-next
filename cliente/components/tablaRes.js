"use client";
import React from 'react';
import styles from './tablaRes.module.css';

const TablaResidentes = ({ residentes }) => {
  return (
    <div className={` ${styles['table-background']} container mx-auto mt-4`}>
      <h1 className="text-3xl font-bold mb-4 text-center">Lista de Residentes</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RUT</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edad</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {residentes.map((residente) => (
            <tr key={residente.rut}>
              <td className="px-6 py-4 whitespace-nowrap text-black">{residente.nombre}</td>
              <td className="px-6 py-4 whitespace-nowrap text-black">{residente.rut}</td>
              <td className="px-6 py-4 whitespace-nowrap text-black">{residente.edad} años</td>
              <td className="px-6 py-4 whitespace-nowrap text-black">
                <button className="text-blue-600 hover:underline mr-2">Editar</button>
                <button className="text-red-600 hover:underline">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaResidentes;
