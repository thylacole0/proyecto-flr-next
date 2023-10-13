"use client";
import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';
import Stack from '@mui/material/Stack';
import { red, yellow } from '@mui/material/colors';

const BotonesCrud = () => {
    const primary = yellow[800];
    const secondary = red[900];

    return (
        <div className="items-center">
            <Stack direction="row" spacing={2}>
                <Button variant="outlined" style={{ color: primary, borderColor: primary }} startIcon={<ModeIcon />}>
                    Editar
                </Button>
                <Button variant="outlined" style={{ color: secondary, borderColor: secondary }} endIcon={<DeleteIcon />}>
                    Eliminar
                </Button>
            </Stack>
        </div>
    );
};

export default BotonesCrud;
