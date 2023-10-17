"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';



// const pages = ['Guardia', 'Enfermero', 'Residente', 'Visitante'];
const pages = [{name: 'Guardia', url: '/form_guardia'}, {name: 'Enfermero', url: '/form_nurse'}, {name: 'Residente', url: '/form_residente'}, {name: 'Visitante', url: '/form_visitante'}]
const tablitas = [{name: 'Guardia', url: '/guardias'}, {name: 'Enfermero', url: '/enfermeros'}, {name: 'Residente', url: '/residentes'}, {name: 'Visitante', url: '/visitantes'}]
const deslogueo = [{name: 'Logout', url: '/login'} ]
const formularios = ['Formularios']
const tablas = ['Tablas']
const register = ['Registrar usuario']


const Navbar = () => {

    const { data: session, status } = useSession();

    const [isClick, setIsClick] = useState(false);

    const toggleNavbar = () => {
        setIsClick(!isClick);
    };

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElLogout, setAnchorElLogout] = React.useState(null);
    const [anchorElTablas, setAnchorElTablas] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenLogout = (event) => {
        setAnchorElLogout(event.currentTarget);
    };
    const handleCloseLogout = () => {
        setAnchorElLogout(null);
    };

    const handleOpenTablas = (event) => {
        setAnchorElTablas(event.currentTarget);
    };
    const handleCloseTablas = () => {
        setAnchorElTablas(null);
    };


    useEffect((

    ) => {}, []);

    
    return (
        <>
            <nav className="bg-color_navbar">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <a href="/home_test" className="text-white">
                                    <img src="/Logo_horizontal.png" alt="logo_fundacion" width="150" height="150" />
                                </a>
                            </div>
                        </div>

                        <div className="hidden md:block">

                            <div className="ml-4 flex items-center space-x-4">
                                {session && session.tipo_user === 'Administrador' && (

                                    // add hover with tailwind
                                    <Box sx={{ flexGrow: 0 }} >
                                        <Button className=' hover:bg-color_navbar_hover rounded-lg p-2'>
                                            <a href="/register" className='text-white'>Registrar usuario</a>
                                        </Button>
                                    </Box>
                                )}
                                {session && session.tipo_user === 'Administrador' && (
                                    <Box sx={{ flexGrow: 0 }}>
                                        <Button Button key={tablas} onClick={handleOpenTablas} sx={{ my: 2, color: 'white', display: 'block' }} className=' hover:bg-color_navbar_hover rounded-lg p-2'> {tablas} </Button>
                                        <Menu
                                            sx={{ mt: '45px' }}
                                            id="menu-appbar"
                                            anchorEl={anchorElTablas}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={Boolean(anchorElTablas)}
                                            onClose={handleCloseTablas}
                                        >
                                            {tablitas.map((tablitas, i) => (
                                                <MenuItem key={i} onClick={handleCloseTablas}>
                                                    <Link legacyBehavior href={tablitas.url}>
                                                        <a className=" hover:bg-white hover:text-black rounded-lg p-2">{tablitas.name}</a>
                                                    </Link>
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </Box>
                                )}
                                {session && session.tipo_user === 'Administrador' && (
                                    <Box sx={{ flexGrow: 0 }}>
                                        <Button Button key={formularios} onClick={handleOpenUserMenu} sx={{ my: 2, color: 'white', display: 'block' }} className=' hover:bg-color_navbar_hover rounded-lg p-2'> {formularios} </Button>
                                        <Menu
                                            sx={{ mt: '45px' }}
                                            id="menu-appbar"
                                            anchorEl={anchorElUser}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={Boolean(anchorElUser)}
                                            onClose={handleCloseUserMenu}
                                        >
                                            {pages.map((pages, i) => (
                                                <MenuItem key={i} onClick={handleCloseUserMenu}>
                                                    <Link legacyBehavior href={pages.url}>
                                                        <a className=" hover:bg-white hover:text-black rounded-lg p-2">{pages.name}</a>
                                                    </Link>
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </Box>
                                )}
                                <Box sx={{ flexGrow: 0 }}>
                                    <Button Button key={session?.user} onClick={handleOpenLogout} sx={{ my: 2, color: 'white', display: 'block' }} className=' hover:bg-color_navbar_hover rounded-lg p-2'> {session?.user} </Button>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElLogout}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElLogout)}
                                        onClose={handleCloseLogout}
                                    >
                                        {deslogueo.map((deslogueo, i) => (
                                            <MenuItem key={i} onClick={handleCloseLogout}>
                                                <a className=" hover:bg-white hover:text-black rounded-lg p-2" onClick={() => signOut()}>
                                                    {deslogueo.name}
                                                </a>
                                            </MenuItem>
                                        ))}

                                    </Menu>
                                </Box>
                            </div>
                        </div>
                        <div className="md:hidden flex items-center">
                            <button className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white focus:outline-none
                        focus:ring-inset focus:ring-white" onClick={toggleNavbar}>
                                {isClick ? (
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="{2}" d="M6 18L18 6M6 6l12 12" /></svg>
                                ) : (
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="{2}" d="M4 6h16M4 12h15m-7 6h7" /></svg>
                                )}
                            </button>
                        </div>

                    </div>
                </div>
                <div>
                    {isClick && (
                        <div className="md:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                <a href="#" className="text-white block hover:bg-white hover:text-black rounded-lg p-2">
                                    Home
                                </a>
                                <a href="#" className="text-white block hover:bg-white hover:text-black rounded-lg p-2">
                                    About
                                </a>
                                {/* Create a div for a username */}
                                <div className="text-white block hover:bg-white hover:text-black rounded-lg p-2">
                                    <span className="text-white">{session?.user?.user}</span>
                                </div>

                                <a href="#" className="text-white block hover:bg-white hover:text-black rounded-lg p-2" onClick={() => signOut()}>
                                    Logout
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Navbar;
