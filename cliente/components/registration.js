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

                }
            }
            catch (error) {
                console.error(error);
            }
        }
    }

    async function submitNewNurse(usuarioId) {
        const formDataNurse = nurseFormRef.current.getFormData();
        try {
            const { rutNurse, nombresNurse, apellidosNurse, correoNurse, fechaNacimientoNurse, celNurse, celauxNurse, fechaContratoNurse, contratoNurse, turnoNurse, especialidadNurse } = formDataNurse;
            const body = { rutNurse, usuarioId, nombresNurse, apellidosNurse, correoNurse, fechaNacimientoNurse, celNurse, celauxNurse, fechaContratoNurse, contratoNurse, turnoNurse, especialidadNurse };
            const response = await axios.post("http://localhost:8080/form_nurse", body);
        } catch (error) {
            console.log(error);
        }
    }

    async function submitNewGuardia(usuarioId) {

        const formData1 = guardiaFormRef.current.getFormData();
        formData1.usuarioId = usuarioId;
        try {
            const formData = { ...guardiaFormRef.current.getFormData(), ...formData1}
        
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
        <div className="flex items-center justify-center">
            <div className="bg-white p-11 rounded shadow-md">
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
                            formData.tipo_user === 'Enfermero' ? <NurseForm ref={nurseFormRef}/> :
                            formData.tipo_user === 'Visitante' ? <VisitForm /> :
                            formData.tipo_user === 'Guardia' ? <GuardiaForm ref={guardiaFormRef}/> :
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
    );
};



export default RegisterPage;