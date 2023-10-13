"use client";
import * as React from 'react';
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { green } from '@mui/material/colors';

const BotonAdd = () => {
    const primary = green[900];

    return (
        <div className="items-center">
            <Button variant="outlined" style={{ color: primary, borderColor: primary }} startIcon={<AddBoxIcon/>}>
                Agregar
            </Button>
        </div>
    );
};

export default BotonAdd;