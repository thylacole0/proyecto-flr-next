'use client'

import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';

const Calendario = () => {

    // const [events, setEvents] = useState([]);

    return (
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={[
                { title: 'event 1', date: '2021-10-01' },
                { title: 'event 2', date: '2021-10-02' },
            ]}
            editable={true}
            selectable={true}
        />
    )
};

export default Calendario;