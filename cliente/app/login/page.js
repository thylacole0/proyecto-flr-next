"use client";
import { useState, useEffect } from 'react'
import 'tailwindcss/tailwind.css';
import '../../styles/globals.css'
import React from 'react';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import e from 'cors';

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await signIn("credentials", { 
                username,
                password,
                redirect: false
            });

            if (res.error) {
                console.log('credenciales incorrectas')
                return;
            }
            router.push('/home_test');
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
    }, []);
    return (
        <>
            <body name="login">
                <div className="text-white h-[100vh] flex justify-center items-center bg-cover">
                    <div className="bg-slate-900 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm  bg-opacity-60 relative">
                        <div >
                            <h2 className="text-4xl text-whitefont-bold text-center mb-6">Iniciar sesión</h2>
                            <form onSubmit={onSubmit} className='form'>
                                <div className="text-red-500 mb-2"></div>
                                <div className=" relative my-4">
                                    <label htmlFor="username" className="absolote text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" placeholder=''>
                                        Nombre de Usuario:
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="container">
                                    <div className="left-div"></div>
                                    <div className="separator"></div>
                                    <div className="right-div"></div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="absolote text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" placeholder=''>
                                        Contraseña:
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <button
                                    className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-blue-900 hover:bg-blue-900 hover:text-white py-2.3 transition-color duration-300 py-2 border-slate-100 border-2"
                                >
                                    Iniciar Sesión
                                </button>

                            </form>
                            <div className="text-center">
                                <a className="text-blue-500 hover:underline">Recuperar Contraseña</a>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </>


    );
  };
  
  export default Login;
