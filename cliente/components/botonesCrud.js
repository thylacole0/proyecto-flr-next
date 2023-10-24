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

const BotonesCrud = ({ handleDeleteRow, residente }) => {


    // const [rut_res, setRut_res] = useState('123123');
    // const [nombres, setNombres] = useState(residente.nombres_res);
    // const [apellidos, setApellidos] = useState(residente.apes_res);
    // const [direccion, setDireccion] = useState(residente.direccion_res);
    // const [estadoCivil, setEstadoCivil] = useState(residente.estadocivil_res);
    // const [fechaNacimiento, setFechaNacimiento] = useState(residente.fecha_nac_res);
    // const [medicamentos, setMedicamentos] = useState(residente.medicamentos_res);

    const [rut_res, setRut_res] = useState(residente[0]);
    const [nombres, setNombres] = useState(residente[1]);
    const [apellidos, setApellidos] = useState(residente[2]);
    const [direccion, setDireccion] = useState(residente[3]);
    const [estadoCivil, setEstadoCivil] = useState(residente[4]);
    const [fechaNacimiento, setFechaNacimiento] = useState(residente[5]);
    const [medicamentos, setMedicamentos] = useState(residente[6]);

    let fechaNac = moment(fechaNacimiento).utc().format('YYYY-MM-DD')

    const [open, setOpen] = useState(false);
    const handleOpenDialog = () => setOpen(true);
    const handleCloseDialog = () => setOpen(false);
    const reload = () => window.location.reload();

    const modificarDatosResidente = async (e) => {
        e.preventDefault();
        try {
            const body = { rut_res, nombres, apellidos, direccion, estadoCivil, fechaNacimiento, medicamentos };
            const response = await axios.put(`http://localhost:8080/allresidentes/${rut_res}`, body);

        } catch (error) {
            console.error(error);
        }
    }

    const currencies = [ { value: 'Soltero', label: 'Soltero' }, { value: 'Casado', label: 'Casado' }, { value: 'Viudo', label: 'Viudo' }, { value: 'Separado', label: 'Separado' }];


    const primary = yellow[800];
    const secondary = red[900];

    useEffect(() => {
    }, [fechaNac]);

    return (
        <div className="items-center">
            <Stack direction="row" spacing={2}>
                <Button onClick={handleOpenDialog} variant="outlined" style={{ color: primary, borderColor: primary }} startIcon={<ModeIcon />} >
                     <span>Editar</span>
                </Button>
                <Dialog open={open} onClose={handleCloseDialog} id={`id${residente.rut_res}`}>
                    <DialogTitle>Editar información del residente</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Aqui podras editar los datos del residente
                        </DialogContentText>

                        <TextField margin="dense" id="2" label="Nombres" type="text" fullWidth variant="outlined" value={nombres} onChange={(e) => setNombres(e.target.value)}
                        />
                        <TextField margin="dense" id="3" label="Apellidos" type="text" fullWidth variant="outlined" value={apellidos} onChange={(e) => setApellidos(e.target.value)}
                        />
                        <TextField margin="dense" id="4" label="Dirección" type="text" fullWidth variant="outlined" value={direccion} onChange={(e) => setDireccion(e.target.value)}
                        />              
                        <TextField fullWidth margin="dense" id="outlined-select-currency" select label="Estado Civil" value={estadoCivil} onChange={(e) => setEstadoCivil(e.target.value)}>
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField margin="dense" id="6" label="Medicamentos" type="text" fullWidth variant="outlined" value={medicamentos} onChange={(e) => setMedicamentos(e.target.value)}
                        />
                        <input type="date" id="7" name="Fecha de nacimiento" defaultValue={fechaNac} onChange={(e) => setFechaNacimiento(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}><span>Cancel</span></Button>
                        <Button onClick={(e) => { modificarDatosResidente(e); handleCloseDialog(); reload()}}><span>Editar</span></Button>
                    </DialogActions>
                </Dialog>
                <Button onClick={handleDeleteRow} variant="outlined" style={{ color: secondary, borderColor: secondary }} endIcon={<DeleteIcon />}>
                    <span>Eliminar</span>
                </Button>
            </Stack>
        </div>
    );
};

export default BotonesCrud;
