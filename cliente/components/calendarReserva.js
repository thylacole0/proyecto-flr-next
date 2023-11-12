'use client'

import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const CalendarReservas = () => {
  const handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event');
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  };

  return (
    <div className='bg-black rounded-3xl flex justify-center'>
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
            select={handleDateSelect}
            events={[]}
            slotDuration={'01:00:00'}
            slotLabelInterval={'01:00:00'}
            slotMinTime="09:00:00"
            slotMaxTime="17:00:00"

            />
        </div>

    </div>

  );
};

export default CalendarReservas;