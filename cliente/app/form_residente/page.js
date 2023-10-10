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
    const [fechaIngreso, setFechaIngreso] = useState('');
    const [sisPrevision, setSisPrevision] = useState('');
    const [tipoSangre, setTipoSangre] = useState('');
    const [enfermedadCronica, setEnfermedadCronica] = useState('');
    const [descEnfermedad, setDescEnfermedad] = useState('');
    const [discapacidad, setDiscapacidad] = useState('');
    const [descDiscapacidad, setDescDiscapacidad] = useState('');
    const [medicamentos, setMedicamentos] = useState('');
    const [alergias, setAlergias] = useState('');
    const [descAlergias, setDescAlergias] = useState('');
    const [foto, setFoto] = useState('');
    
     

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
          color: 'black', // Cambia el color del texto en el menú desplegable
        }),
    };

    const opcionesEstCivil = [
        { value: 'Casado', label: 'Casado' },
        { value: 'Soltero', label: 'Soltero' },
        { value: 'Viudo', label: 'Viudo' },
        { value: 'Separado', label: 'Separado' },
    ];

    const opcionesTipoSangre = [
        { value: 'A+', label: 'A+' },
        { value: 'A-', label: 'A-' },
        { value: 'B+', label: 'B+' },
        { value: 'B-', label: 'B-' },
        { value: 'AB+', label: 'AB+' },
        { value: 'AB-', label: 'AB-' },
        { value: 'O+', label: 'O+' },
        { value: 'O-', label: 'O-' },
    ];
      
    const handleChangeCivil = (selectedOption) => {
        setEstCivil(selectedOption);
    };

    const handleChangeSangre = (selectedOption) => {
        setTipoSangre(selectedOption);
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
    
    const handleChangeEnfermedad = (selectedOption) => {
        setDescEnfermedad(e.target.value);
    };

    return (
        <div className="container flex mt-20 justify-center items-center">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2">
                <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">Formulario de Ingreso de Residente</h2>
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
                    <Select id="nacionalidad" name="nacionalidad" value={nacionalidad} onChange={handleChange} options={nacionalidades} styles={customStyles} isClearable defaultValue={{ value: 'Chile', label: 'Chile' }} />
                </div>

                <div className="mb-4">
                    <label htmlFor="direccion" className="block text-gray-700 font-bold mb-2">Direccion:</label>
                    <input type="text" id="direccion" name="direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>

                <div className="mb-4">
                    <label htmlFor="estCivil" className="block text-gray-700 font-bold mb-2">Estado Civil:</label>
                    <Select id="estCivil" name="estCivil" value={estCivil} onChange={handleChangeCivil} options={opcionesEstCivil} styles={customStyles} isClearable />
                </div>

                <div className="mb-4">
                    <label htmlFor="fechaIngreso" className="block text-gray-700 font-bold mb-2">Fecha de Ingreso:</label>
                    <input type="date" id="fechaIngreso" name="fechaIngreso" value={fechaIngreso} onChange={(e) => setFechaIngreso(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>  

                <div className="mb-4">
                    <label htmlFor="sisPrevision" className="block text-gray-700 font-bold mb-2">Sistema de Prevision:</label>
                    <input type="text" id="sisPrevision" name="sisPrevision" value={sisPrevision} onChange={(e) => setSisPrevision(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>  

                <div className="mb-4">
                    <label htmlFor="tipoSangre" className="block text-gray-700 font-bold mb-2">Tipo Sangre:</label>
                    <Select id="tipoSangre" name="tipoSangre" value={tipoSangre} onChange={handleChangeSangre} options={opcionesTipoSangre} styles={customStyles} isClearable />
                </div> 

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">¿Tiene Enfermedades Crónicas?</label>
                    <div className="flex">
                        <label className='text-gray-700'>
                            <input type="radio" name="enfermedadCronica" value="true" checked={enfermedadCronica === "true"} onChange={(e) => setEnfermedadCronica(e.target.value)}/> Sí
                        </label>
                        <label className="text-gray-700 ml-4">
                            <input type="radio" name="enfermedadCronica" value="false" checked={enfermedadCronica === "false"} onChange={(e) => setEnfermedadCronica(e.target.value)}/> No
                        </label>
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="descEnfermedad" className="block text-gray-700 font-bold mb-2">Descripcion Enfermedades:</label>
                    <textarea id="descEnfermedad" name="descEnfermedad" value={descEnfermedad} onChange={(e) => setDescEnfermedad(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" disabled={enfermedadCronica === "false"} />
                </div>  

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">¿Tiene Alguna Discapacidad?</label>
                    <div className="flex">
                        <label className='text-gray-700'>
                            <input type="radio" name="discapacidad" value="true" checked={discapacidad === "true"} onChange={(e) => setDiscapacidad(e.target.value)}/> Sí
                        </label>
                        <label className="text-gray-700 ml-4">
                            <input type="radio" name="discapacidad" value="false" checked={discapacidad === "false"} onChange={(e) => setDiscapacidad(e.target.value)}/> No
                        </label>
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="descDiscapacidad" className="block text-gray-700 font-bold mb-2">Descripcion Descapacidad:</label>
                    <textarea id="descDiscapacidad" name="descDiscapacidad" value={descDiscapacidad} onChange={(e) => setDescDiscapacidad(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" disabled={discapacidad === "false"} />
                </div> 

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">¿Alergias?</label>
                    <div className="flex">
                        <label className='text-gray-700'>
                            <input type="radio" name="alergias" value="true" checked={alergias === "true"} onChange={(e) => setAlergias(e.target.value)}/> Sí
                        </label>
                        <label className="text-gray-700 ml-4">
                            <input type="radio" name="alergias" value="false" checked={alergias === "false"} onChange={(e) => setAlergias(e.target.value)}/> No
                        </label>
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="descAlergias" className="block text-gray-700 font-bold mb-2">Descripcion Alergias:</label>
                    <textarea id="descAlergias" name="descAlergias" value={descAlergias} onChange={(e) => setDescAlergias(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" disabled={alergias === "false"} />
                </div>

                <div className="mb-4">
                    <label htmlFor="medicamentos" className="block text-gray-700 font-bold mb-2">Medicamentos:</label>
                    <textarea id="medicamentos" name="medicamentos" value={medicamentos} onChange={(e) => setMedicamentos(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div> 

                <div className="mb-4">
                    <label htmlFor="foto" className="block text-gray-700 font-bold mb-2">Foto</label>
                    <input type="file" id="foto" name="foto" accept="image/*"  onChange={(e) => setFoto(e.target.files[0])} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>

                <div className="flex items-center justify-between">
                    <input type="submit" value="Enviar" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" />
                </div>             
                
            </form>
        </div>
    );
};
export default ResidenteForm;
