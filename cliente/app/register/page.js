import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route.js';
import RegisterPage from '../../components/registration.js';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';


const RegistrationPage = async () => {

    const session = await getServerSession(authOptions);
    console.log(session)

    if (session?.tipo_user === 'Administrador') {
        console.log('Tienes acceso a esta página')
    } else {
        console.log('No tienes permisos para acceder a esta pagina')
        redirect('/home_test')
    }

    return (
        <div>
            <RegisterPage  />
        </div>
    );
};

export default RegistrationPage;
