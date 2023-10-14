"use client";
import React from 'react';
import TablaResidentes from '../../components/tablaRes.js';
import Navbar from '../../components/navbar';
import styles from '../residentes/residentes.module.css';

const residentes = [];

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
