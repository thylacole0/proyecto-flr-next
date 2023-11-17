'use client'
import React from 'react';
import Navbar from '@/components/navbar.js';
import FooterPage from '@/components/footer';
import CalendarAdmin from '@/components/calendarReservaAdmin';

export default async function CalendarAdmin() {

  return (
    <>
      <Navbar />
        <div>
          <CalendarAdmin />
        </div>
      <FooterPage />

    </>
  );
}