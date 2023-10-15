"use client";
import React from 'react';
import TablaGuardias from '../../components/tablaGuardia.js';
import Navbar from '../../components/navbar';
import styles from '../residentes/residentes.module.css';

const guardias = [];

const GuardiasPage = () => {
  return (
    <> 
    <body className={styles.body} >
      <nav >
        <Navbar /> 
      </nav>
      <section>
          <TablaGuardias guardias={guardias} />
      </section>
    </body>
  </>
)};

export default GuardiasPage;
