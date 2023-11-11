"use client";
import FormFicha from '../../components/formularioFicha.js';
import UploadArchivos from '../../components/uploadArchivos.js';
import Navbar from '../../components/navbar';
import React, { useEffect, useState } from 'react';
import CalendarioRes from '@/components/bitacoraRes.js';
import styles from '../ficha_residente/fichares.module.css';

const rut_res = [];

const FichaPage = () => {

  console.log(rut_res)

  return (
    <> 
      <Navbar /> 
      <section className={styles.container}>
        <div className={styles.itema}>
          <FormFicha/>
        </div>
        <div className={styles.itemb}>
          <UploadArchivos rut_res = {rut_res}/>
        </div>
        <div className={styles.itemc}>
          <CalendarioRes rut_res = {rut_res}/>
        </div>
      </section>
    </>
  );
};

export default FichaPage;