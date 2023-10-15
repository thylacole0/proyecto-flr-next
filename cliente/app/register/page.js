'use client'
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MenuItem from '@mui/material/MenuItem';

const StyledTextField = styled(TextField)({
    marginBottom: "1rem",
});

const RegisterPage = () => {

    const tipo_usuario = [
,
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
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        tipo_user: '',
        estado_user: 'Activo',
    });


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
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
            console.log('Form submitted:', formData);
        }
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md">
                <h1 className="text-2xl font-bold mb-4">Register</h1>
                <form onSubmit={handleSubmit}>
                    <StyledTextField
                        label="Nombre de usuario"
                        variant="outlined"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        error={!!formErrors.username}
                        helperText={formErrors.username}
                        fullWidth
                    />
                    <StyledTextField
                        label="Contraseña"
                        variant="outlined"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        error={!!formErrors.password}
                        helperText={formErrors.password}
                        fullWidth
                    />
                    <StyledTextField
                        label="Confirmar contraseña"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        error={!!formErrors.confirmPassword}
                        helperText={formErrors.confirmPassword}
                        fullWidth
                    />
                    <TextField
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
                    <Button variant="contained" color="secondary" type="submit" fullWidth>
                        Register
                    </Button>
                </form>
            </div>
        </div>
    );
};



export default RegisterPage;