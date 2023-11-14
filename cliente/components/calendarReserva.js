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
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { getSession } from 'next-auth/react';
import moment from 'moment';

const CalendarReservas = () => {

    const [events, setEvents] = useState([]);
    const [selectedHour, setSelectedHour] = useState(null);
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [startEnd , setStartEnd] = useState(null);
    const [fechaReserva, setFechaReserva] = useState(null);
    const [horaReserva, setHoraReserva] = useState(null);
    const [visitanteInfo, setVisitanteInfo] = useState(null);
    const handleCloseDialog = () => setOpen(false);
    const [sesion, setSesion] = useState([]);
    const { data: session, status } = useSession();
    const [openErrorDialog, setOpenErrorDialog] = useState(false);


    const handleOpenDialog = (info) => {
        console.log(info.dateStr)
        setSelectedDate(info.dateStr);
        setStartEnd(info.dateStr);

        let fecha_res = info.dateStr.split('T')[0];
        let hora_res = info.dateStr.split('T')[1].split('-')[0];

        setFechaReserva(fecha_res);
        setHoraReserva(hora_res);
        setOpen(true)
    };

    async function obtReservas(rut_res) {
        try {
            const response = await axios.get('http://localhost:8080/reservation/'+rut_res);
            const jsonReservas = await response.data;
            console.log(jsonReservas);
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
                    color: color,
                    extendedProps: {
                        motivo: reserva.motivo,
                        hora: reserva.hora_reserva,
                    }
                    
                };
                setEvents(events => [...events, reservas]);
            })

            
        } catch (error) {
            console.log(error);
        }
    }

    async function obtDatosVisitante(sesionUser) {

        try{
            if (sesionUser) {
                console.log(sesionUser)
                const response = await axios.get(`http://localhost:8080/datosvisitante/${sesionUser}`);
                const jsonDatos = await response.data;
                console.log(jsonDatos); 
                setVisitanteInfo(jsonDatos);
                return jsonDatos
            }
          } catch (error) {
            console.log(error);
          }
    }

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

    function handleDateClick(info) {
        if (selectedDate && visitanteInfo) {
            const body = {
                fecha_reserva: fechaReserva, // la fecha del clic
                hora_reserva: horaReserva, // la hora del evento
                estado_reserva: 'Pendiente', // el nombre del evento
                rut_res: visitanteInfo.rut_res , // el rut del visitante
                rut_vis: visitanteInfo.rut_vis, // el rut del residente
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
                    title: 'Pendiente',
                    start: startEnd,
                    end: startEnd
                };
                
                console.log(newEvent)
                // Agregar el evento a la lista de eventos en el estado del componente
                setEvents(events => [...events, newEvent]);
                handleCloseDialog();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }

    useEffect(() => {
        if (status === 'authenticated') {
            // La sesión está disponible
            obtDatosVisitante(session.user).then(resp => {
                obtReservas(resp.rut_res);
            })   ;
        }
      }, [status])

return (
    <div className='relative rounded-lg w-5/6 h-5/6 m-auto flex  mt-8'>
        <div className='relative rounded-lg w-full max-h-[95%] flex bg-white'>
        <div className='w-full p-10 rounded-lg bg-blue-300'>
            <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'timeGridWeek,timeGridDay'
            }}
            initialView='timeGridWeek'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            expandRows={true}
            dateClick={info => {
                const today = new Date();
                today.setHours(0, 0, 0, 0); // set today's date to start of the day
                const threeDaysFromNow = new Date(today);
                threeDaysFromNow.setDate(today.getDate() + 3); // set the date to three days from now
            
                if (info.date >= threeDaysFromNow) {
                    handleOpenDialog(info);
                } else {
                    setOpenErrorDialog(true);
                }
            }}
            events={events}
            eventContent={renderEventContent}
            slotDuration={'01:00:00'}
            slotLabelInterval={'01:00:00'}
            selectMinDistance={1}
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
            <Dialog open={openErrorDialog} onClose={() => setOpenErrorDialog(false)}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        No puedes reservar para el día actual ni los dos días siguientes.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenErrorDialog(false)} color="primary">
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
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
    </div>


  );
};

export default CalendarReservas;