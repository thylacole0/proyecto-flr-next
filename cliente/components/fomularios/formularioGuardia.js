"use client";
import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react'; 
import { useRouter } from 'next/navigation'; 
import Link from 'next/link'; 
import 'tailwindcss/tailwind.css';
import Select from 'react-select';
import axios from 'axios';
import Navbar from '../navbar';

const GuardiaForm = forwardRef((props, ref) => {

    const [rutGuard, setRutGuard] = useState('');
    const [nombresGuard, setNombresGuard] = useState('');
    const [apellidosGuard, setApellidosGuard] = useState('');
    const [correoGuard, setCorreoGuard] = useState('');
    const [fechaNacimientoGuard, setFechaNacimientoGuard] = useState('');
    const [celGuardia, setCelGuardia] = useState('');
    const [celauxGuardia, setCelauxGuardia] = useState('');
    const [errorCelular, setErrorCelular] = useState('');
    const [fechaContratoGuard, setFechaContratoGuard] = useState('');
    const [contratoGuard, setContratoGuard] = useState('');
    const [fotoGuard, setFotoGuard] = useState('');

    const [formData1, setFormData] = useState(null);

    useImperativeHandle(ref, () => ({
        getFormData: () => ({
            rutGuard,
            nombresGuard,
            apellidosGuard,
            correoGuard,
            fechaNacimientoGuard,
            celGuardia,
            celauxGuardia,
            fechaContratoGuard,
            contratoGuard: contratoGuard.value,
            fotoGuard,
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
    ];
      
    const handleChangeContrato = (selectedOption) => {
        setContratoGuard(selectedOption);
    };

    const handleChangeCelular = (e) => {
        const valor = e.target.value;

        if (valor.length <= 9) {
            setCelGuardia(valor);
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
            setRutGuard(rut);
        }
    };

    const handleChangeCelularAux = (e) => {
        const valor = e.target.value;

        if (valor.length <= 9) {
            setCelauxGuardia(valor);
        } else {
        // Si supera 9 dígitos, establece un mensaje de error
            setErrorCelular('El número de celular no debe exceder los 9 dígitos');
        }
    };

    const handleChangeCorreo = (e) => {
        const valor = e.target.value;
        setCorreoGuard(valor);
    };

    return (
        <> 
                <div className="pt-6 ">
                    <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">Ingrese la información del guardia</h2>
                    <div className="mb-4">
                        <label htmlFor="rutGuard" className="block text-gray-700 font-bold mb-2">RUT:</label>
                        <input maxLength="12" type="text" id="rutGuard" name="rutGuard" value={rutGuard} onChange={handleRutChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="nombresGuard" className="block text-gray-700 font-bold mb-2">Nombres:</label>
                        <input type="text" id="nombresGuard" name="nombresGuard" value={nombresGuard} onChange={(e) => setNombresGuard(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="apellidosGuard" className="block text-gray-700 font-bold mb-2">Apellidos:</label>
                        <input type="text" id="apellidosGuard" name="apellidosGuard" value={apellidosGuard} onChange={(e) => setApellidosGuard(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="correoGuard" className="block text-gray-700 font-bold mb-2">Correo Electrónico:</label>
                        <input type="email" id="correoGuard" name="correoGuard" value={correoGuard} onChange={handleChangeCorreo} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="fechaNacimientoGuard" className="block text-gray-700 font-bold mb-2">Fecha de Nacimiento:</label>
                        <input type="date" id="fechaNacimientoGuard" name="fechaNacimientoGuard" value={fechaNacimientoGuard} onChange={(e) => setFechaNacimientoGuard(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>  
                    <div className="mb-4">
                        <label htmlFor="celGuardia" className="block text-gray-700 font-bold mb-2">Celular:</label>
                        <div className="flex">
                            <span className="text-gray-700 mr-2">+56</span>
                            <input type="number" id="celGuardia" name="celGuardia" value={celGuardia} onChange={handleChangeCelular} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="celauxGuardia" className="block text-gray-700 font-bold mb-2">Contacto de emergencia:</label>
                        <div className="flex">
                            <span className="text-gray-700 mr-2">+56</span>
                            <input type="number" id="celauxGuardia" name="celauxGuardia" value={celauxGuardia} onChange={handleChangeCelularAux} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="fechaContratoGuard" className="block text-gray-700 font-bold mb-2">Fecha de Contrato:</label>
                        <input type="date" id="fechaContratoGuard" name="fechaContratoGuard" value={fechaContratoGuard} onChange={(e) => setFechaContratoGuard(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>  
                    <div className="mb-4">
                        <label htmlFor="contratoGuard" className="block text-gray-700 font-bold mb-2">Tipo de contrato:</label>
                        <Select instanceId="contratoGuard" name="contratoGuard" value={contratoGuard} onChange={handleChangeContrato} options={opcionesContrato} styles={customStyles} isClearable />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="fotoGuard" className="block text-gray-700 font-bold mb-2">Foto</label>
                        <input type="file" id="fotoGuard" name="fotoGuard" accept="image/*" onChange={(e) => setFotoGuard(e.target.files[0])} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                </div>
        </>
    );
});
export default GuardiaForm;