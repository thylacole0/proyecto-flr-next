"use client";
import React, { useEffect, useState} from 'react';
import styles from './tablaRes.module.css';
import BotonesCrud from './botonesCrudVis.js';
import BotonAdd from './botonAgregar';
import axios from 'axios';

const TablaVisitantes = () => {

  const [visitantes, setVisitantes] = useState([]);
  
  const handleDeleteRow = (rut) => {
    try {
      const response = axios.delete(`http://localhost:8080/allvisitantes/${rutVis}`);
      setVisitantes(visitantes.filter((visitante) => visitante.rut !== rut))

    } catch (error) {
      console.log(error);
    }
  };

  const getVisitantes = async () => {

    try{
      const response = await axios.get("http://localhost:8080/allvisitantes");
      const jsonDatos = await response.data;
      console.log(jsonDatos); 
      setVisitantes(jsonDatos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVisitantes();
  }, [])

  return (
    <div className='flex justify-center '>
      <div className={` ${styles['table-background']} container mx-auto mt-4 rounded-t-xl `}>
        <div className="flex justify-between items-center mr-5 ml-10 pt-4 pb-4">
          <h1 className="text-3xl font-bold mb-4 text-center">Visitantes</h1>
          <BotonAdd className="order-last" />
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mr-5 ml-10 pt-4 pb-4">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className='text-xs text-gray-700 uppercase dark:text-gray-400'>
              <tr className='border-b dark:border-gray-700 hover:bg-gray-300'>
                <th scope='col' className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">RUT</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nombres</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Apellidos</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Celular</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Direccion</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Rut Residente Asociado</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {visitantes.map((visitante, i) => (
                <tr key={visitante.rut} className='border-b dark:border-gray-700 hover:bg-gray-300'>
                  <td  className="px-6 py-4 text-center font-medium text-gray-500" >{visitante.rut}</td>
                  <td className="px-6 py-4 text-center font-medium text-gray-500" >{visitante.nombres_vis}</td>
                  <td className="px-6 py-4 text-center font-medium text-gray-500" >{visitante.apes_vis}</td>
                  <td className="px-6 py-4 text-center font-medium text-gray-500" >{visitante.email_vis}</td>
                  <td className="px-6 py-4 text-center font-medium text-gray-500" >{visitante.telefono_vis}</td>
                  <td className="px-6 py-4 text-center font-medium text-gray-500" >{visitante.direccion_vis}</td>
                  <td className="px-6 py-4 text-center font-medium text-gray-500" >{visitante.rut_residente}</td>
                  <td>
                    <BotonesCrud handleDeleteRow={() => handleDeleteRow(visitante.rut)} visitante={visitante}/>
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

export default TablaVisitantes;
