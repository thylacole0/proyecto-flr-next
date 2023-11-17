'use client'
import { useEffect, useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";
import GuardiaForm from './fomularios/formularioGuardia.js';
import NurseForm from './fomularios/formularioEnfermero.js';
import VisitForm from './fomularios/formularioVisitante.js';
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AlertTitle from '@mui/material/AlertTitle';
import { redirect } from "next/navigation";
import { set } from "react-hook-form";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const StyledTextField = styled(TextField)({
    marginBottom: "1rem",
});


const RegisterPage = () => {

    const tipo_usuario = [
        {
            value: 'Enfermero',
            label: 'Enfermero',
        },
        {
            value: 'Visitante',
            label: 'Visitante',
        },
        {
            value: 'Guardia',
            label: 'Guardia',
        },
    ];


    const [formErrors, setFormErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [creacionUsuario, setCreacionUsuario] = useState('');
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
        location.reload();
    };

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        tipo_user: '',
        estado_user: true,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    
    const guardiaFormRef = useRef();
    const nurseFormRef = useRef();
    const visitFormRef = useRef();

    async function submitNewUser() {
        const errors = {};
        if (!formData.username) {
            errors.username = 'El nombre de usuario es requerido';
        }
        if (!formData.password) {
            errors.password = 'La contraseña es requerida';
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        if (!formData.confirmPassword) {
            errors.confirmPassword = 'Es necesario confirmar la contraseña';
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Las contraseñas no coinciden';
        }
        if (!formData.tipo_user) {
            errors.tipo_user = 'Ingrese el tipo de usuario';
        }
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            try {
                const { username, password, tipo_user, estado_user } = formData;
                const body = { username, password, tipo_user, estado_user };
                const response = await axios.post(`http://localhost:8080/auth/register`, body)

                setCreacionUsuario(response.data.user.user_id)

                if (formData.tipo_user === 'Enfermero') {
                    submitNewNurse(response.data.user.user_id)
                } else if (formData.tipo_user === 'Guardia') {
                    submitNewGuardia(response.data.user.user_id)
                } else if (formData.tipo_user === 'Visitante') {
                    submitNewVisitante(response.data.user.user_id)
                }

                setOpen(true);
            }
            catch (error) {
                console.error(error);
            }
        }
    }

    async function submitNewVisitante(usuarioId) {
        const formDataVisit = visitFormRef.current.getFormData();
        console.log(formDataVisit)
        try {
            const { rutVisit, nombresVisit, apellidosVisit, correoVisit, celVisit, celauxVisit, direccionVisit, rutVinculado } = formDataVisit;
            const body = { rutVisit, usuarioId, nombresVisit, apellidosVisit, correoVisit, celVisit, celauxVisit, direccionVisit, rutVinculado };
            const response = await axios.post("http://localhost:8080/form_visitante", body);
        } catch (error) {
            console.log(error);
        }
    }

    async function submitNewNurse(usuarioId) {

        const formData2 = nurseFormRef.current.getFormData();
        formData2.usuarioId = usuarioId;
        try {
            const formData = { ...nurseFormRef.current.getFormData(), ...formData2 }

            // Crear una instancia de FormData
            const body = new FormData();
            // Agregar los datos al formulario
            for (const key in formData) {
                if (key === 'fotoNurse') {
                    // Suponiendo que 'fotoGuard' es un objeto File o Blob
                    body.append(key, formData[key], formData[key].name);
                } else {
                    body.append(key, formData[key]);
                }
            }
            const response1 = await axios.post("http://localhost:8080/form_nurse", body, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

        } catch (error) {
            console.error(error);
        }
    }

    async function submitNewGuardia(usuarioId) {

        const formData1 = guardiaFormRef.current.getFormData();
        formData1.usuarioId = usuarioId;
        try {
            const formData = { ...guardiaFormRef.current.getFormData(), ...formData1 }

            // Crear una instancia de FormData
            const body = new FormData();
            // Agregar los datos al formulario
            for (const key in formData) {
                if (key === 'fotoGuard') {
                    // Suponiendo que 'fotoGuard' es un objeto File o Blob
                    body.append(key, formData[key], formData[key].name);
                } else {
                    body.append(key, formData[key]);
                }
            }
            const response1 = await axios.post("http://localhost:8080/form_guardia", body, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

        } catch (error) {
            console.error(error);
        }
    }

    const submitRegistration = async (event) => {
        event.preventDefault();
        submitNewUser();
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Usuario creado"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        El usuario se ha creado correctamente.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
            <div className="flex justify-center items-center">
                <div className="bg-white p-11 rounded shadow-md w-[700px]">
                    <h1 className="text-2xl font-bold mb-2 text-center">Registrar nuevo usuario</h1>
                    <form onSubmit={submitRegistration}>
                        <div className="relative my-4">

                            <StyledTextField
                                className="w-full"
                                label="Nombre de usuario"
                                variant="outlined"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                error={!!formErrors.username}
                                helperText={formErrors.username}
                            />
                        </div>
                        <div className="relative my-2">
                            <StyledTextField
                                className="w-full"
                                label="Contraseña"
                                variant="outlined"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                error={!!formErrors.password}
                                helperText={formErrors.password}
                            />
                        </div>
                        <div className="relative my-4">
                            <StyledTextField
                                className="w-full"
                                label="Confirmar contraseña"
                                variant="outlined"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                error={!!formErrors.confirmPassword}
                                helperText={formErrors.confirmPassword}
                            />
                        </div>
                        <div className="relative my-4">
                            <TextField
                                className="w-full"
                                id="filled-select-currency"
                                select
                                label="Tipo de usuario"
                                defaultValue=""
                                helperText="Selecciona el tipo de usuario"
                                onChange={handleInputChange}
                                error={!!formErrors.tipo_user}
                                name="tipo_user"
                            >
                                {tipo_usuario.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            {
                                formData.tipo_user === 'Enfermero' ? <NurseForm ref={nurseFormRef} /> :
                                    formData.tipo_user === 'Visitante' ? <VisitForm ref={visitFormRef} /> :
                                        formData.tipo_user === 'Guardia' ? <GuardiaForm ref={guardiaFormRef} /> :
                                            null
                            }

                        </div>
                        <Button type="submit" fullWidth className="w-full mb-4 text-[18px] mt-6 rounded-full bg-violet-900 text-white hover:bg-blue-900 hover:text-white py-2.3 transition-color duration-300 py-2 border-slate-100 border-2">
                            <span>Registrar usuario</span>
                        </Button>

                        <a href="/home_test" className="flex justify-end">Volver al inicio</a>
                    </form>
                </div>
            </div>
        </>
    );
};



export default RegisterPage;