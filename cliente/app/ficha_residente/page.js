"use client";
import FormFicha from '../../components/formularioFicha.js';
import UploadArchivos from '../../components/uploadArchivos.js';
import Navbar from '../../components/navbar';
import React, { useEffect, useState } from 'react';
import CalendarioRes from '@/components/bitacoraRes.js';
import styles from '../ficha_residente/fichares.module.css';


const FichaPage = () => {

  return (
    <> 
      <Navbar /> 
      <section className={styles.layout}>
        <div className={styles.Form}>
          <FormFicha/>
        </div>
        <div className={styles.Adjuntos}>
          <UploadArchivos />
        </div>
        <div className={styles.Calendar}>
          <CalendarioRes/>
        </div>
      </section>
    </>
  );
};

export default FichaPage;