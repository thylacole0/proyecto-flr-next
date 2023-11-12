"use client";
import React, { useState, useEffect } from 'react'; 
import { useRouter } from 'next/navigation'; 
import Link from 'next/link'; 
import 'tailwindcss/tailwind.css';
import Select from 'react-select';
import axios from 'axios';
import Navbar from '../navbar';


const GuardiaForm = () => {
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Handle form submission here
        if (celGuardia.length !== 9 || celauxGuardia.length !== 9) {
            setErrorCelular('El número de celular debe tener 9 dígitos');
            return;
        }
    
        setErrorCelular('');

        try {
            let contratoGuardia = contratoGuard.value;
            const formData = new FormData();
            formData.append('rutGuard', rutGuard);
            formData.append('nombresGuard', nombresGuard);
            formData.append('apellidosGuard', apellidosGuard);
            formData.append('correoGuard', correoGuard);
            formData.append('fechaNacimientoGuard', fechaNacimientoGuard);
            formData.append('celGuardia', celGuardia);
            formData.append('celauxGuardia', celauxGuardia);
            formData.append('fechaContratoGuard', fechaContratoGuard);
            formData.append('contratoGuardia', contratoGuardia);
            formData.append('fotoGuard', fotoGuard);
    
            const response = await axios.post("http://localhost:8080/form_guardia", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response);
            // window.location = "/home_test";
            
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
            <section>
                <div className="container flex mt-20 justify-center items-center ">
                    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2">
                        <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">Formulario de Ingreso de Guardia</h2>
                        <div className="mb-4">
                            <label htmlFor="rutGuard" className="block text-gray-700 font-bold mb-2">RUT:</label>
                            <input type="text" id="rutGuard" name="rutGuard" value={rutGuard} onChange={(e) => setRutGuard(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
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
                            
                        {errorCelular && <p className="text-red-500 text-sm">{errorCelular}</p>}
                        <div className="flex items-center justify-between">
                            <input type="submit" value="Enviar" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" />
                        </div>             
                            
                    </form>
                </div>
            </section>
        </>
    );
};
export default GuardiaForm;