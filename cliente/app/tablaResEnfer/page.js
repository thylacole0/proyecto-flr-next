"use client";
import TablaResidentesEnfermero from '../../components/tablaResEnfermero.js';
import styles from '../residentes/residentes.module.css';
import Navbar from '../../components/navbar';


const ResidentesToEnfermero = () => {
    return (
        <div>
            <Navbar />
            <section>
                <TablaResidentesEnfermero />
            </section>
        </div>
        
        
    )
};

export default ResidentesToEnfermero;