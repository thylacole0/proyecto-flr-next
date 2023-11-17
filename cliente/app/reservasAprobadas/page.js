'use client'

import React from 'react';
import CalendarGuardia from '../../components/calendarioGuardia';
import WeatherForecast from '@/components/clima/clima';
import Navbar from '@/components/navbar.js';
import CalendarReservasAprobadas from '@/components/calendarReservasAprobadas';

export default function GuardiasReservas() {

  return (
    <>
      <Navbar />
        <div>
            <CalendarReservasAprobadas />
        </div>
    </>
  );
}