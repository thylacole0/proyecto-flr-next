'use client'

import React, { useEffect } from 'react';
import RegisterPage from '../../components/registration.js';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/navbar.js';
import FooterPage from '@/components/footer.js';


const RegistrationPage = () => {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            if (session.tipo_user !== 'Administrador') {
                console.log('No tienes permisos para acceder a esta pagina')
                window.location.href = '/home_test'
            } else {
                console.log('Tienes acceso a esta página')
            }
        }
    }, [session, status]);

    return (
        <>
        <Navbar />
        <div className='min-h-screen'>
            <RegisterPage  />
        </div>
        <FooterPage />
        </>
    );
};

export default RegistrationPage;
