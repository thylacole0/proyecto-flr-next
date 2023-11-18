'use client'
import React from 'react';
import CalendarGuardia from '../../components/calendarioGuardia';
import WeatherForecast from '@/components/clima/clima';
import Navbar from '@/components/navbar.js';
import FooterPage from '@/components/footer';

export default function GuardiasReservas() {

  return (
    <>
      <Navbar />
        <div className='min-h-screen'>
          <CalendarGuardia />
        </div>
        <FooterPage />
    </>
  );
}