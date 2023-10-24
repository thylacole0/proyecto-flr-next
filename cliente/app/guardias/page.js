"use client";
import React from 'react';
import TablaGuardias from '../../components/tablaGuardia.js';
import Navbar from '../../components/navbar';
import styles from '../residentes/residentes.module.css';

const guardias = [];

const GuardiasPage = () => {
  return (
    <>
      <Navbar />
      <section>
        <TablaGuardias guardias={guardias} />
      </section>
    </>
  )
};

export default GuardiasPage;
