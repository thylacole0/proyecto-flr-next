"use client";
import React from 'react';
import TablaResidentes from '../../components/tablaRes.js';
import Navbar from '../../components/navbar';
import styles from '../residentes/residentes.module.css';

const residentes = [
  { nombre: 'Residente 1', rut: '12.345.678-9', edad: 70 },
  { nombre: 'Residente 2', rut: '98.765.432-1', edad: 75 },
  { nombre: 'Residente 2', rut: '98.765.432-1', edad: 75 },
  // Agrega más residentes según tus datos reales.
];

const ResidentesPage = () => {
  return (
    <> 
    <body className={styles.body}>
      <nav >
        <Navbar /> 
      </nav>
      <section>
          <TablaResidentes residentes={residentes} />
      </section>
    </body>
  </>
)};

export default ResidentesPage;
