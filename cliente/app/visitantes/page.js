"use client";
import React from 'react';
import TablaVisitantes from '../../components/tablaVisitante.js';
import Navbar from '../../components/navbar';
import styles from '../residentes/residentes.module.css';
import FooterPage from '@/components/footer.js';

const visitantes = [];

const VisitantesPage = () => {
  return (
    <> 
        <Navbar /> 
      <section className='min-h-screen'>
        <div >
          <TablaVisitantes visitantes={visitantes} />
        </div>
      </section>
      <FooterPage />
  </>
)};

export default VisitantesPage;
