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

const BotonesCrudVis = ({handleDeleteRow, visitante}) => {

    const [rutVis, setRutVis] = useState(visitante.rut);
    const [nombresVisitante, setNombresVisitante] = useState(visitante.nombres_vis);
    const [apellidosVisitante, setApellidosVisitante] = useState(visitante.apes_vis);
    const [emailVisitante, setEmailVisitante] = useState(visitante.email_vis);
    const [telefonoVisitante, setTelefonoVisitante] = useState(visitante.telefono_vis);
    const [direccionVisitante, setDireccionVisitante] = useState(visitante.direccion_vis);
    const [rutResidente, setRutResidente] = useState(visitante.rut_residente);

    const [open, setOpen] = useState(false);
    const handleOpenDialog = () => setOpen(true);
    const handleCloseDialog = () => setOpen(false);
    const reload = () => window.location.reload();

    const modificarDatosVisitante = async (e) => {
        e.preventDefault();
        try {
            const body = { rutVis, nombresVisitante, apellidosVisitante, emailVisitante, telefonoVisitante, direccionVisitante, rutResidente};
            const response = await axios.put(`http://localhost:8080/allvisitantes/${rutVis}`, body);

            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    const primary = yellow[800];
    const secondary = red[900];

    return (
        <div className="items-center">
            <Stack direction="row" spacing={2}>
                <Button onClick = {handleOpenDialog} variant="outlined" style={{ color: primary, borderColor: primary }} startIcon={<ModeIcon />} >
                    Editar
                </Button>
                <Dialog open={open} onClose={handleCloseDialog} id={`id${visitante.rutVis}`}>
                    <DialogTitle>Editar información del visitante</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Aqui podras editar los datos del visitante
                        </DialogContentText>
                        
                        <TextField margin="dense" id="2" label="Nombres" type="text" fullWidth variant="outlined" value={nombresVisitante} onChange={(e) => setNombresVisitante(e.target.value)}
                        />
                        <TextField margin="dense" id="3" label="Apellidos" type="text" fullWidth variant="outlined" value={apellidosVisitante} onChange={(e) => setApellidosVisitante(e.target.value)}
                        />
                        <TextField margin="dense" id="4" label="Email" type="text" fullWidth variant="outlined" value={emailVisitante} onChange={(e) => setEmailVisitante(e.target.value)}
                        />
                        <TextField margin="dense" id="5" label="Telefono" type="text" fullWidth variant="outlined" value={telefonoVisitante} onChange={(e) => setTelefonoVisitante(e.target.value)}
                        />
                        <TextField margin="dense" id="6" label="Direccion" type="text" fullWidth variant="outlined" value={direccionVisitante} onChange={(e) => setDireccionVisitante(e.target.value)}
                        />
                        <TextField margin="dense" id="7" label="Rut Residente" type="text" fullWidth variant="outlined" value={rutResidente} onChange={(e) => setRutResidente(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button onClick={(e) => {modificarDatosVisitante(e); handleCloseDialog(); reload()}}>Editar</Button>
                    </DialogActions>
                </Dialog>
                <Button onClick={handleDeleteRow} variant="outlined" style={{ color: secondary, borderColor: secondary }} endIcon={<DeleteIcon />}>
                    Eliminar
                </Button>
            </Stack>
        </div>
    );
};

export default BotonesCrudVis;
