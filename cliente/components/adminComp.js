'use client'
import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Box, Button, ButtonBase, Modal, Stack, TextField, Typography, styled, colors } from '@mui/material';
import Delete from '@mui/icons-material';
import ModeIcon from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { red, yellow } from '@mui/material/colors';
import { Grid } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Divider from '@mui/material/Divider';
import { Nunito } from 'next/font/google';
import styles from '../components/adminComp.module.css'

// const images = [
//     {
//         url: '/registro-usuarios.jpg',
//         title: 'Registrar usuarios',
//         width: '100%',
//         link: '/guardiareservas'
//     },
//     {
//         url: '/listado-usuarios.jpg',
//         title: 'Listado de usuarios',
//         width: '100%',
//         link: '/'
//     },
//     {
//         url: '/Visita-domiciliaria.jpg',
//         title: 'Ver visitas reservadas',
//         width: '100%',
//         link: '/reservasAprobadas'
//     },
// ];

// const ImageButton = styled(ButtonBase)(({ theme }) => ({
//     position: 'relative',
//     height: 350,
//     [theme.breakpoints.down('sm')]: {
//         width: '100% !important', // Overrides inline-style
//         height: 100,
//     },
//     '&:hover, &.Mui-focusVisible': {
//         zIndex: 1,
//         '& .MuiImageBackdrop-root': {
//             opacity: 0.15,
//         },
//         '& .MuiImageMarked-root': {
//             opacity: 0,
//         },
//         '& .MuiTypography-root': {
//             border: '4px solid currentColor',
//         },
//     },
// }));

// const ImageSrc = styled('span')({
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center 40%',
// });

// const Image = styled('span')(({ theme }) => ({
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     color: theme.palette.common.white,
// }));

// const ImageBackdrop = styled('span')(({ theme }) => ({
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     backgroundColor: theme.palette.common.black,
//     opacity: 0.4,
//     transition: theme.transitions.create('opacity'),
// }));

// const ImageMarked = styled('span')(({ theme }) => ({
//     height: 3,
//     width: 18,
//     backgroundColor: theme.palette.common.white,
//     position: 'absolute',
//     bottom: -2,
//     left: 'calc(50% - 9px)',
//     transition: theme.transitions.create('opacity'),
// }));
const nunito = Nunito({
    subsets: ['latin-ext'],
    weight: '900'
})

