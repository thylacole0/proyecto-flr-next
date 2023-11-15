"use client";
import { useState, useEffect } from 'react'
import 'tailwindcss/tailwind.css';
import '../../styles/globals.css'
import React from 'react';
import axios from 'axios';

const RecuperarContra = () => {
    
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post('http://localhost:8080/forgot-password', { email });
    
          if (response.status === 200) {
            alert('Correo enviado. Por favor, revisa tu bandeja de entrada.');
          }
        } catch (error) {
            console.error(error); // Imprime el error en la consola
            alert(`Error al enviar el correo: ${error.message}. Por favor, intenta de nuevo.`); // Muestra el error en la alerta
        }
    };

    return (
        <>
            <div className="text-white h-[100vh] flex justify-center items-center bg-cover">
                <div className="bg-slate-900 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm  bg-opacity-60 relative">
                    <div >
                        <h2 className="text-4xl text-whitefont-bold text-center mb-6">Recuperar Contraseña</h2>
                        <form className='form' onSubmit={handleSubmit}>
                            <div className="text-red-500 mb-2">
                                <div className=" relative my-4">
                                    <label htmlFor="email" className="absolote text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" placeholder=''>
                                        Email:
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="container">
                                    <div className="left-div"></div>
                                    <div className="separator"></div>
                                    <div className="right-div"></div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-blue-900 hover:bg-blue-900 hover:text-white py-2.3 transition-color duration-300 py-2 border-slate-100 border-2">
                                    Enviar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RecuperarContra;
