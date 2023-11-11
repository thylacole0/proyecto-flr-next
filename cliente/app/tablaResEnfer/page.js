"use client";
import React, { useEffect } from 'react';
import TablaResidentesEnfermero from '../../components/tablaResEnfermero.js';
import Navbar from '../../components/navbar';
import styles from '../residentes/residentes.module.css';

const residentes = [];

const ResidentesToEnfermero = () => {
    useEffect(() => {}, []);
    return (
        <> 
        <Navbar /> 
        <section>
            <TablaResidentesEnfermero residentes={residentes} />
        </section>
        </>
    )
};

export default ResidentesToEnfermero;