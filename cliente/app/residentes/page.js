"use client";
import React, { useEffect } from 'react';
import TablaResidentes from '../../components/tablaRes.js';
import Navbar from '../../components/navbar';
import styles from '../residentes/residentes.module.css';

const residentes = [];

const ResidentesPage = () => {

  useEffect(() => {}, []);
  return (
    <> 
      <Navbar /> 
      <section>
        <TablaResidentes residentes={residentes} />
      </section>
    </>
  )
};

export default ResidentesPage;
