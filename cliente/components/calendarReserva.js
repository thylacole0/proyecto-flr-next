'use client'
//Componentes de Material UI

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// Imports normales

import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { useState, useEffect } from 'react';

const CalendarReservas = () => {
    const [events, setEvents] = useState([]);
    const [selectedHour, setSelectedHour] = useState(null);
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [startEnd , setStartEnd] = useState(null);
    const [fechaReserva, setFechaReserva] = useState(null);
    const [horaReserva, setHoraReserva] = useState(null);
    const handleCloseDialog = () => setOpen(false);

    const handleOpenDialog = (info) => {
        console.log(info)
        setSelectedDate(info.startStr);
        setStartEnd(info.startStr);

        let fecha_res = info.startStr.split('T')[0];
        let hora_res = info.startStr.split('T')[1].split('-')[0];

        setFechaReserva(fecha_res);
        setHoraReserva(hora_res);
        setOpen(true)
    };

    function handleDateClick(info) {
        if (selectedDate) {
            const body = {
                fecha_reserva: fechaReserva, // la fecha del clic
                hora_reserva: horaReserva, // la hora del evento
                estado_reserva: 'Pendiente', // el nombre del evento
                rut_res: '98.765.432-2' , // el rut del visitante
                rut_vis: '12.345.789-0', // el rut del residente
            };

            fetch('http://localhost:8080/reserva', {
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
                    title: 'Probando',
                    start: startEnd,
                    end: startEnd
                };
                
                console.log(newEvent)
                debugger
                // Agregar el evento a la lista de eventos en el estado del componente
                setEvents(events => [...events, newEvent]);
                handleCloseDialog();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }

return (
    <div className='bg-white rounded-3xl flex justify-center'>
        <div className='w-[50%] h-[50%] bg-blue-300'>
            <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='timeGridWeek'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            expandRows={true}
            select={handleOpenDialog}
            events={events}
            slotDuration={'01:00:00'}
            slotLabelInterval={'01:00:00'}
            slotMinTime="10:00:00"
            slotMaxTime="14:00:00"
            locale={esLocale}
            slotLabelFormat={{
                hour: 'numeric',
                minute: '2-digit',
                omitZeroMinute: false,
                meridiem: 'short'
              }}
            allDaySlot={false}
            />
            <Dialog open={open} onClose={handleCloseDialog} id='1'>
                <DialogTitle>Confirmación de reserva</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                       ¿Desea confirmar la fecha y hora seleccionada?
                    </DialogContentText>

                    <TextField margin="dense" id="2" label="Fecha de reserva" type="text" fullWidth variant="outlined" value={fechaReserva} onChange={(e) => setFechaReserva(e.target.value)}
                    />
                    <TextField margin="dense" id="3" label="Hora de reserva" type="text" fullWidth variant="outlined" value={horaReserva} onChange={(e) => setHoraReserva(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}><span>Cancelar</span></Button>
                    <Button onClick={handleDateClick}><span>Confirmar</span></Button>
                </DialogActions>
            </Dialog>
        </div>
    </div>

  );
};

export default CalendarReservas;