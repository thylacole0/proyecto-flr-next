"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import 'tailwindcss/tailwind.css';
// import pool from "../../util/db";


const VisitForm = () => {
    const [rutVisit, setRutVisit] = useState('');
    const [nombresVisit, setNombresVisit] = useState('');
    const [apellidosVisit, setApellidosVisit] = useState('');
    const [correoVisit, setCorreoVisit] = useState('');
    const [celVisit, setCelVisit] = useState('');
    const [errorCelular, setErrorCelular] = useState('');
    const [direccionVisit, setDireccionVisit] = useState('');
    const [rutVinculado, setRutVinculado] = useState('');
    // const [fotoVisit, setFotoVisit] = useState('');      

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Handle form submission here
        if (celVisit.length === 9) {
            // El número de celular es válido, puedes continuar con el envío del formulario
            setErrorCelular('');
            // Aquí puedes realizar otras acciones como enviar los datos al servidor
        } else {
            // El número de celular no es válido, muestra un mensaje de error
            setErrorCelular('El número de celular debe tener 9 dígitos');
        }
        // utilizar backend para insertar datos en la tabla visitante
        try {
            const body = { rutVisit, nombresVisit, apellidosVisit, correoVisit, celVisit, direccionVisit, rutVinculado };
            const response = await fetch("http://localhost:8080/form_visitante", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
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

    return (
        <>
            <section>
                <div className="container flex mt-20 justify-center items-center">
                    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2">
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
                            <input type="text" id="rutVinculado" name="rutVinculado" value={rutVinculado} onChange={(e) => setRutVinculado(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>

                        {/* <div className="mb-4">
                                <label htmlFor="fotoVisit" className="block text-gray-700 font-bold mb-2">Foto</label>
                                <input type="file" id="fotoVisit" name="fotoVisit" accept="image/*"  onChange={(e) => setFotoVisit(e.target.files[0])} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                            </div> */}

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
export default VisitForm;