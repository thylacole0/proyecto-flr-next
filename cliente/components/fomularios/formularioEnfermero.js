"use client";
import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import 'tailwindcss/tailwind.css';
import Select from 'react-select';
import axios from 'axios';
import { useRut } from 'react-rut-formatter';
import { TextField } from '@mui/material';


const NurseForm = forwardRef((props, ref) => {

    const [rutNurse, setRutNurse] = useState('');
    const [nombresNurse, setNombresNurse] = useState('');
    const [apellidosNurse, setApellidosNurse] = useState('');
    const [correoNurse, setCorreoNurse] = useState('');
    const [fechaNacimientoNurse, setFechaNacimientoNurse] = useState('');
    const [celNurse, setCelNurse] = useState('');
    const [celauxNurse, setCelauxNurse] = useState('');
    const [errorCelular, setErrorCelular] = useState('');
    const [fechaContratoNurse, setFechaContratoNurse] = useState('');
    const [contratoNurse, setContratoNurse] = useState('');
    const [turnoNurse, setTurnoNurse] = useState('');
    const [especialidadNurse, setEspecialidadNurse] = useState('');
    const [fotoNurse, setFotoNurse] = useState('');
    const { rut, updateRut, isValid } = useRut();

    useImperativeHandle(ref, () => ({
        getFormData: () => ({
            rutNurse,
            nombresNurse,
            apellidosNurse,
            correoNurse,
            fechaNacimientoNurse,
            celNurse,
            celauxNurse,
            fechaContratoNurse,
            contratoNurse: contratoNurse.value,
            turnoNurse: turnoNurse.value,
            especialidadNurse,
            fotoNurse,
        }),
    }));

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

    const opcionesContrato = [
        { value: 'Completo', label: 'Completo' },
        { value: 'Part-Time', label: 'Part-Time' },
        { value: 'Practicante', label: 'Practicante' },
    ];

    const opcionesTurno = [
        { value: 'Mañana', label: 'Mañana' },
        { value: 'Tarde', label: 'Tarde' },
        { value: 'Noche', label: 'Noche' },
    ];

    const handleChangeContrato = (selectedOption) => {
        setContratoNurse(selectedOption);
    };

    const handleChangeTurno = (selectedOption) => {
        setTurnoNurse(selectedOption);
    };

    const handleChangeCelular = (e) => {
        const valor = e.target.value;

        if (valor.length <= 9) {
            setCelNurse(valor);
        } else {
            // Si supera 9 dígitos, establece un mensaje de error
            setErrorCelular('El número de celular no debe exceder los 9 dígitos');
        }
    };

    const formatRut = (rut) => {
        let actual = rut.replace(/^0+/, "");
        let rutPuntos = "";
        if (actual !== '' && actual.length > 1) {
            let sinPuntos = actual.replace(/\./g, "");
            let actualLimpio = sinPuntos.replace(/-/g, "");
            let inicio = actualLimpio.slice(0, -1);
            let i = 0;
            let j = 1;
            for (i = inicio.length - 1; i >= 0; i--) {
                let letra = inicio.charAt(i);
                rutPuntos = letra + rutPuntos;
                if (j % 3 === 0 && j <= inicio.length - 1) {
                    rutPuntos = "." + rutPuntos;
                }
                j++;
            }
            let dv = actualLimpio.slice(-1);
            rutPuntos = rutPuntos + "-" + dv;
        } else {
            rutPuntos = actual;
        }
        return rutPuntos;
    }
    
    const handleRutChange = (e) => {
        let rut = e.target.value;
        if (/^[0-9kK.-]+$/.test(rut) || rut === "") {
            rut = formatRut(rut);
            setRutNurse(rut);
        }
    };

    const handleChangeCelularAux = (e) => {
        const valor = e.target.value;

        if (valor.length <= 9) {
            setCelauxNurse(valor);
        } else {
            // Si supera 9 dígitos, establece un mensaje de error
            setErrorCelular('El número de celular no debe exceder los 9 dígitos');
        }
    };

    const handleChangeCorreo = (e) => {
        const valor = e.target.value;
        setCorreoNurse(valor);
    };

    return (
        <>
            <div className="bg-white pt-6 ">
                <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">Ingrese la información del enfermero/a</h2>
                <div className="mb-4">
                    <label htmlFor="rutNurse" className="block text-gray-700 font-bold mb-2">RUT:</label>
                    <input maxLength="12" type="text" id="rutNurse" name="rutNurse" value={rutNurse} onChange={handleRutChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>

                <div className="mb-4">
                    <label htmlFor="nombresNurse" className="block text-gray-700 font-bold mb-2">Nombres:</label>
                    <input type="text" id="nombresNurse" name="nombresNurse" value={nombresNurse} onChange={(e) => setNombresNurse(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>

                <div className="mb-4">
                    <label htmlFor="apellidosNurse" className="block text-gray-700 font-bold mb-2">Apellidos:</label>
                    <input type="text" id="apellidosNurse" name="apellidosNurse" value={apellidosNurse} onChange={(e) => setApellidosNurse(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>

                <div className="mb-4">
                    <label htmlFor="correoNurse" className="block text-gray-700 font-bold mb-2">Correo Electrónico:</label>
                    <input type="email" id="correoNurse" name="correoNurse" value={correoNurse} onChange={handleChangeCorreo} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>

                <div className="mb-4">
                    <label htmlFor="fechaNacimientoNurse" className="block text-gray-700 font-bold mb-2">Fecha de Nacimiento:</label>
                    <input type="date" id="fechaNacimientoNurse" name="fechaNacimientoNurse" value={fechaNacimientoNurse} onChange={(e) => setFechaNacimientoNurse(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>

                <div className="mb-4">
                    <label htmlFor="celNurse" className="block text-gray-700 font-bold mb-2">Celular:</label>
                    <div className="flex">
                        <span className="text-gray-700 mr-2">+56</span>
                        <input type="number" id="celNurse" name="celNurse" value={celNurse} onChange={handleChangeCelular} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="celauxNurse" className="block text-gray-700 font-bold mb-2">Contacto de emergencia:</label>
                    <div className="flex">
                        <span className="text-gray-700 mr-2">+56</span>
                        <input type="number" id="celauxNurse" name="celauxNurse" value={celauxNurse} onChange={handleChangeCelularAux} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="fechaContratoNurse" className="block text-gray-700 font-bold mb-2">Fecha de Contrato:</label>
                    <input type="date" id="fechaContratoNurse" name="fechaContratoNurse" value={fechaContratoNurse} onChange={(e) => setFechaContratoNurse(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>

                <div className="mb-4">
                    <label htmlFor="contratoNurse" className="block text-gray-700 font-bold mb-2">Tipo de contrato:</label>
                    <Select instanceId="contratoNurse" name="contratoNurse" value={contratoNurse} onChange={handleChangeContrato} options={opcionesContrato} styles={customStyles} isClearable />
                </div>

                <div className="mb-4">
                    <label htmlFor="turnoNurse" className="block text-gray-700 font-bold mb-2">Turno:</label>
                    <Select instanceId="turnoNurse" name="turnoNurse" value={turnoNurse} onChange={handleChangeTurno} options={opcionesTurno} styles={customStyles} isClearable />
                </div>

                <div className="mb-4">
                    <label htmlFor="especialidadNurse" className="block text-gray-700 font-bold mb-2">Especialidades:</label>
                    <textarea id="especialidadNurse" name="especialidadNurse" value={especialidadNurse} onChange={(e) => setEspecialidadNurse(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>

                <div className="mb-4">
                    <label htmlFor="fotoNurse" className="block text-gray-700 font-bold mb-2">Foto</label>
                    <input type="file" id="fotoNurse" name="fotoNurse" accept="image/*" onChange={(e) => setFotoNurse(e.target.files[0])} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
            </div>
        </>
    );
});
export default NurseForm;