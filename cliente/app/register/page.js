'use client'

import React, { useEffect } from 'react';
import RegisterPage from '../../components/registration.js';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/navbar.js';

const RegistrationPage = () => {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            if (session.tipo_user !== 'Administrador') {
                console.log('No tienes permisos para acceder a esta pagina')
                redirect('/home_test')
            } else {
                console.log('Tienes acceso a esta página')
            }
        }
    }, [session, status]);

    return (
        <>
        <Navbar />
        <div>
            <RegisterPage  />
        </div>
        </>
    );
};

export default RegistrationPage;
