"use client";
import React, { useEffect } from 'react';
import TablaResidentes from '../../components/tablaRes.js';
import Navbar from '../../components/navbar';

import FooterPage from '@/components/footer.js';

const residentes = [];

const ResidentesPage = () => {

  useEffect(() => {}, []);
  return (
    <> 
      <Navbar /> 
      <section className='min-h-screen'>
        <TablaResidentes residentes={residentes} />
      </section>
      <FooterPage />
    </>
  )
};

export default ResidentesPage;
