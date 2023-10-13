"use client";
import React, { useState } from 'react'; 
import TablaNurse from '../../components/tablaNurse.js';
import TablaGuardia from '../../components/tablaGuardia.js';
import Navbar from '../../components/navbar';
import styles from '../residentes/residentes.module.css';
import BotonNavega from '../../components/botonNavega.js';

const enfermeros = [
  { nombre: 'Enfermero 1', rut: '12.345.678-9', edad: 70 },
  { nombre: 'Enfermero 2', rut: '98.765.432-1', edad: 75 },
  { nombre: 'Enfermero 2', rut: '98.765.432-1', edad: 75 },
];

const guardias = [
  { nombre: 'Guardia 1', rut: '12.345.678-9', edad: 70 },
  { nombre: 'Guardia 2', rut: '98.765.432-1', edad: 75 },
  { nombre: 'Guardia 3', rut: '98.765.432-1', edad: 75 },
];

const TablasWorker = () => {
  const [tab, setTab] = useState('enfermeros'); // Estado para controlar la pestaña activa

  const handleTabChange = (newTab) => {
    setTab(newTab);
  };

  return (
    <div className={styles.body}>
      <Navbar />
      <div className="flex">
        <BotonNavega />
      </div>

      {tab === 'enfermeros' && (
        <TablaNurse enfermeros={enfermeros} /> // Componente que muestra la tabla de enfermeros
      )}

      {tab === 'guardias' && (
        <TablaGuardia guardias={guardias} /> // Componente que muestra la tabla de guardias
      )}
    </div>
  );
};

export default TablasWorker;