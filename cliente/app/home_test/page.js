"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import 'tailwindcss/tailwind.css';
import Navbar from '../../components/navbar';
import { useSession } from 'next-auth/react';
import { Box, Container, Grid, Card, CardMedia, CardContent, Typography} from '@mui/material';
import BotonesHomeEnfer from '../../components/botonesHomeEnfermero.js';
import styles from '../home_test/home_test.module.css'



const HomeTest = () => {

  const { data: session, status } = useSession();
  console.log('session', session);
  const tipo_user = session?.tipo_user; // Aquí obtenemos el tipo_user

  console.log('tipo_user', tipo_user);

  return (
    <div>
      <Navbar />
      <section className={styles.layout}>
        <div className={styles.Titulo + " w-100"}>
          <h1 className="text-center text-6xl font-serif mt-5 w-90">Bienvenido a Fundacion Las Rosas</h1>
        </div>
        <div className={styles.Info + "flex justify-center"}>
                <Card className="shadow rounded w-[65%] ml-20">
                  <CardMedia
                    component="img"
                    image="https://solcorchile.com/wp-content/uploads/2020/09/fundacion-las-rosas-solcor-2.jpg"
                    alt="random image"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Nuestra Inspiradora Historia
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      La Fundación Las Rosas nació de un profundo amor por los ancianos y
                      el deseo de proporcionarles un hogar cálido y amoroso. En 1965, Don Juan y Doña María, inspirados por su profundo compromiso con la comunidad,
                      abrieron las puertas de la primera residencia para ancianos en Chile. Desde entonces, hemos estado comprometidos en brindar apoyo,
                      cuidado y compañía a los ancianos más vulnerables de nuestro país.
                    </Typography>
                  </CardContent>
                </Card>
        </div>
        <div className={styles.Boton + "w-9/10"}>
          {tipo_user === 'Enfermero' && <BotonesHomeEnfer className="shadow rounded-md h-auto m-5 mr-5" />}
        </div>
      </section>
      
    </div>
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

