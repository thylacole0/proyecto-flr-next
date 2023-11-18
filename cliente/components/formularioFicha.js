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
import { useSearchParams } from 'next/navigation'
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useSession } from 'next-auth/react';


const FormFicha = () => {

    let rut_residente = ''

    const searchParams = useSearchParams();
    if (searchParams.get('rut_res') !== null) {
        rut_residente = searchParams.get('rut_res');
    }

    const [residente, setResidente] = useState([]);
    const [rut_res, setRut] = useState('');
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [genero, setGenero] = useState('');
    const [sisPrevision, setSisPrevision] = useState('');
    const [tipoSangre, setTipoSangre] = useState('');
    const [enfermedadCronica, setEnfermedadCronica] = useState('');
    const [descEnfermedad, setDescEnfermedad] = useState('');
    const [discapacidad, setDiscapacidad] = useState('');
    const [descDiscapacidad, setDescDiscapacidad] = useState('');
    const [alergias, setAlergias] = useState('true');
    const [descAlergias, setDescAlergias] = useState('');
    const [medicamentos, setMedicamentos] = useState('');
    const [fotoRes, setFotoRes] = useState('');
    const { data: session, status } = useSession();


    let fechaNac = moment(fechaNacimiento).utc().format('DD-MM-YYYY')

    const reload = () => window.location.reload();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here
        let tipoSangreRes = tipoSangre.value;
        try {
            const body = {
                rut, nombres, apellidos, fechaNacimiento, genero, nacionalidadRes, direccion, estadoCivil,
                fechaIngreso, sisPrevision, tipoSangreRes, enfermedadCronica, descEnfermedad,
                discapacidad, descDiscapacidad, alergias, descAlergias, medicamentos
            };
            const response = axios.post("http://localhost:8080/form_residente", body);
            window.location = "/home_test";

        } catch (error) {
            console.log(error);
        }
    };


    const sangre = [{ value: 'A+', label: 'A+' }, { value: 'A-', label: 'A-' }, { value: 'B+', label: 'B+' }, { value: 'B-', label: 'B-' }, { value: 'AB+', label: 'AB+' }, { value: 'AB-', label: 'AB-' }, { value: 'O+', label: 'O+' }, { value: 'O-', label: 'O-' },
    ];

    const getResidente = async () => {

        try {
            const response = await axios.get(`http://localhost:8080/allresidentes/${rut_residente}`);
            const jsonDatos = await response.data;
            setResidente(jsonDatos);
            setRut(jsonDatos[0].rut_res);
            setNombres(jsonDatos[0].nombres_res);
            setApellidos(jsonDatos[0].apes_res);
            setFechaNacimiento(jsonDatos[0].fecha_nac_res);
            setGenero(jsonDatos[0].genero_res);
            setSisPrevision(jsonDatos[0].sis_prevision_res);
            setTipoSangre(jsonDatos[0].tipo_sangre_res);
            jsonDatos[0].enfermedad_cronica_res == true ? setEnfermedadCronica('true') : setEnfermedadCronica('false');
            setDescEnfermedad(jsonDatos[0].desc_enfermedad_res);
            jsonDatos[0].discapacidad_res == true ? setDiscapacidad('true') : setDiscapacidad('false');
            setDescDiscapacidad(jsonDatos[0].desc_discapacidad_res);
            jsonDatos[0].alergias_res == true ? setAlergias('true') : setAlergias('false');
            setDescAlergias(jsonDatos[0].desc_alergias_res);
            setMedicamentos(jsonDatos[0].medicamentos_res);
            setFotoRes(jsonDatos[0].foto_res);
        } catch (error) {
            console.log(error);
        }
    };

    const modificarDatosResidente = async (e) => {
        e.preventDefault();
        let body = { rut_res, enfermedadCronica, descEnfermedad, discapacidad, descDiscapacidad, alergias, descAlergias, medicamentos };
        if (!body.enfermedadCronica) {
            body.descEnfermedad = '';
        }
        if (!body.discapacidad) {
            body.descDiscapacidad = '';
        }
        if (!body.alergias) {
            body.descAlergias = '';
        }
        try {
            const response = await axios.put(`http://localhost:8080/actualizarficharesidente/${rut_res}`, body);
            if (response.data === 'Updateado con exitoooooooo') {
                // Actualiza el estado del componente aquí
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getResidente();
    }, [fechaNac])



    return (
        <>
            <div className="container flex justify-center items-center">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-5/6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">Ficha Residente</h2>
                    <Avatar
                        alt="fotoRes"
                        src={`http://localhost:8080/static/${fotoRes.replace(/\\/g, '/').replace('src/uploads/', '')}`}
                        sx={{ width: 150, height: 150 }}
                        className='mx-auto block mb-5'
                    />
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
                    <TextField fullWidth margin="dense" id="outlined-select-currency" select label="Tipo de Sangre" value={tipoSangre} onChange={(e) => setTipoSangre(e.target.value)} disabled={session?.tipo_user === 'Visitante' ? true : false}>
                        {sangre.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <FormControl>
                        <FormLabel className="mt-5" margin="dense" id="demo-row-radio-buttons-group-label">¿Tiene enfermedad Cronica?</FormLabel>
                        <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" value={enfermedadCronica.toString()} onChange={(e) => setEnfermedadCronica(e.target.value === "true")}>
                            <FormControlLabel value="true" control={<Radio />} label="Si" disabled={session?.tipo_user === 'Visitante' ? true : false}/>
                            <FormControlLabel value="false" control={<Radio />} label="No" disabled={session?.tipo_user === 'Visitante' ? true : false}/>
                        </RadioGroup>
                    </FormControl>
                    <TextField
                        id="outlined-multiline-static"
                        margin="dense"
                        fullWidth
                        label="Descripcion de las enfermedades"
                        multiline
                        rows={4}
                        value={descEnfermedad}
                        onChange={(e) => setDescEnfermedad(e.target.value)}
                        disabled={session?.tipo_user === 'Visitante' ? true : false}
                    />
                    <FormControl>
                        <FormLabel className="mt-5" id="demo-row-radio-buttons-group-label">¿Tiene alguna discapacidad?</FormLabel>
                        <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" value={discapacidad.toString()} onChange={(e) => setDiscapacidad(e.target.value === "true")}>
                            <FormControlLabel value="true" control={<Radio />} label="Si" disabled={session?.tipo_user === 'Visitante' ? true : false}/>
                            <FormControlLabel value="false" control={<Radio />} label="No" disabled={session?.tipo_user === 'Visitante' ? true : false}/>
                        </RadioGroup>
                    </FormControl>
                    <TextField
                        id="outlined-multiline-static"
                        margin="dense"
                        fullWidth
                        label="Descripcion de las discapacidades"
                        multiline
                        rows={4}
                        value={descDiscapacidad}
                        onChange={(e) => setDescDiscapacidad(e.target.value)}
                        disabled={session?.tipo_user === 'Visitante' ? true : false}
                    />
                    <FormControl>
                        <FormLabel className="mt-5" id="demo-row-radio-buttons-group-label">¿Es alérgico a algún medicamento?</FormLabel>
                        <RadioGroup margin="dense" row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" value={alergias.toString()} onChange={(e) => setAlergias(e.target.value === "true")}>
                            <FormControlLabel value="true" control={<Radio />} label="Si" disabled={session?.tipo_user === 'Visitante' ? true : false}/>
                            <FormControlLabel value="false" control={<Radio />} label="No" disabled={session?.tipo_user === 'Visitante' ? true : false}/>
                        </RadioGroup>
                    </FormControl>
                    <TextField
                        id="outlined-multiline-static"
                        margin="dense"
                        fullWidth
                        label="Descripcion de las alergias"
                        multiline
                        rows={4}
                        value={descAlergias}
                        onChange={(e) => setDescAlergias(e.target.value)}
                        disabled={session?.tipo_user === 'Visitante' ? true : false}
                    />
                    <FormControl>
                        <FormLabel className="mt-5" id="demo-row-radio-buttons-group-label">Medicamentos</FormLabel>
                    </FormControl>
                    <TextField
                        id="outlined-multiline-static"
                        className="mt-5"
                        margin="dense"
                        fullWidth
                        label="Medicamentos que toma actualmente"
                        multiline
                        rows={4}
                        value={medicamentos}
                        onChange={(e) => setMedicamentos(e.target.value)}
                        disabled={session?.tipo_user === 'Visitante' ? true : false}
                    />

                    <div className="flex items-center justify-between mt-5">
                        {session?.tipo_user == 'Enfermero' && (
                            <Button variant="contained" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline " onClick={(e) => { modificarDatosResidente(e); reload() }} endIcon={<SaveIcon />}>
                                Guardar
                            </Button>
                        )}
                    </div>

                </form>
            </div>
        </>
    );
};
export default FormFicha;
