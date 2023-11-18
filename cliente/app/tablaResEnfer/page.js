"use client";
import TablaResidentesEnfermero from '../../components/tablaResEnfermero.js';
import styles from '../residentes/residentes.module.css';
import Navbar from '../../components/navbar';
import FooterPage from '@/components/footer.js';


const ResidentesToEnfermero = () => {
    return (
        <>
            <Navbar />
            <section className='min-h-screen'>
                <TablaResidentesEnfermero />
            </section>
            <FooterPage />
        </>
        
    )
};

export default ResidentesToEnfermero;