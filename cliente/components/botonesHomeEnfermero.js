import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Box, Button, ButtonBase, Modal, Stack, TextField, Typography, styled, colors } from '@mui/material';
import Delete from '@mui/icons-material';
import  ModeIcon from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { red, yellow } from '@mui/material/colors';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const images = [
    {
      url: '/abuelosboton.jpg',
      title: 'Residentes',
      width: '100%',
    },
];
  
const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 450,
    [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
        opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
        opacity: 0,
    },
    '& .MuiTypography-root': {
        border: '4px solid currentColor',
    },
    },
}));
  
const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
});
  
const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
}));
  
const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
}));
  
const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
}));




const BotonesHomeEnfer =() => {

    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()

    console.log('pathname', pathname);
    console.log('searchParams', searchParams);
    console.log('router', router);

    const handleButtonClick = () => {
        const newUrlParams = new URLSearchParams(searchParams.toString())
        console.log('newUrlParams', newUrlParams);
        newUrlParams.set('filters', ['219', '213'].join(','))
        router.push(`/tablaResEnfer?${newUrlParams}`)
    }

    return (
        <div>
            <Box>
                {images.map((image) => (
                    <ImageButton
                        focusRipple
                        key={image.title}
                        style={{ width: image.width, }}
                        onClick={handleButtonClick}>
                        <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                        <ImageBackdrop className="MuiImageBackdrop-root" />
                        <Image>
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
                ))}
            </Box>
        </div>
    );
};

export default BotonesHomeEnfer;