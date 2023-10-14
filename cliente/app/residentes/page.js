"use client";
import React from 'react';
import TablaResidentes from '../../components/tablaRes.js';
import Navbar from '../../components/navbar';
import styles from '../residentes/residentes.module.css';

const residentes = [];

const ResidentesPage = () => {
  return (
    <> 
      <nav >
        <Navbar /> 
      </nav>
      <section>
        <div className={styles.body}>
          <TablaResidentes residentes={residentes} />
        </div>
        
      </section>
   
  </>
)};

export default ResidentesPage;
