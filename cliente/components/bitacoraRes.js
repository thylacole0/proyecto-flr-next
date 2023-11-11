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
                const events = data.map(item => ({
                    
                    title: item.contenido_bit,
                    start: `${item.fecha_bit.split('T')[0]}T${item.hora_bit}-03:00`,
                    end: `${item.fecha_bit.split('T')[0]}T${item.hora_bit}-03:00`
                }));
                console.log(events)
                setEvents(events);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div className='relative w-[90%] h-[70%] min-w-[70%] m-auto p-1 flex rounded-xl bg-slate-600'>
            <div className='w-[90%] p-5'>
                <div className='relative w-full h-full flex justify-between flex-wrap flex-col'>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}    
                        initialView="timeGridWeek"
                        headerToolbar={{ left: 'prev,next today', center: 'title', right: 'timeGridWeek,timeGridDay' }}
                        weekends={true}
                        events={events}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        dateClick={handleOpenDialog}
                        slotDuration={'01:00:00'}
                        slotLabelInterval={'01:00:00'}
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
            <div className='w-[40%] relative flex  flex-col min-h-full p-5'>
                <div className='flex w-full h-[50px] flex-wrap gap-[10px] items-center justify-between '>
                    <h1 className='font-normal text-4xl text-white'>Miercoles</h1>
                    <h1 className='font-normal text-base text-gray-400'>20 de Noviembre, 2023</h1>
                </div>
                <div className='events w-full h-full overflow-y-auto overflow-x-hidden flex flex-col p-1'>
                    <div className='relative w-[95%] flex-col min-h-[70px] flex justify-center hover:bg-slate-200'>
                        <div className='titulo flex items-center'>
                            <i className='fas fa-circle text-white text-[0.5rem]'></i>
                            <h3 className='font-normal text-base text-white ml-5'>Bitacora</h3>
                        </div>
                        <div className='font-normal text-sm ml-4'>10:00 am</div>
                    </div>
                </div>
                {/* <div>
                    <div className={`bg-white absolute bottom-[100px] w-[90%] overflow-hidden rounded-md transition-all duration-500 ease-in-out ${isActive ? 'max-h-300' : 'max-h-0'}`}>
                        <div className="add-event-header w-full h-12 flex items-center justify-between p-5 border-b">
                            <div className="title text-xl">Agregar dato a bitacora</div>
                            <i className="fas fa-times close hover:text-red-600 cursor-pointer text-xl font-medium" onClick={toggleActive}></i>
                        </div>
                        <div className="add-event-body w-full h-full flex flex-col gap-1 p-5">
                            <div className="add-event-input w-full h-full flex items-center justify-between gap-3">
                                <input
                                    type="text"
                                    placeholder="¿Qué ocurrio?"
                                    className='event-name w-full h-full outline-none border-b-2 pb-2 text-base font-normal focus:border-gray-500 placeholder:text-gray-300  focus:placeholder:text-gray-500' />
                            </div>
                            <div className="add-event-input w-full h-full flex items-center justify-between gap-3">
                                <input
                                    type="text"
                                    placeholder="Hora de inicio"
                                    value={eventTimeFrom}
                                    onChange={e => setEventTimeFrom(e.target.value)}
                                    className='add-event-input w-full h-full outline-none border-b-2 pb-2 text-base font-normal focus:border-gray-500 placeholder:text-gray-300  focus:placeholder:text-gray-500'
                                />
                            </div>
                            <div className="add-event-input w-full h-full flex items-center justify-between gap-3">
                                <input
                                    type="text"
                                    placeholder="Hora de termino"
                                    value={eventTimeTo}
                                    onChange={e => setEventTimeTo(e.target.value)}
                                    className='add-event-input w-full h-full outline-none border-b-2 pb-2 text-base font-normal focus:border-gray-500 placeholder:text-gray-300 focus:placeholder:text-gray-500'
                                />
                            </div>
                        </div>
                        <div className="add-event-footer block items-center justify-center p-4">
                            <button onClick={handleDateClick} className="add-event-btn h-10 text-base text-white border outline-none rounded cursor-pointer bg-blue-400 p-2 hover:bg-transparent hover:text-blue-400 font-medium">Agregar a bitacora</button>
                        </div>
                    </div>
                    <div className='flex justify-center items-center'>
                        <i className='fas fa-plus-circle text-white text-4xl cursor-pointer' onClick={toggleActive}></i>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default CalendarioRes;