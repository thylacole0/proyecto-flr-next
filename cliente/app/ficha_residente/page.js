"use client";
import FormFicha from '../../components/formularioFicha.js';
import UploadArchivos from '../../components/uploadArchivos.js';
import Navbar from '../../components/navbar';
import styles from '../residentes/residentes.module.css';
import React, { useEffect, useState } from 'react';
import CalendarioRes from '@/components/bitacoraRes.js';

const rut_res = [];

const FichaPage = () => {

  console.log(rut_res)

  return (
    <> 
      <Navbar /> 
      <section>
        <FormFicha/>
      </section>
      <section>
            <CalendarioRes rut_res = {rut_res}/>
        </section>
    </>
  );
};

export default FichaPage;