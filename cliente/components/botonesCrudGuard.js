"use client";
import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ModeIcon from '@mui/icons-material/Mode';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { red, yellow } from '@mui/material/colors';
import { Delete } from '@mui/icons-material';
import axios from 'axios';
import moment from 'moment';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';

// DIALOG IMPORT 
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const BotonesCrudGuard = ({ handleDeleteRow, guardia }) => {


    // const [rut_res, setRut_res] = useState('123123');
    // const [nombres, setNombres] = useState(residente.nombres_res);
    // const [apellidos, setApellidos] = useState(residente.apes_res);
    // const [direccion, setDireccion] = useState(residente.direccion_res);
    // const [estadoCivil, setEstadoCivil] = useState(residente.estadocivil_res);
    // const [fechaNacimiento, setFechaNacimiento] = useState(residente.fecha_nac_res);
    // const [medicamentos, setMedicamentos] = useState(residente.medicamentos_res);

    const [rutGuard, setRutGuard] = useState(guardia[0]);
    const [nombresGuard, setNombresGuard] = useState(guardia[1]);
    const [apellidosGuard, setApellidosGuard] = useState(guardia[2]);
    const [correoGuard, setCorreoGuard] = useState(guardia[3]);
    const [celGuard, setCelGuard] = useState(guardia[4]);
    const [celauxGuard, setCelauxGuard] = useState(guardia[5]);
    const [tipoContratoGuard, setTipoContratoGuard] = useState(guardia[6]);

    const [open, setOpen] = useState(false);
    const handleOpenDialog = () => setOpen(true);
    const handleCloseDialog = () => setOpen(false);
    const reload = () => window.location.reload();

    const modificarDatosGuardia = async (e) => {
        e.preventDefault();
        try {
            const body = { rutGuard, nombresGuard, apellidosGuard, correoGuard, celGuard, celauxGuard, tipoContratoGuard };
            const response = await axios.put(`http://localhost:8080/allguardias/${rutGuard}`, body);

        } catch (error) {
            console.error(error);
        }
    }

    console.log(celauxGuard);
    console.log(tipoContratoGuard);

    const currencies = [ { value: 'Completo', label: 'Completo' }, { value: 'Part-Time', label: 'Part-Time' }];


    const primary = yellow[800];
    const secondary = red[900];

    return (
        <div className="items-center">
            <Stack direction="row" spacing={2}>
                <Button onClick={handleOpenDialog} variant="outlined" style={{ color: primary, borderColor: primary }} startIcon={<ModeIcon />} >
                    Editar
                </Button>
                <Dialog open={open} onClose={handleCloseDialog} id={`id${guardia.rutGuard}`}>
                    <DialogTitle>Editar información del Guardia</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Aqui podras editar los datos del guardia
                        </DialogContentText>

                        <TextField margin="dense" id="2" label="Nombres" type="text" fullWidth variant="outlined" value={nombresGuard} onChange={(e) => setNombresGuard(e.target.value)}
                        />
                        <TextField margin="dense" id="3" label="Apellidos" type="text" fullWidth variant="outlined" value={apellidosGuard} onChange={(e) => setApellidosGuard(e.target.value)}
                        />
                        <TextField margin="dense" id="4" label="Correo" type="text" fullWidth variant="outlined" value={correoGuard} onChange={(e) => setCorreoGuard(e.target.value)}
                        />
                        <TextField margin="dense" id="5" label="Celular" type="text" fullWidth variant="outlined" value={celGuard} onChange={(e) => setCelGuard(e.target.value)}
                        />
                        <TextField margin="dense" id="6" label="Numero de emergencia" type="text" fullWidth variant="outlined" value={celauxGuard} onChange={(e) => setCelauxGuard(e.target.value)}
                        />
                        <TextField fullWidth margin="dense" id="outlined-select-currency" select label="Tipo de Contrato" value={tipoContratoGuard} onChange={(e) => setTipoContratoGuard(e.target.value)}>
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button onClick={(e) => { modificarDatosGuardia(e); handleCloseDialog(); reload() }}>Editar</Button>
                    </DialogActions>
                </Dialog>
                <Button onClick={handleDeleteRow} variant="outlined" style={{ color: secondary, borderColor: secondary }} endIcon={<DeleteIcon />}>
                    Eliminar
                </Button>
            </Stack>
        </div>
    );
};

export default BotonesCrudGuard;
