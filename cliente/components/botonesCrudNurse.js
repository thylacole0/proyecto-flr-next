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

const BotonesCrudNurse = ({ handleDeleteRow, enfermero }) => {

    const [rut_enfer, setRutNurse] = useState(enfermero[0]);
    const [nombresNurse, setNombresNurse] = useState(enfermero[1]);
    const [apellidosNurse, setApellidosNurse] = useState(enfermero[2]);
    const [correoNurse  , setCorreoNurse] = useState(enfermero[3]);
    const [celNurse, setCelNurse] = useState(enfermero[4]);
    const [celauxNurse, setCelauxNurse] = useState(enfermero[5]);
    const [tipoContratoNurse, setTipoContratoNurse] = useState(enfermero[6]);
    const [turnoNurse, setTurnoNurse] = useState(enfermero[7]);
    const [especialidadNurse, setEspecialidadNurse] = useState(enfermero[8]);

    const [open, setOpen] = useState(false);
    const handleOpenDialog = () => setOpen(true);
    const handleCloseDialog = () => setOpen(false);
    const reload = () => window.location.reload();

    const modificarDatosEnfermero = async (e) => {
        e.preventDefault();
        try {
            const body = { rut_enfer, nombresNurse, apellidosNurse, correoNurse, celNurse, celauxNurse, tipoContratoNurse, turnoNurse, especialidadNurse };
            const response = await axios.put(`http://localhost:8080/allenfermeros/${rut_enfer}`, body);

        } catch (error) {
            console.error(error);
        }
    }

    const currencies = [ { value: 'Completo', label: 'Completo' }, { value: 'Part-Time', label: 'Part-Time' }, { value: 'Practicante', label: 'Practicante' }];
    const turnos = [ { value: 'Mañana', label: 'Mañana' }, { value: 'Tarde', label: 'Tarde' }, { value: 'Noche', label: 'Noche' }];

    const primary = yellow[800];
    const secondary = red[900];

    return (
        <div className="items-center">
            <Stack direction="row" spacing={2}>
                <Button onClick={handleOpenDialog} variant="outlined" style={{ color: primary, borderColor: primary }} startIcon={<ModeIcon />} >
                     <span>Editar</span>
                </Button>
                <Dialog open={open} onClose={handleCloseDialog} id={`id${enfermero.rut_enfer}`}>
                    <DialogTitle>Editar información del enfermero</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Aqui podras editar los datos del enfermero
                        </DialogContentText>
                        <TextField margin="dense" id="2" label="Nombres" type="text" fullWidth variant="outlined" value={nombresNurse} onChange={(e) => setNombresNurse(e.target.value)}
                        />
                        <TextField margin="dense" id="3" label="Apellidos" type="text" fullWidth variant="outlined" value={apellidosNurse} onChange={(e) => setApellidosNurse(e.target.value)}
                        />
                        <TextField margin="dense" id="4" label="Correo" type="text" fullWidth variant="outlined" value={correoNurse} onChange={(e) => setCorreoNurse(e.target.value)}
                        />
                        <TextField margin="dense" id="5" label="Celular" type="text" fullWidth variant="outlined" value={celNurse} onChange={(e) => setCelNurse(e.target.value)}
                        />
                        <TextField margin="dense" id="6" label="Numero de emergencia" type="text" fullWidth variant="outlined" value={celauxNurse} onChange={(e) => setCelauxNurse(e.target.value)}
                        />
                        <TextField fullWidth margin="dense" id="outlined-select-currency" select label="Tipo de Contrato" value={tipoContratoNurse} onChange={(e) => setTipoContratoNurse(e.target.value)}>
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField fullWidth margin="dense" id="outlined-select-currency" select label="Turno" value={turnoNurse} onChange={(e) => setTurnoNurse(e.target.value)}>
                            {turnos.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField margin="dense" id="7" label="Especialidad" type="text" fullWidth variant="outlined" value={especialidadNurse} onChange={(e) => setEspecialidadNurse(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}><span>Cancelar</span></Button>
                        <Button onClick={(e) => { modificarDatosEnfermero(e); handleCloseDialog(); reload()}}> <span>Editar</span></Button>
                    </DialogActions>
                </Dialog>
                <Button onClick={handleDeleteRow} variant="outlined" style={{ color: secondary, borderColor: secondary }} endIcon={<DeleteIcon />}>
                    <span>Eliminar</span>
                </Button>
            </Stack>
        </div>
    );
};

export default BotonesCrudNurse;
