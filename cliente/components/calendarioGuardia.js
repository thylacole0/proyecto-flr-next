'use client'
//Componentes de Material UI
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import WhereToVoteRoundedIcon from '@mui/icons-material/WhereToVoteRounded';
import ResidenteSelect from './selectResidente';
import InfoGuardia from './acordionInfoGuardia';

// Imports normales
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { getSession } from 'next-auth/react';
import moment from 'moment';

import './reserva.module.css'

const CalendarGuardia = () => {

    const [residentes, setResidentes] = useState([]);
    const [events, setEvents] = useState([]);
    const [open, setOpen] = useState(false);
    const handleCloseDialog = () => {
        setOpen(false);
        setNewStatus('');
    };
    const [rutVinculado, setRutVinculado] = useState('');

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [motivo, setMotivo] = useState('');
    const [errorMotivo, setErrorMotivo] = useState(false);

    const getAllResidentes = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/allresidentes`);
            const jsonDatos = await response.data;
            const residentes = jsonDatos.map(residente => ({
                rut: residente.rut_res,
                nombres: residente.nombres_res,
                apellidos: residente.apes_res
            }));
            setResidentes(residentes);
        } catch (error) {
            console.log(error);
        }
    };

    const handleConfirmReserva = async () => {

        if (newStatus === 'Rechazado' && !motivo) {
            setErrorMotivo(true);
            return;
        }

        setLoading(true);
        const id_reserva = selectedEvent.id;
        const estado_reserva = newStatus;
        const motivoRes = newStatus === 'Rechazado' ? motivo : null;
        const body = { estado_reserva, motivoRes, id_reserva }
        try {
            await axios.put(`http://localhost:8080/updatereserva/${id_reserva}`, body);
            const updatedEvents = events.map(event => {
                let color;
                switch (estado_reserva) {
                    case 'Pendiente':
                        color = '#ffa500';
                        break;
                    case 'Aceptado':
                        color = '#185403';
                        break;
                    case 'Rechazado':
                        color = '#b50e00';
                        break;
                    default:
                        color = '#00669f'; // color por defecto
                }
                if (event.id == id_reserva) {
                    return { ...event, title: estado_reserva, color: color };
                }
                return event;
            });
            setEvents(updatedEvents);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setOpen(false);
            setNewStatus('');
        }
    };

    const handleEventClick = (clickInfo) => {
        setSelectedEvent(clickInfo.event);
        setOpen(true);
    };

    const handleChange = (event) => {
        setRutVinculado(event.target.value);
        obtReservas(event.target.value);
    };

    async function obtReservas(rut_res) {
        try {
            const response = await axios.get('http://localhost:8080/reservation/' + rut_res);
            const jsonReservas = await response.data;
            console.log(jsonReservas);
            setEvents([]);
            jsonReservas.map((reserva) => {
                let color;
                switch (reserva.estado_reserva) {
                    case 'Pendiente':
                        color = '#ffa500';
                        break;
                    case 'Aceptado':
                        color = '#185403';
                        break;
                    case 'Rechazado':
                        color = '#b50e00';
                        break;
                    default:
                        color = '#00669f'; // color por defecto
                }

                const reservas = {
                    title: reserva.estado_reserva,
                    start: reserva.fecha_reserva.split('T')[0] + 'T' + reserva.hora_reserva + '-03:00',
                    end: reserva.fecha_reserva.split('T')[0] + 'T' + reserva.hora_reserva + '-03:00',
                    id: reserva.id_reserva,
                    color: color,
                    extendedProps: {
                        motivo: reserva.estado_reserva === 'Rechazado' ? reserva.motivo : ''
                    }
                };
                setEvents(events => [...events, reservas]);
            })


        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllResidentes();
    }, []);

    function renderEventContent(eventInfo) {
        const date = new Date(eventInfo.event.start);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

        return (
            <>
                <i>{time}</i>
                <br />
                <b>{eventInfo.event.title}</b>
                <p className='mt-4'>{eventInfo.event.extendedProps.motivo}</p>
            </>
        );
    }

    return (
        <>
            <div className=' grid grid-cols-6 gap-5 grid-flow-col'>
                <section className='col-span-4 row-span-3'>
                    <div className='flex justify-center'>
                        <div className='w-full max-w-[80%] p-6 rounded-lg bg-white'>
                            <h1 className='font-bold flex justify-center text-6xl pb-2 border-b-1 border-gray-300 '>Panel de reservas</h1>
                            <div className='border-t-2 border-black '>
                                <FullCalendar
                                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                    headerToolbar={{
                                        left: 'prev,next today',
                                        center: 'title',
                                        right: 'timeGridWeek,timeGridDay'
                                    }}
                                    initialView='timeGridWeek'
                                    editable={false}
                                    selectable={true}
                                    selectMirror={true}
                                    dayMaxEvents={true}
                                    weekends={true}
                                    expandRows={true}
                                    events={events}
                                    eventContent={renderEventContent}
                                    slotDuration={'01:00:00'}
                                    slotLabelInterval={'01:00:00'}
                                    selectMinDistance={1}
                                    slotMinTime="10:00:00"
                                    slotMaxTime="14:00:00"
                                    locale={esLocale}
                                    eventClick={handleEventClick}
                                    slotLabelFormat={{
                                        hour: 'numeric',
                                        minute: '2-digit',
                                        omitZeroMinute: false,
                                        meridiem: 'short'
                                    }}
                                    allDaySlot={false}
                                    selectOverlap={false}
                                    selectAllow={(selectInfo) => {
                                        return moment.duration(selectInfo.end - selectInfo.start).asHours() <= 0;
                                    }}
                                />
                                <Dialog open={open} onClose={handleCloseDialog} id='1'>
                                    <DialogTitle>Confirmación de reserva</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText className='mb-5'>
                                            ¿Desea confirmar la fecha y hora seleccionada?
                                        </DialogContentText>
                                        <FormControl fullWidth>
                                            <InputLabel id="status-label">Estado</InputLabel>
                                            <Select
                                                labelId="status-label"
                                                id="status-select"
                                                value={newStatus}
                                                label="Estado"
                                                onChange={(e) => setNewStatus(e.target.value)}
                                            >
                                                <MenuItem value="Aceptado">Aceptado</MenuItem>
                                                <MenuItem value="Rechazado">Rechazado</MenuItem>
                                            </Select>
                                            {
                                                newStatus === 'Rechazado' &&
                                                <TextField
                                                    helperText={errorMotivo ? 'Este campo es obligatorio.' : ''}
                                                    error={errorMotivo} className='mt-5'
                                                    id="outlined-multiline-flexible"
                                                    label="Motivo"
                                                    multiline maxRows={4}
                                                    value={motivo}
                                                    onChange={(e) => { setMotivo(e.target.value); setErrorMotivo(false) }} />
                                            }
                                        </FormControl>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleCloseDialog}><span>Cancelar</span></Button>
                                        <Button onClick={handleConfirmReserva} disabled={loading}>
                                            {loading ? <CircularProgress size={24} /> : <span>Confirmar</span>}
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='col-span-2 self-center'>
                    <ResidenteSelect residentes={residentes} rutVinculado={rutVinculado} handleChange={handleChange} />
                </section>
                <section className='row-span-2 col-span-2'>
                    <InfoGuardia />
                </section>
            </div>
        </>
    );
};

export default CalendarGuardia;