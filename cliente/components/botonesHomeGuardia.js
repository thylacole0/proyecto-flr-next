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
import { Nunito } from 'next/font/google';
import { Bree_Serif } from 'next/font/google';

const nunito = Nunito({
    subsets: ['latin-ext'],
    weight: '900'
});

const bree = Bree_Serif({
    subsets: ['latin-ext'],
    weight: '400'
})

// const images = [
//     {
//         url: '/boton_reservas_guardia.png',
//         title: 'Calendario de Visitas',
//         width: '100%',
//         link: '/guardiareservas'
//     },
//     {
//         url: '/confirmar_asistencia_buton.jpg',
//         title: 'Confirmar Asistencia',
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


const BotonesHomeGuardia = () => {

    // const pathname = usePathname()
    // const searchParams = useSearchParams()
    // const router = useRouter()

    // const handleButtonClick = (link) => {
    //     const newUrlParams = new URLSearchParams(searchParams.toString())
    //     console.log('newUrlParams', newUrlParams);
    //     newUrlParams.set('filters', ['219', '213'].join(','))
    //     router.push(`${link}?${newUrlParams}`)
    // }

    return (
        <>
            <div className={`grid lg:grid-cols-6 sm:grid-cols-1 pb-14`}>
                <div className={`${nunito.className} lg:row-start-1 lg:col-start-3 lg:col-span-1 flex justify-center items-center`}>
                    <div className="rounded-lg min-h-96 text-center p-4">
                        <div className="">
                            <h1 className="text-2xl mb-4 pt-5 text-color_navbar">Ver solicitudes de visita</h1>
                        </div>
                        <div className="bg-white w-[300px] h-[300px] flex justify-center items-center rounded-2xl shadow-lg hover:scale-105 hover:duration-300 ease-in-out">
                            <a href="/guardiareservas">
                                <img src="/solicitudes_visita.svg" alt="" className="p-6" />
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
                            <span className="text-md text-gray-600">La visualización de solicitudes de reserva proporciona a los guardias una interfaz eficiente para revisar y gestionar solicitudes pendientes. Con detalles claros sobre fecha, hora y motivo, el guardia puede tomar decisiones informadas. La capacidad de aprobar o rechazar directamente desde la plataforma agiliza el proceso, mejorando la eficiencia operativa y garantizando un control efectivo sobre el acceso a las instalaciones.</span>
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
                            <span className="text-md text-gray-600">La visualización y confirmación de asistencia para visitas reservadas y aprobadas ofrecen a los participantes una interfaz intuitiva. Con detalles detallados sobre la fecha y hora de la visita, los usuarios pueden confirmar su asistencia de manera rápida y sencilla. Esta funcionalidad no solo optimiza la logística, sino que también asegura una gestión eficiente de la capacidad, garantizando una experiencia fluida para todos los involucrados.</span>
                        </div>
                    </div>
                </div>
                <div className={`${nunito.className} lg:row-start-1 lg:col-start-4 lg:col-span-1 flex justify-center items-center`}>
                    <div className="rounded-lg min-h-96 text-center p-4">
                        <div className="">
                            <h1 className="text-2xl mb-4 pt-5 text-color_navbar">Asistencia de visitas</h1>
                        </div>
                        <div className="bg-white w-[300px] h-[300px] flex justify-center items-center rounded-2xl shadow-lg hover:scale-105 hover:duration-300 ease-in-out">
                            <a href="/reservasAprobadas">
                                <img src="/calendar_admin.svg" alt="" className="p-6" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
        // <div className="grid grid-cols-2 items-center justify-center mt-10 rounded-lg">
        //     {images.map((image, index) => (
        //         <div className="flex justify-center rounded-xl" key={index}>
        //             <ImageButton

        //                 focusRipple
        //                 key={image.title}
        //                 className='rounded-3xl'
        //                 style={{ width: '70%', height: '500px'}}
        //                 onClick={() => handleButtonClick(image.link)}>
        //                 <ImageSrc style={{ backgroundImage: `url(${image.url})` }} className='rounded-3xl'/>
        //                 <ImageBackdrop className="MuiImageBackdrop-root rounded-3xl" />
        //                 <Image className='rounded-3xl'>
        //                     <Typography
        //                         className={`${bree.className} text-2xl font-bold`}
        //                         component="span"
        //                         variant="subtitle1"
        //                         color="inherit"
        //                         sx={{
        //                             position: 'relative',
        //                             p: 4,
        //                             pt: 2,
        //                             pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
        //                         }}>
        //                         {image.title}
        //                         <ImageMarked className="MuiImageMarked-root" />
        //                     </Typography>
        //                 </Image>
        //             </ImageButton>
        //         </div>
        //     ))}
        // </div>
    );
};

export default BotonesHomeGuardia;