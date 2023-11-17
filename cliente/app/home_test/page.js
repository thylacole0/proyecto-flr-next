"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import 'tailwindcss/tailwind.css';
import Navbar from '../../components/navbar';
import { useSession } from 'next-auth/react';
import { Box, Container, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import BotonesHomeEnfer from '../../components/botonesHomeEnfermero.js';
import BotonesHomeGuardia from '../../components/botonesHomeGuardia.js';
import styles from '../home_test/home_test.module.css'
import FooterPage from '../../components/footer.js';
import AdminPage from '@/components/adminComp';



const HomeTest = () => {

  const { data: session, status } = useSession();
  console.log('session', session);
  const tipo_user = session?.tipo_user; // Aquí obtenemos el tipo_user

  console.log('tipo_user', tipo_user);

  return (
    <>
      <Navbar />
      <section className=' flex flex-col min-h-screen'>
        <div className={"w-100"}>
          <h1 className="text-center text-6xl font-serif mt-5 w-90">Bienvenido a Fundacion Las Rosas</h1>
        </div>
        <div className={"w-9/10"}>
          {tipo_user === 'Administrador' && <AdminPage className="shadow rounded-md h-auto m-5 mr-5" />}
          {tipo_user === 'Enfermero' && <BotonesHomeEnfer className="shadow rounded-md h-auto m-5 mr-5" />}
          {tipo_user === 'Guardia' && <BotonesHomeGuardia className="shadow rounded-md h-50 m-5 mr-5" />}
        </div>
      </section>
      <FooterPage />
    </>
  )
}

export default HomeTest;

// "use client";
// import React from 'react';
// import { useRouter } from 'next/router';
// import Link from 'next/link';
// import 'tailwindcss/tailwind.css';
// import Navbar from '../../components/navbar';
// import { useSession } from 'next-auth/react';
// import { Box, Container, Grid, Card, CardMedia, CardContent, Typography} from '@mui/material';
// import BotonesHomeEnfer from '../../components/botonesHomeEnfermero.js';

// const HomeTest = () => {

//   const { data: session, status } = useSession();
//   console.log('session', session);
//   const tipo_user = session?.tipo_user; // Aquí obtenemos el tipo_user

//   console.log('tipo_user', tipo_user);

//   return (
//     <div>
//       <Navbar />
//       <Box >
//         {tipo_user === 'Administrador' && <BotonesHomeEnfer />}
//       </Box>
//     </div>
//   )
// }

// export default HomeTest;

