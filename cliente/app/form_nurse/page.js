"use client";
import React, { useState, useEffect } from 'react'; 
import { useRouter } from 'next/navigation'; 
import Link from 'next/link'; 
import 'tailwindcss/tailwind.css';
import Select from 'react-select';
import axios from 'axios';


const NurseForm = () => {
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
    // const [fotoNurse, setFotoNurse] = useState('');      

    const handleSubmit = (event) => {
        event.preventDefault();

        // Handle form submission here
        if (celNurse.length === 9) {
            // El número de celular es válido, puedes continuar con el envío del formulario
            setErrorCelular('');
            // Aquí puedes realizar otras acciones como enviar los datos al servidor
        } else {
            // El número de celular no es válido, muestra un mensaje de error
            setErrorCelular('El número de celular debe tener 9 dígitos');
        }
        if (celauxNurse.length === 9) {
            // El número de celular es válido, puedes continuar con el envío del formulario
            setErrorCelular('');
            // Aquí puedes realizar otras acciones como enviar los datos al servidor
        } else {
            // El número de celular no es válido, muestra un mensaje de error
            setErrorCelular('El número de celular debe tener 9 dígitos');
        }

        // utilizar backend para insertar datos en la tabla enfermero
        try {
            let contratoNurseValue = contratoNurse.value;
            let turnoNurseValue = turnoNurse.value;
            const body = { rutNurse, nombresNurse, apellidosNurse, correoNurse, fechaNacimientoNurse, celNurse, celauxNurse, fechaContratoNurse, contratoNurseValue, turnoNurseValue, especialidadNurse };
            console.log(body)
            const response = axios.post("http://localhost:8080/form_nurse", body);
            console.log(response);
            window.location = "/home_test";
            
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
        <div className="container flex mt-20 justify-center items-center">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2">
                <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">Formulario de Ingreso de Enfermero</h2>
                <div className="mb-4">
                    <label htmlFor="rutNurse" className="block text-gray-700 font-bold mb-2">RUT:</label>
                    <input type="text" id="rutNurse" name="rutNurse" value={rutNurse} onChange={(e) => setRutNurse(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
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
                    <input type="email" id="correoNurse" name="correoNurse" value={correoNurse} onChange={handleChangeCorreo} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>

                <div className="mb-4">
                    <label htmlFor="fechaNacimientoNurse" className="block text-gray-700 font-bold mb-2">Fecha de Nacimiento:</label>
                    <input type="date" id="fechaNacimientoNurse" name="fechaNacimientoNurse" value={fechaNacimientoNurse} onChange={(e) => setFechaNacimientoNurse(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>  

                <div className="mb-4">
                    <label htmlFor="celNurse" className="block text-gray-700 font-bold mb-2">Celular:</label>
                    <div className="flex">
                        <span className="text-gray-700 mr-2">+56</span>
                        <input type="number" id="celNurse" name="celNurse" value={celNurse} onChange={handleChangeCelular} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="celauxNurse" className="block text-gray-700 font-bold mb-2">Contacto de emergencia:</label>
                    <div className="flex">
                        <span className="text-gray-700 mr-2">+56</span>
                        <input type="number" id="celauxNurse" name="celauxNurse" value={celauxNurse} onChange={handleChangeCelularAux} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="fechaContratoNurse" className="block text-gray-700 font-bold mb-2">Fecha de Contrato:</label>
                    <input type="date" id="fechaContratoNurse" name="fechaContratoNurse" value={fechaContratoNurse} onChange={(e) => setFechaContratoNurse(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>  

                <div className="mb-4">
                    <label htmlFor="contratoNurse" className="block text-gray-700 font-bold mb-2">Tipo de contrato:</label>
                    <Select instanceId="contratoNurse" name="contratoNurse" value={contratoNurse} onChange={handleChangeTurno} options={opcionesContrato} styles={customStyles} isClearable />
                </div>

                <div className="mb-4">
                    <label htmlFor="turnoNurse" className="block text-gray-700 font-bold mb-2">Turno:</label>
                    <Select instanceId="turnoNurse" name="turnoNurse" value={turnoNurse} onChange={handleChangeContrato} options={opcionesTurno} styles={customStyles} isClearable />
                </div>

                <div className="mb-4">
                    <label htmlFor="especialidadNurse" className="block text-gray-700 font-bold mb-2">Especialidades:</label>
                    <textarea id="especialidadNurse" name="especialidadNurse" value={especialidadNurse} onChange={(e) => setEspecialidadNurse(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>

                {/* <div className="mb-4">
                    <label htmlFor="fotoGuard" className="block text-gray-700 font-bold mb-2">Foto</label>
                    <input type="file" id="fotoGuard" name="fotoGuard" accept="image/*"  onChange={(e) => setFotoGuard(e.target.files[0])} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div> */}
                
                {errorCelular && <p className="text-red-500 text-sm">{errorCelular}</p>}
                <div className="flex items-center justify-between">
                    <input type="submit" value="Enviar" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" />
                </div>             
                
            </form>
        </div>
    );
};
export default NurseForm;