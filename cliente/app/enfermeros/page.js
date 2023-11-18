"use client";
import React from 'react';
import TablaEnfermeros from '../../components/tablaEnfermero.js';
import Navbar from '../../components/navbar';
import styles from '../residentes/residentes.module.css';
import FooterPage from '@/components/footer.js';

const enfermeros = [];

const EnfermerosPage = () => {
  return (
    <>
      <Navbar />
      <section className='min-h-screen'>
        <TablaEnfermeros enfermeros={enfermeros} />
      </section>
      <FooterPage />
    </>
  )
};

export default EnfermerosPage;
