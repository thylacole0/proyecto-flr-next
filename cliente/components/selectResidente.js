import React from 'react';

import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';

const ResidenteSelect = ({ residentes, rutVinculado, handleChange }) => {
    return (
        <Card sx={{ maxWidth: 450 }} className='p-3'>
                <CardHeader
                    title="Busqueda por residente"
                    subheader="Selecciona un residente para ver sus reservas"
                />
                <Divider />
                <Box sx={{ minWidth: 120 }} className="m-3">
                <label htmlFor="rutVinculado" className="block text-gray-700 font-bold p-2">Selecciona el residente:</label>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Residente</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={rutVinculado}
                            label="Residente"
                            onChange={handleChange}
                        >
                            {residentes.map((residente, index) => (
                                <MenuItem key={index} value={residente.rut}>{residente.nombres} {residente.apellidos}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
        </Card>
    );
};

export default ResidenteSelect;