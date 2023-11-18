'use client'

import React from 'react';
import CalendarReservas from '../../components/calendarReserva';
import WeatherForecast from '@/components/clima/clima';
import styles from '../reserva/reserva.module.css';
import Navbar from '@/components/navbar';
import InforReservaCard from '@/components/infoReserva';
import FooterPage from '@/components/footer';

export default function ReservasPage() {

  return (
    <>
      <Navbar />
      <section className={styles.layout}>
        <div >
          <CalendarReservas className={styles.Calendario} />
        </div>

        <div >
          <div className='mb-10'>
            <InforReservaCard className={styles.Clima} />
          </div>
          <WeatherForecast className={styles.Clima} />
        </div>
        
      </section>
      <FooterPage/>
    </>
  );
}