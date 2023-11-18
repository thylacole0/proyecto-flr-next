import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Box, Button, ButtonBase, Modal, Stack, TextField, Typography, styled, colors } from '@mui/material';
import Delete from '@mui/icons-material';
import ModeIcon from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { red, yellow } from '@mui/material/colors';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Nunito } from "next/font/google"


const nunito = Nunito({
    subsets: ['latin-ext'],
    weight: '900'
})
// const images = [
//     {
//       url: '/abuelosboton.jpg',
//       title: 'Residentes',
//       width: '100%',
//     },
// ];

// const ImageButton = styled(ButtonBase)(({ theme }) => ({
//     position: 'relative',
//     height: 450,
//     [theme.breakpoints.down('sm')]: {
//     width: '100% !important', // Overrides inline-style
//     height: 100,
//     },
//     '&:hover, &.Mui-focusVisible': {
//     zIndex: 1,
//     '& .MuiImageBackdrop-root': {
//         opacity: 0.15,
//     },
//     '& .MuiImageMarked-root': {
//         opacity: 0,
//     },
//     '& .MuiTypography-root': {
//         border: '4px solid currentColor',
//     },
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




const BotonesHomeEnfer = () => {

    // const pathname = usePathname()
    // const searchParams = useSearchParams()
    // const router = useRouter()

    // const handleButtonClick = () => {
    //     const newUrlParams = new URLSearchParams(searchParams.toString())
    //     console.log('newUrlParams', newUrlParams);
    //     newUrlParams.set('filters', ['219', '213'].join(','))
    //     router.push(`/tablaResEnfer?${newUrlParams}`)
    // }

    return (
        <div>
            <div className="grid lg:grid-cols-5 sm:grid-cols-1 gap-8 bg-color_navbar pb-10">
                <div className={`${nunito.className} lg:row-start-1 lg:col-start-2 lg:col-span-1 flex justify-center items-center`}>
                    <div className="rounded-lg min-h-96 text-center p-4">
                        <div className="">
                            <h1 className="text-xl mb-4 pt-5 text-white">Fundación Las Rosas</h1>
                        </div>
                        <div className="bg-white w-[300px] h-[300px] flex justify-center items-center rounded-2xl shadow-lg hover:scale-105 hover:duration-300 ease-in-out">
                            <a target="blank" href="https://www.fundacionlasrosas.cl">
                                <img src="/fund.svg" alt="" className="p-8" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className={`${nunito.className} lg:row-start-1 lg:col-start-3 lg:col-span-1 flex justify-center items-center`}>
                    <div className="rounded-lg min-h-96 text-center p-4">
                        <div className="">
                            <h1 className="text-xl mb-4 pt-5 text-white">Ver fichas de residentes</h1>
                        </div>
                        <div className="bg-white w-[300px] h-[300px] flex justify-center items-center rounded-2xl shadow-lg hover:scale-105 hover:duration-300 ease-in-out">
                            <a href="/tablaResEnfer">
                                <img src="/ficha.svg" alt="" className="p-10" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className={`${nunito.className} lg:row-start-1 lg:col-start-4 lg:col-span-1 flex justify-center items-center`}>
                    <div className="rounded-lg min-h-96 text-center p-4">
                        <div className="">
                            <h1 className="text-xl mb-4 pt-5 text-white">Ver calendario de visitas</h1>
                        </div>
                        <div className="bg-white w-[300px] h-[300px] flex justify-center items-center rounded-2xl shadow-lg hover:scale-105 hover:duration-300 ease-in-out">
                            <a href="/visitas_residentes">
                                <img src="/caldendarVisitas.svg" alt="" className="p-6" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BotonesHomeEnfer;