'use client'

import React from 'react';
import CalendarReservas from '../../components/calendarReserva';
import WeatherForecast from '@/components/clima/clima';
import styles from '../reserva/reserva.module.css';
import Navbar from '@/components/navbar';

export default async function ReservasPage() {

  return (
    <> 
    <Navbar /> 
    <section className={styles.layout}>
      <div >
        <CalendarReservas className={styles.Calendario}/>
      </div>
      <div className={styles.Clima}>
        <WeatherForecast />
      </div>
        
    </section>
    </> 
  );
}