"use client";
import React from 'react';
import TablaEnfermeros from '../../components/tablaEnfermero.js';
import Navbar from '../../components/navbar';
import styles from '../residentes/residentes.module.css';

const enfermeros = [];

const EnfermerosPage = () => {
  return (
    <>
      <Navbar />
      <section>
        <TablaEnfermeros enfermeros={enfermeros} />
      </section>
    </>
  )
};

export default EnfermerosPage;
