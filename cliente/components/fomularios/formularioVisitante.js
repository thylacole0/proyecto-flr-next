"use client";
import React, { useEffect, useImperativeHandle, useState, forwardRef } from 'react';
import 'tailwindcss/tailwind.css';
import Navbar from '../../components/navbar';
import axios from 'axios';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// import pool from "../../util/db";


const VisitForm = forwardRef((props, ref) => {
    
    const [rutVisit, setRutVisit] = useState('');
    const [nombresVisit, setNombresVisit] = useState('');
    const [apellidosVisit, setApellidosVisit] = useState('');
    const [correoVisit, setCorreoVisit] = useState('');
    const [celVisit, setCelVisit] = useState('');
    const [errorCelular, setErrorCelular] = useState('');
    const [direccionVisit, setDireccionVisit] = useState('');
    const [rutVinculado, setRutVinculado] = useState('');
    const [residentes, setResidentes] = useState([]);

    useImperativeHandle(ref, () => ({
        getFormData: () => ({
            rutVisit,
            nombresVisit,
            apellidosVisit,
            correoVisit,
            celVisit,
            direccionVisit,
            rutVinculado,
        }),
    }));

    const handleChange = (event) => {
        setRutVinculado(event.target.value);
    };

    const getAllResidentes = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/allresidentes`);
            const jsonDatos = await response.data;
            const residentes = jsonDatos.map(residente => ({
                rut: residente.rut_res,
                nombres: residente.nombres_res,
                apellidos: residente.apes_res
            }));
            setResidentes(residentes);
        } catch (error) {
            console.log(error);
        }
    };

    const customStyles = {
        control: (provided) => ({
            ...provided,
            color: 'blue', // Cambia el color del texto seleccionado
        }),
        option: (provided) => ({
            ...provided,
            color: 'black', // Cambia el color del texto en el menú desplegable
        }),
    };

    const handleChangeCelular = (e) => {
        const valor = e.target.value;

        if (valor.length <= 9) {
            setCelVisit(valor);
        } else {
            // Si supera 9 dígitos, establece un mensaje de error
            setErrorCelular('El número de celular no debe exceder los 9 dígitos');
        }
    };

    const handleChangeCorreo = (e) => {
        const valor = e.target.value;
        setCorreoVisit(valor);
    };

    useEffect(() => {
        getAllResidentes();
    }, []);

    return (
        <>
            <div className="container flex justify-center items-center">
                <div className="bg-white px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">Formulario de Ingreso de Visita</h2>
                    <div className="mb-4">
                        <label htmlFor="rutVisit" className="block text-gray-700 font-bold mb-2">RUT:</label>
                        <input type="text" id="rutVisit" name="rutVisit" value={rutVisit} onChange={(e) => setRutVisit(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="nombresVisit" className="block text-gray-700 font-bold mb-2">Nombres:</label>
                        <input type="text" id="nombresVisit" name="nombresVisit" value={nombresVisit} onChange={(e) => setNombresVisit(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="apellidosVisit" className="block text-gray-700 font-bold mb-2">Apellidos:</label>
                        <input type="text" id="apellidosVisit" name="apellidosVisit" value={apellidosVisit} onChange={(e) => setApellidosVisit(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="correoVisit" className="block text-gray-700 font-bold mb-2">Correo Electrónico:</label>
                        <input type="email" id="correoVisit" name="correoVisit" value={correoVisit} onChange={handleChangeCorreo} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="celVisit" className="block text-gray-700 font-bold mb-2">Celular:</label>
                        <div className="flex">
                            <span className="text-gray-700 mr-2">+56</span>
                            <input type="number" id="celVisit" name="celVisit" value={celVisit} onChange={handleChangeCelular} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="direccionVisit" className="block text-gray-700 font-bold mb-2">Direccion:</label>
                        <input type="text" id="direccionVisit" name="direccionVisit" value={direccionVisit} onChange={(e) => setDireccionVisit(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="mb-4">
                    <label htmlFor="rutVinculado" className="block text-gray-700 font-bold mb-2">Rut Familiar:</label>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }} fullWidth>
                                <InputLabel id="demo-simple-select-filled-label">Familiar Asociado</InputLabel>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={rutVinculado}
                                    label="Residente"
                                    onChange={handleChange}
                                >
                                    {residentes.map((residente, index) => (
                                        <MenuItem key={index} value={residente.rut}>{residente.nombres} {residente.apellidos}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>                        
                    </div>
                </div>
            </div>
        </>
    );
});
export default VisitForm;