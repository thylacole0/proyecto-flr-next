"use client";
import FormFicha from '../../components/formularioFicha.js';
import UploadArchivos from '../../components/uploadArchivos.js';
import Navbar from '../../components/navbar';
import styles from '../residentes/residentes.module.css';
import React, { useEffect, useState } from 'react';

const FichaPage = () => {
  return (
    <> 
      <Navbar /> 
      <section>
        <FormFicha/>
      </section>
    </>
  );
};

export default FichaPage;