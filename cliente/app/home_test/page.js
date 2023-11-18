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
import HomeVisitante from '@/components/homeVisitante';
import { Nunito } from 'next/font/google';
import { Bree_Serif } from 'next/font/google';
import { Averia_Serif_Libre } from 'next/font/google';



const bree = Bree_Serif({
  subsets: ['latin-ext'],
  weight: '400'
})

const HomeTest = () => {

  const { data: session, status } = useSession();
  console.log('session', session);
  const tipo_user = session?.tipo_user; // Aquí obtenemos el tipo_user

  console.log('tipo_user', tipo_user);

  return (
    <>
      <Navbar />
      <section className=' flex flex-col min-h-screen'>
        {tipo_user === 'Enfermero' && (
          <>
            <div className={"w-100"}>
              <h1 className={`${bree.className} text-center text-6xl font-serif mt-5 w-90 pb-10`}>Bienvenido <span className='text-pink-900 underline'>{session?.user}</span> al panel de Enfermeros</h1>
            </div>
            <BotonesHomeEnfer className="shadow rounded-md h-auto m-5 mr-5" />
          </>
        )}

        {tipo_user === 'Guardia' && (
          <>
            <div className={"w-100"}>
              <h1 className={`${bree.className} text-center text-6xl font-serif mt-5 w-90 pb-10`}>Bienvenido <span className='text-pink-900 underline'>{session?.user}</span> al panel de Guardias</h1>
            </div>
            <BotonesHomeGuardia className="shadow rounded-md h-50 m-5 mr-5" />
          </>
        )}
                {tipo_user === 'Administrador' && (
          <>
            <div className={"w-100"}>
              <h1 className={`${bree.className} text-center text-6xl font-serif mt-5 w-90 pb-10`}>Bienvenido <span className='text-pink-900 underline'>{session?.user}</span> al panel de Administración</h1>
            </div>
            <AdminPage className="shadow rounded-md h-50 m-5 mr-5" />
          </>
        )}

        <div className={"w-9/10"}>
          {tipo_user === 'Visitante' && <HomeVisitante/>}
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

