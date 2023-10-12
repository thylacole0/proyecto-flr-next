"use client";
import React from 'react';
import TablaResidentes from '../../components/tablaRes.js';
import Navbar from '../../components/navbar';

const residentes = [
  { nombre: 'Residente 1', rut: '12.345.678-9', edad: 70 },
  { nombre: 'Residente 2', rut: '98.765.432-1', edad: 75 },
  // Agrega más residentes según tus datos reales.
];

const ResidentesPage = () => {
  return (
    <div className="p-4">
        <Navbar />
        <div>
        <TablaResidentes residentes={residentes} />
        </div>  
    </div>
  );
};

export default ResidentesPage;
