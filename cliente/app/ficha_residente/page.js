"use client";
import React from 'react';
import FormFicha from '../../components/formularioFicha.js';
import Navbar from '../../components/navbar';
import styles from '../residentes/residentes.module.css';

const residentes = [];

const FichaPage = () => {
  return (
    <> 
    <body className={styles.body} >
      <nav >
        <Navbar /> 
      </nav>
      <section>
          <FormFicha residentes={residentes} />
      </section>
    </body>
  </>
)};

export default FichaPage;