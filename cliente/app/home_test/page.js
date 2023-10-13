"use client";
import React, { useState } from 'react'; 
import { useRouter } from 'next/navigation'; 
import Link from 'next/link'; 
import 'tailwindcss/tailwind.css';
import Navbar from '../../components/navbar';
import { useSession } from 'next-auth/react';

const HomeTest = () => {

    const { data: session, status } = useSession();

  return (
    <div>
        <Navbar />
        <div>
            <h1 className='text-black'>HOME TEST</h1>
        </div>
    </div>
  )
}

export default HomeTest;
