"use client";
import React from 'react';
import styles from './tablaRes.module.css';
import BotonesCrud from './botonesCrud.js';
import BotonAdd from './botonAgregar';

const TablaGuardia = ({ guardias }) => {
  return (
    <div className='min-h-screen'>
      <div className={` ${styles['table-background']} container flex-auto mx-auto mt-4 w-1/2 rounded-t-xl`}>
      <div className="flex justify-between items-center mr-5 ml-10 pt-4 pb-4">
        <h1 className="text-3xl font-bold mb-4 text-center">Guardias</h1>
        <BotonAdd className="order-last"/>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">RUT</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Edad</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {guardias.map((guardias) => (
            <tr key={guardias.rut}>
              <td className="px-6 py-4 whitespace-nowrap text-black">{guardias.nombre}</td>
              <td className="px-6 py-4 whitespace-nowrap text-black">{guardias.rut}</td>
              <td className="px-6 py-4 whitespace-nowrap text-black">{guardias.edad} años</td>
              <td>
                <BotonesCrud />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default TablaGuardia;
