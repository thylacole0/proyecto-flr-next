"use client";
import React, { useEffect, useState} from 'react';
import styles from './tablaRes.module.css';
import BotonesCrud from './botonesCrud.js';
import BotonAdd from './botonAgregar';
import axios from 'axios';

const TablaResidentes = () => {

  const [residentes, setResidentes] = useState([]);
  
  const handleDeleteRow = (rut_res) => {
    try {
      const response = axios.delete(`http://localhost:8080/allresidentes/${rut_res}`);
      setResidentes(residentes.filter((residente) => residente.rut_res !== rut_res))

    } catch (error) {
      console.log(error);
    }
  };

  const getResidentes = async () => {

    try{
      const response = await axios.get("http://localhost:8080/allresidentes");
      const jsonDatos = await response.data;
      setResidentes(jsonDatos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getResidentes();
  }, [])

  return (
    <div className='flex justify-center min-h-screen'>
      <div className={` ${styles['table-background']} container mx-auto mt-4 rounded-t-xl `}>
        <div className="flex justify-between items-center mr-5 ml-10 pt-4 pb-4">
          <h1 className="text-3xl font-bold mb-4 text-center">Residentes</h1>
          <BotonAdd className="order-last" />
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mr-5 ml-10 pt-4 pb-4">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className='text-xs text-gray-700 uppercase dark:text-gray-400'>
              <tr className='border-b dark:border-gray-700 hover:bg-gray-300'>
                <th scope='col' className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">RUT</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nombres</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Apellidos</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Estado Civil</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de nacimiento</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Medicamentos</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {residentes.map((residente, i) => (
                <tr key={residente.rut_res} className='border-b dark:border-gray-700 hover:bg-gray-300'>
                  <td  className="px-6 py-4 text-center font-medium text-gray-500" >{residente.rut_res}</td>
                  <td className="px-6 py-4 text-center font-medium text-gray-500" >{residente.nombres_res}</td>
                  <td className="px-6 py-4 text-center font-medium text-gray-500" >{residente.apes_res}</td>
                  <td className="px-6 py-4 text-center font-medium text-gray-500" >{residente.direccion_res}</td>
                  <td className="px-6 py-4 text-center font-medium text-gray-500" >{residente.estadocivil_res}</td>
                  <td className="px-6 py-4 text-center font-medium text-gray-500" >{residente.fecha_nac_res}</td>
                  <td className="px-6 py-4 text-center font-medium text-gray-500" >{residente.medicamentos_res}</td>
                  <td>
                    <BotonesCrud handleDeleteRow={() => handleDeleteRow(residente.rut_res)} residente={residente}/>
                  </td>
                </tr>
              ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TablaResidentes;
