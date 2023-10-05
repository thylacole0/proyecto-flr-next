"use client";
import React, { useState, useEffect } from 'react'; 
import { useRouter } from 'next/navigation'; 
import Link from 'next/link'; 
import 'tailwindcss/tailwind.css';
import Select from 'react-select';
import axios from 'axios';

const ResidenteForm = () => {
    const [rut, setRut] = useState('');
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [genero, setGenero] = useState('');
    const [nacionalidad, setNacionalidad] = useState(null);
    const [nacionalidades, setNacionalidades] = useState([]);
    const [direccion, setDireccion] = useState('');
    const [estCivil, setEstCivil] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here
    };

    const customStyles = {
        control: (provided) => ({
          ...provided,
          color: 'blue', // Cambia el color del texto seleccionado
        }),
        option: (provided) => ({
          ...provided,
          color: 'red', // Cambia el color del texto en el menú desplegable
        }),
    };

    const opcionesEstCivil = [
        { value: 'Casado', label: 'Casado' },
        { value: 'Soltero', label: 'Soltero' },
        { value: 'Viudo', label: 'Viudo' },
        { value: 'Separado', label: 'Separado' },
      ];
      
      const handleChangeCivil = (selectedOption) => {
        setEstCivil(selectedOption);
      };


    useEffect(() => {
        // Realizar una solicitud a la API de REST Countries para obtener la lista de países
        axios.get('https://restcountries.com/v3.1/all')
          .then((response) => {
            const countries = response.data.map((country) => ({
              label: country.name.common,
              value: country.name.common,
            }));
            setNacionalidades(countries);
          })
          .catch((error) => {
            console.error('Error al obtener la lista de países:', error);
          });
      }, []);
    
      const handleChange = (selectedOption) => {
        setNacionalidad(selectedOption);
        };

    return (
        <div className="container flex mt-20 justify-center items-center">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label htmlFor="rut" className="block text-gray-700 font-bold mb-2">RUT:</label>
                    <input type="text" id="rut" name="rut" value={rut} onChange={(e) => setRut(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>

                <div className="mb-4">
                    <label htmlFor="nombres" className="block text-gray-700 font-bold mb-2">Nombres:</label>
                    <input type="text" id="nombres" name="nombres" value={nombres} onChange={(e) => setNombres(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>

                <div className="mb-4">
                    <label htmlFor="apellidos" className="block text-gray-700 font-bold mb-2">Apellidos:</label>
                    <input type="text" id="apellidos" name="apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>

                <div className="mb-4">
                    <label htmlFor="fecha_nacimiento" className="block text-gray-700 font-bold mb-2">Fecha de Nacimiento:</label>
                    <input type="date" id="fecha_nacimiento" name="fecha_nacimiento" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>  

                <div className="mb-4">
                    <label htmlFor="genero" className="block text-gray-700 font-bold mb-2">Sexo:</label>
                    <select id="genero" name="genero" value={genero} onChange={(e) => setGenero(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="nacionalidad" className="block text-gray-700 font-bold mb-2">Nacionalidad:</label>
                    <Select id="nacionalidad" name="nacionalidad" value={nacionalidad} onChange={handleChange} options={nacionalidades} isClearable/>
                </div>

                <div className="mb-4">
                    <label htmlFor="direccion" className="block text-gray-700 font-bold mb-2">Direccion:</label>
                    <input type="date" id="direccion" name="direccion" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>

                <div className="mb-4">
                    <label htmlFor="est_civil" className="block text-gray-700 font-bold mb-2">Estado Civil:</label>
                    <Select id="est_civil" name="est_civil" value={estCivil} onChange={handleChangeCivil} options={opcionesEstCivil} isClearable />
                </div>

                <div className="flex items-center justify-between">
                    <input type="submit" value="Enviar" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" />
                </div>
                
            </form>
        </div>
    );
}

export default ResidenteForm;
