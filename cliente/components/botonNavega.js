"use client";
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
    
export default function BotonNavega() {
    const [tab, setTab] = useState('enfermeros'); // Estado para controlar la pestaña activa
    
    const handleTabChange = (newTab) => {
        setTab(newTab);
    };
    
    return (
        <Box sx={{ width: 500 }}>
            <BottomNavigation showLabels value={tab} onChange={(event, newValue) => {handleTabChange(newValue); }}>
            <BottomNavigationAction label="Enfermeros" icon={<MedicalServicesIcon />} className={`${tab === 'enfermeros' ? 'bg-blue-500' : 'bg-gray-300'} p-2 mr-2`} onClick={() => handleTabChange('enfermeros')} />
            <BottomNavigationAction label="Guardias" icon={<LocalPoliceIcon />} className={`${tab === 'guardias' ? 'bg-blue-500' : 'bg-gray-300'} p-2 mr-2`} onClick={() => handleTabChange('guardias')} />
          </BottomNavigation>
        </Box>
      );
    }
    