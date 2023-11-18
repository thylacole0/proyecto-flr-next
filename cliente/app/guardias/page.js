"use client";
import React from 'react';
import TablaGuardias from '../../components/tablaGuardia.js';
import Navbar from '../../components/navbar';
import styles from '../residentes/residentes.module.css';
import FooterPage from '@/components/footer.js';

const guardias = [];

const GuardiasPage = () => {
  return (
    <>
      <Navbar />
      <section className='min-h-screen'>
        <TablaGuardias guardias={guardias} />
      </section>
      <FooterPage />
    </>
  )
};

export default GuardiasPage;
