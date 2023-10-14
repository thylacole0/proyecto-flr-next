"use client";
import React from 'react';
import TablaVisitantes from '../../components/tablaVisitante.js';
import Navbar from '../../components/navbar';
import styles from '../residentes/residentes.module.css';

const visitantes = [];

const VisitantesPage = () => {
  return (
    <> 
      <nav >
        <Navbar /> 
      </nav>
      <section>
        <div className={styles.body}>
          <TablaVisitantes visitantes={visitantes} />
        </div>
        
      </section>
   
  </>
)};

export default VisitantesPage;