const AdminPage = () => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()


    // const handleButtonClick = (link) => {
    //     const newUrlParams = new URLSearchParams(searchParams.toString())
    //     console.log('newUrlParams', newUrlParams);
    //     newUrlParams.set('filters', ['219', '213'].join(','))
    //     router.push(`${link}?${newUrlParams}`)
    // }

    return (
        <>
            <div className={`grid lg:grid-cols-6 sm:grid-cols-1 pb-14 ${styles.gridWithDivider}`}>
                <div className={`${nunito.className} lg:row-start-1 lg:col-start-3 lg:col-span-1 flex justify-center items-center`}>
                    <div className="rounded-lg min-h-96 text-center p-4">
                        <div className="">
                            <h1 className="text-2xl mb-4 pt-5 text-color_navbar">Registrar nuevo usuario</h1>
                        </div>
                        <div className="bg-white w-[300px] h-[300px] flex justify-center items-center rounded-2xl shadow-lg hover:scale-105 hover:duration-300 ease-in-out">
                            <a href="/register">
                                <img src="/registrarusuario.svg" alt="" className="p-6" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className={`${nunito.className} lg:row-start-1 lg:col-start-2 lg:col-span-1 flex justify-center items-center`}>
                    <div className="rounded-lg min-h-96 text-center p-4">
                        <div className="bg-gray-200 rounded-lg min-h-96 text-center p-4">
                            <div>
                                <h1 className="text-2xl mb-8 text-pink-800">Registro de usuarios</h1>
                            </div>
                            <span className="text-md text-pink-900">La revisión detallada de usuarios registrados revela una interacción dinámica y enriquecedora. Los perfiles personalizados permiten a los usuarios adaptar su experiencia, mientras que el historial de actividades facilita un servicio más ágil. El acceso exclusivo a contenido fortalece la conexión con la plataforma.</span>
                        </div>
                    </div>
                </div>
                <div className="divider lg:row-start-1 lg:col-start-3 lg:col-span-1 border-r-4 h-full border-gray-300 -z-40"></div>
                <div className={`${nunito.className} lg:row-start-1 lg:col-start-5 lg:col-span-1 flex justify-center items-center`}>
                    <div className="rounded-lg min-h-96 text-center p-4">
                        <div className="bg-gray-200 rounded-lg min-h-96 text-center p-4">
                            <div>
                                <h1 className="text-2xl mb-8 text-pink-800">Visualización de visitas</h1>
                            </div>
                            <span className="text-md text-pink-900">La visualización de reservas proporciona a los administradores una visión completa y eficiente de las visitas programadas. Su diseño intuitivo permite identificar rápidamente horarios ocupados y disponibles, facilitando la gestión del flujo de visitantes. El acceso exclusivo a contenido fortalece la conexión con la plataforma.</span>
                        </div>
                    </div>
                </div>
                <div className={`${nunito.className} lg:row-start-1 lg:col-start-4 lg:col-span-1 flex justify-center items-center`}>
                    <div className="rounded-lg min-h-96 text-center p-4">
                        <div className="">
                            <h1 className="text-2xl mb-4 pt-5 text-color_navbar">Ver todas las reservas</h1>
                        </div>
                        <div className="bg-white w-[300px] h-[300px] flex justify-center items-center rounded-2xl shadow-lg hover:scale-105 hover:duration-300 ease-in-out">
                            <a href="/calendar_admin">
                                <img src="/calendar_admin.svg" alt="" className="p-6" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Sección de texto divisor */}
            <div className="grid lg:grid-cols-6 sm:grid-cols-1 gap-8 bg-color_navbar">
                <div className={`${nunito.className} lg:row-start-1 lg:col-start-2 lg:col-span-4 flex justify-center items-center`}>
                    <div className="rounded-lg min-h-96 text-center p-4">
                        <div className=" rounded-lg min-h-96 text-center p-4">
                            <div>
                                <h1 className="text-5xl mb-8 text-white">Administración de usuarios</h1>
                            </div>
                            <span className="text-2xl text-white">Como administradores, facilitamos un proceso de registro fluido y eficiente para los usuarios. La interfaz intuitiva guía a nuevos miembros a través de pasos sencillos, garantizando una incorporación sin complicaciones. La revisión del registro revela la captura de información clave de manera segura y la validación instantánea, asegurando la autenticidad de cada cuenta.</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Tercera seccion */}
            <div className="grid lg:grid-cols-6 sm:grid-cols-1 gap-8 pb-10">
                <div className={`${nunito.className} lg:row-start-1 lg:col-start-2 lg:col-span-1 flex justify-center items-center`}>
                    <div className="rounded-lg min-h-96 text-center p-4">
                        <div className="">
                            <h1 className="text-3xl mb-4 pt-5 text-color_navbar">Residentes</h1>
                        </div>
                        <div className="bg-white w-[300px] h-[300px] flex justify-center items-center rounded-2xl shadow-lg hover:scale-105 hover:duration-300 ease-in-out">
                            <a href="/residentes">
                                <img src="/fund.svg" alt="" className="p-8" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className={`${nunito.className} lg:row-start-1 lg:col-start-3 lg:col-span-1 flex justify-center items-center`}>
                    <div className="rounded-lg min-h-96 text-center p-4">
                        <div className="">
                            <h1 className="text-3xl mb-4 pt-5 text-color_navbar">Visitantes</h1>
                        </div>
                        <div className="bg-white w-[300px] h-[300px] flex justify-center items-center rounded-2xl shadow-lg hover:scale-105 hover:duration-300 ease-in-out">
                            <a href="/visitantes">
                                <img src="/visitantes.svg" alt="" className="p-10" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className={`${nunito.className} lg:row-start-1 lg:col-start-4 lg:col-span-1 flex justify-center items-center`}>
                    <div className="rounded-lg min-h-96 text-center p-4">
                        <div className="">
                            <h1 className="text-3xl mb-4 pt-5 text-color_navbar">Enfermeros</h1>
                        </div>
                        <div className="bg-white w-[300px] h-[300px] flex justify-center items-center rounded-2xl shadow-lg hover:scale-105 hover:duration-300 ease-in-out">
                            <a href="/enfermeros">
                                <img src="/enfermeros.svg" alt="" className="p-6" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className={`${nunito.className} lg:row-start-1 lg:col-start-5 lg:col-span-1 flex justify-center items-center`}>
                    <div className="rounded-lg min-h-96 text-center p-4">
                        <div className="">
                            <h1 className="text-3xl mb-4 pt-5 text-color_navbar">Guardias</h1>
                        </div>
                        <div className="bg-white w-[300px] h-[300px] flex justify-center items-center rounded-2xl shadow-lg hover:scale-105 hover:duration-300 ease-in-out">
                            <a href="/guardias">
                                <img src="/guardias.svg" alt="" className="p-6" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>


            {/* <div className="grid grid-cols-3 items-center justify-center mt-10 rounded-lg">
                {images.map((image, index) => (
                    <div className="flex justify-center rounded-xl " key={index}>
                        <ImageButton
                            focusRipple
                            key={image.title}
                            className='rounded-3xl shadow-lg'
                            style={{ width: '70%', height: '500px' }}
                            onClick={() => handleButtonClick(image.link)}>
                            <ImageSrc style={{ backgroundImage: `url(${image.url})` }} className='rounded-3xl' />
                            <ImageBackdrop className="MuiImageBackdrop-root rounded-3xl " />
                            <Image className='rounded-3xl shadow-xl'>
                                <Typography
                                    component="span"
                                    variant="subtitle1"
                                    color="inherit"
                                    sx={{
                                        position: 'relative',
                                        p: 4,
                                        pt: 2,
                                        pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                    }}>
                                    {image.title}
                                    <ImageMarked className="MuiImageMarked-root" />
                                </Typography>
                            </Image>
                        </ImageButton>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-3 items-center justify-center mt-10 rounded-lg">
                <div className='flex justify-center' >
                    <div className="block h-[500px] max-w-[600px] p-6 bg-white border border-gray-200 rounded-lg shadow-2xl hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ">
                        <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white flex justify-center">Revisión de usuarios registrados</h5>
                        <Divider key="1" className="bg-white mb-4" />
                        <p className="font-normal text-2xl text-gray-700 dark:text-gray-400">La revisión detallada de usuarios registrados revela una interacción dinámica y enriquecedora. Los perfiles personalizados permiten a los usuarios adaptar su experiencia, mientras que el historial de actividades facilita un servicio más ágil. El acceso exclusivo a contenido premium fortalece la conexión con la plataforma.</p>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className="block h-[500px] max-w-[600px] p-6 bg-white border border-gray-200 rounded-lg shadow-2xl hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white flex justify-center">Registro de usuarios registrados</h5>
                        <Divider key="2" className="bg-white mb-4" />
                        <p className="font-normal text-2xl text-gray-700 dark:text-gray-400">Como administradores, facilitamos un proceso de registro fluido y eficiente para los usuarios. La interfaz intuitiva guía a nuevos miembros a través de pasos sencillos, garantizando una incorporación sin complicaciones. La revisión del registro revela la captura de información clave de manera segura y la validación instantánea, asegurando la autenticidad de cada cuenta.</p>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div  className="block h-[500px] max-w-[600px] p-6 bg-white border border-gray-200 rounded-lg shadow-2xl hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white flex justify-center">Visualización de visitas</h5>
                        <Divider key="3" className="bg-white mb-4"/>
                        <p className="font-normal text-2xl text-gray-700 dark:text-gray-400">La herramienta de visualización de reservas proporciona a los administradores una visión completa y eficiente de las visitas programadas. Su diseño intuitivo permite identificar rápidamente horarios ocupados y disponibles, facilitando la gestión del flujo de visitantes. La revisión de reservas incluye detalles esenciales como nombres, fechas y preferencias de los visitantes, con funciones de filtrado y búsqueda para una navegación sencilla. Además, las notificaciones automáticas mantienen a los administradores actualizados en tiempo real.</p>
                    </div>
                </div>
            </div> */}
        </>

    );
}

export default AdminPage