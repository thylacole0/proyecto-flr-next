"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import 'tailwindcss/tailwind.css';
import Navbar from '../../components/navbar';
import { useSession } from 'next-auth/react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography
} from '@mui/material';

const HomeTest = () => {

  const { data: session, status } = useSession();

  return (
    <div>
      <Navbar />
      <Box >
        <Container maxWidth="lg">
          <Box sx={{ py: 8 }}>
            <Typography variant="h2" align="center" sx={{ mb: 4 }}>
              Bienvenido a Fundacion Las Rosas
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={12} lg={12}>
                <Card sx={{ height: '700px' }}>
                  <CardMedia
                    component="img"
                    sx={{ height: 550 }}
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
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Card sx={{ height: '700px' }}>
                  <CardMedia
                    component="img"
                    sx={{ height: 550 }}
                    image="https://assets.diarioconcepcion.cl/2017/06/Fundaci%C3%B3n-Las-Rosas-e1498600503811.jpg"
                    alt="random image"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    Programas de Apoyo a los Ancianos
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    En la Fundación Las Rosas, nos enorgullece ofrecer una amplia gama de programas diseñados para brindar apoyo y alegría a nuestros residentes. Nuestros programas incluyen atención de enfermería de alta calidad, actividades recreativas adaptadas a las necesidades individuales, y una dieta equilibrada que promueve la salud y el bienestar.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Card sx={{ height: '700px' }}>
                  <CardMedia
                    component="img"
                    sx={{ height: 550 }}
                    image="https://www.clave9.cl/wp-content/uploads/2018/01/fundacion-las-rosas.jpg"
                    alt="random image"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    Colabora con Nosotros
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    La Fundación Las Rosas no podría hacer lo que hacemos sin la ayuda de personas como tú. Tienes la oportunidad de marcar la diferencia en la vida de nuestros ancianos. Puedes colaborar con nosotros a través de donaciones generosas, dedicando tu tiempo como voluntario, o incluso organizando eventos de recaudación de fondos para apoyar nuestra causa.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </div>
  )
}

export default HomeTest;

