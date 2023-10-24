"use client";
import React, { useState, useEffect } from 'react'; 
import 'tailwindcss/tailwind.css';
import Select from 'react-select';
import axios from 'axios';  
import styles from '../app/residentes/residentes.module.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import moment from 'moment';
import MenuItem from '@mui/material/MenuItem';

const FormFicha = () => {

    const [residente, setResidente] = useState([]);

    const [rut_res, setRut] = useState(residente.rut_res);
    const [nombres, setNombres] = useState(residente[1]);
    const [apellidos, setApellidos] = useState(residente[2]);
    const [fechaNacimiento, setFechaNacimiento] = useState(residente[3]);
    const [genero, setGenero] = useState(residente[4]);
    const [sisPrevision, setSisPrevision] = useState(residente[5]);
    const [tipoSangre, setTipoSangre] = useState(residente[6]);
    const [enfermedadCronica, setEnfermedadCronica] = useState(residente[7]);
    const [descEnfermedad, setDescEnfermedad] = useState(residente[8]);
    const [discapacidad, setDiscapacidad] = useState(residente[9]);
    const [descDiscapacidad, setDescDiscapacidad] = useState(residente[10]);
    const [alergias, setAlergias] = useState(residente[11]);
    const [descAlergias, setDescAlergias] = useState(residente[12]);
    const [medicamentos, setMedicamentos] = useState(residente[13]);
    // const [foto, setFoto] = useState('');

    let fechaNac = moment(fechaNacimiento).utc().format('YYYY-MM-DD')
    

    console.log(residente, 'rut_res') 

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here
        let estadoCivil = estCivil.value;
        let tipoSangreRes = tipoSangre.value;
        let nacionalidadRes = nacionalidad.value;
        try {
            const body = { 
                rut, nombres, apellidos, fechaNacimiento, genero, nacionalidadRes, direccion, estadoCivil, 
                fechaIngreso, sisPrevision, tipoSangreRes, enfermedadCronica, descEnfermedad, 
                discapacidad, descDiscapacidad, medicamentos, alergias, descAlergias
            };
            console.log(body)
            const response = axios.post("http://localhost:8080/form_residente", body);
            console.log(response);
            window.location = "/home_test";  
            
        } catch (error) {
            console.log(error);
        }
    };


    const sangre = [{ value: 'A+', label: 'A+' }, { value: 'A-', label: 'A-' }, { value: 'B+', label: 'B+' }, { value: 'B-', label: 'B-' }, { value: 'AB+', label: 'AB+' }, { value: 'AB-', label: 'AB-' }, { value: 'O+', label: 'O+' }, { value: 'O-', label: 'O-' },
    ];

    const getResidente = async () => {

        try{
          const response = await axios.get(`http://localhost:8080/allresidentes/123456789-0`);
          const jsonDatos = await response.data;
          console.log(jsonDatos, 'llego el json'); 
          setResidente(jsonDatos);
        } catch (error) {
          console.log(error);
        }
    };

    const modificarDatosResidente = async (e) => {
        e.preventDefault();
        try {
            const body = { rut_res, enfermedadCronica, descEnfermedad, discapacidad, descDiscapacidad, medicamentos, alergias, descAlergias };
            const response = await axios.put(`http://localhost:8080/actualizarficharesidente/${rut_res}`, body);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
    }, [fechaNac]);

    useEffect(() => {
        getResidente();
    }, [])



    return (
        <> 
            <body className={styles.body}>
                <section>
                    <div className="container flex mt-20 justify-center items-center">
                        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2">
                            <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">Ficha Residente</h2>
                            <TextField margin="dense" id="1" label="RUT" type="text" fullWidth variant="outlined" value={rut_res} onChange={(e) => setRut(e.target.value)} disabled={true}
                            />
                            <TextField margin="dense" id="2" label="Nombres" type="text" fullWidth variant="outlined" value={nombres} onChange={(e) => setNombres(e.target.value)} disabled={true}
                            />
                            <TextField margin="dense" id="3" label="Apellidos" type="text" fullWidth variant="outlined" value={apellidos} onChange={(e) => setApellidos(e.target.value)} disabled={true}
                            />
                            <TextField margin="dense" id="4" label="Fecha de Nacimiento" type="text" fullWidth variant="outlined" value={fechaNac} onChange={(e) => setFechaNacimiento(e.target.value)} disabled={true}
                            />
                            <TextField margin="dense" id="5" label="Sexo" type="text" fullWidth variant="outlined" value={genero} onChange={(e) => setGenero(e.target.value)} disabled={true}
                            />
                            <TextField margin="dense" id="6" label="Sistema de prevision" type="text" fullWidth variant="outlined" value={sisPrevision} onChange={(e) => setSisPrevision(e.target.value)} disabled={true}
                            />
                            <TextField fullWidth margin="dense" id="outlined-select-currency" select label="Tipo de Sangre" value={tipoSangre} onChange={(e) => setTipoSangre(e.target.value)}>
                            {sangre.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                            </TextField>
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">¿Tiene enfermedad Cronica?</FormLabel>
                                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" value={enfermedadCronica} onChange={(e) => setEnfermedadCronica(e.target.value)}>
                                    <FormControlLabel value="Si" control={<Radio />} label="Si" />
                                    <FormControlLabel value="No" control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                            <TextField
                                id="outlined-multiline-static"
                                label="Descripcion de las enfermedades"
                                multiline
                                rows={4}
                                value={descEnfermedad}
                                onChange={(e) => setDescEnfermedad(e.target.value)}
                            />
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">¿Tiene alguna discapacidad?</FormLabel>
                                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" value={discapacidad} onChange={(e) => setDiscapacidad(e.target.value)}>
                                    <FormControlLabel value="Si" control={<Radio />} label="Si" />
                                    <FormControlLabel value="No" control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                            <TextField
                                id="outlined-multiline-static"
                                label="Descripcion de las discapacidades"
                                multiline
                                rows={4}
                                value={descDiscapacidad}
                                onChange={(e) => setDescDiscapacidad(e.target.value)}
                            />
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">¿Es alergico a algo?</FormLabel>
                                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" value={alergias} onChange={(e) => setAlergias(e.target.value)}>
                                    <FormControlLabel value="Si" control={<Radio />} label="Si" />
                                    <FormControlLabel value="No" control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                            <TextField
                                id="outlined-multiline-static"
                                label="Descripcion de las alergias"
                                multiline
                                rows={4}
                                value={descAlergias}
                                onChange={(e) => setDescAlergias(e.target.value)}
                            />
                            <TextField
                                id="outlined-multiline-static"
                                label="Medicamentos que toma actualmente"
                                multiline
                                rows={4}
                                value={medicamentos}
                                onChange={(e) => setMedicamentos(e.target.value)}
                            />

                            <div className="flex items-center justify-between">
                                <input type="submit" value="Enviar" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" />
                            </div>             
                            
                        </form>
                    </div>
                </section>
            </body>
        </>           
    );
};
export default FormFicha;