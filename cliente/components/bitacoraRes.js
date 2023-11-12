'use client';

import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from '@fullcalendar/timegrid';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { set } from 'react-hook-form';
import {useSearchParams} from 'next/navigation';
import esLocale from '@fullcalendar/core/locales/es';

const CalendarioRes = () => {

    let rut_residente = ''

    const searchParams = useSearchParams();
    if (searchParams.get('rut_res') !== null) {
        rut_residente = searchParams.get('rut_res');
        console.log(rut_residente)
    }

    const [events, setEvents] = useState([]);
    const [isActive, setIsActive] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [fechaBitacora, setFechaBitacora] = useState(null);
    const [horaBitacora, setHoraBitacora] = useState(null);
    const [contenidoBitacora, setContenidoBitacora] = useState('');
    const [startEnd , setStartEnd] = useState(null);
    const bitColors = ['#D2386C', '#6a6969', '#4A494D', '#750075', '#2f11d2', '#a01f71', '#0d9c12', '#8d1027', '#6fa504']

    const handleOpenDialog = (info) => {
        setSelectedDate(info.dateStr);
        setStartEnd(info.dateStr);
        let fecha_bit = info.dateStr.split('T')[0];
        let hora_bit = info.dateStr.split('T')[1].split('-')[0];

        setFechaBitacora(fecha_bit);
        setHoraBitacora(hora_bit);
        setOpen(true)
    };

    const handleCloseDialog = () => setOpen(false);

    function handleDateClick(info) {
        if (selectedDate) {
            const body = {
                fecha_bit: fechaBitacora, // la fecha del clic
                hora_bit: horaBitacora, // la hora del evento
                contenido_bit: contenidoBitacora, // el nombre del evento
                rut_res: rut_residente // el rut del residente
            };

            fetch('http://localhost:8080/bitacora_res', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // Agregar el evento a la lista de eventos en el estado del componente
                const newEvent = {
                    title: data.contenido_bit,
                    start: startEnd,
                    end: startEnd
                };
                
                console.log(newEvent)
                debugger
                // Agregar el evento a la lista de eventos en el estado del componente
                setEvents(events => [...events, newEvent]);
                setContenidoBitacora('')
                handleCloseDialog();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }

    const toggleActive = () => {
        setIsActive(!isActive);
    };

    useEffect(() => {
        fetchEventsForUser(rut_residente); // reemplaza '12.345.678-0' con el rut_res del usuario
    }, []);
    
    function fetchEventsForUser(rut_res) {
        fetch(`http://localhost:8080/bitacora_res/${rut_res}`)
            .then(response => response.json())
            .then(data => {
                // Convertir los datos a la estructura de eventos de FullCalendar
                const events = data.map(item => {
                    let color = bitColors[Math.floor(Math.random() * bitColors.length)]

                    return {
                        title: item.contenido_bit,
                        start: `${item.fecha_bit.split('T')[0]}T${item.hora_bit}-03:00`,
                        end: `${item.fecha_bit.split('T')[0]}T${item.hora_bit}-03:00`,
                        backgroundColor: color,
                    }
                });
                console.log(events)
                setEvents(events);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div className='relative rounded-lg w-5/6 h-5/6 m-auto flex bg-white'>
            <div className='relative rounded-lg w-full max-h-[95%] flex bg-white overflow-auto'>
                <div className='w-full p-10 rounded-lg'>
                <h1 className='text-3xl mb-4 flex justify-center'>Bitacora</h1>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="timeGridWeek"
                        headerToolbar={{ left: 'prev,next today', center: 'title', right: 'timeGridWeek,timeGridDay' }}
                        weekends={true}
                        events={events}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        expandRows={true}
                        dateClick={handleOpenDialog}
                        slotDuration={'01:00:00'}
                        slotLabelInterval={'01:00:00'}
                        slotMinTime="06:00:00"
                        slotMaxTime="20:00:00"
                        locale={esLocale}
                        slotLabelFormat={{
                            hour: 'numeric',
                            minute: '2-digit',
                            omitZeroMinute: false,
                            meridiem: 'short'
                          }}
                        allDaySlot={false}
                    />
                </div>
            </div>    
            <Dialog open={open} onClose={handleCloseDialog} id='1'>
                <DialogTitle>Editar información del residente</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Aqui podras editar los datos del residente
                    </DialogContentText>
                    <TextField margin="dense" id="2" label="Fecha de la bitacora" type="text" fullWidth variant="outlined" value={fechaBitacora} onChange={(e) => setFechaBitacora(e.target.value)}
                    />
                    <TextField margin="dense" id="3" label="Hora de la bitacora" type="text" fullWidth variant="outlined" value={horaBitacora} onChange={(e) => setHoraBitacora(e.target.value)}
                    />
                    <TextField margin="dense" id="4" label="¿Qué ocurrio?" type="text" multiline rows={3} fullWidth variant="outlined" value={contenidoBitacora} onChange={(e) => setContenidoBitacora(e.target.value)}
                    />              
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}><span>Cancel</span></Button>
                    <Button onClick={handleDateClick}><span>Enviar bitacora</span></Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CalendarioRes;