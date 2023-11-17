'use client'
import React from 'react';
import Navbar from '@/components/navbar.js';
import FooterPage from '@/components/footer';
import CalendarVisitasEnfer from '@/components/calendarVisitasEnf';

export default async function CalendarVisitasEnf() {

  return (
    <>
      <Navbar />
        <div className='min-h-screen'>
          <CalendarVisitasEnfer />
        </div>
      <FooterPage />

    </>
  );
}