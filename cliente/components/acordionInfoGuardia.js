import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function InfoGuardia() {
    return (
        <Card sx={{ maxWidth: 450 }} className='p-3'>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" className='flex justify-center text-3xl border-b-2 border-gray-400 pb-2 mb-4'>
                    Informacion sobre reservas
                </Typography>
                <div>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className='font-bold'>Como aprobar horas de visita</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Debera presionar en alguna hora disponible dentro del calendario.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography className='font-bold'>Como rechazar una reserva de hora</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                * Se debera reservar una visita con al menos 2 dias de anticipación.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography className='font-bold'>En caso de cancelacion de horas</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                * Para ver si su visita fue aceptada o rechazada, debera ingresar a la sección de reservas, el cual le mostrara el estado y en caso de ser rechazada, el motivo.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>                    
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography className='font-bold'>En caso de emergencias</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                * Se debera reservar con al menos 2 dias de anticipación.
                            </Typography >
                        </AccordionDetails>
                    </Accordion>                    
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography className='font-bold'>Restricciones</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                * Se debera reservar con al menos 2 dias de anticipación.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
                {/* <Typography gutterBottom variant="h5" component="div">
            Agendamiento de visita
          </Typography>
          <Typography variant="body2" color="text.secondary">
            
            <ul>
                <li>
                    <b>¿Como agendar una visita?</b>
                </li>
            </ul>
            Para agendar una visita, debes seleccionar un día y una hora disponible en el calendario.
            Las visitas deberan ser agendadas con 2 dias de anticipación.
            Las visitas seran confirmadas por los guardias del resinto.
            Para visualizar el estado de tu visita, podras revisar este calendario.
            En caso de ser rechazada la visita, se mostrara el motivo en la hora que se reservó.
          </Typography> */}
            </CardContent>
        </Card>
    );
}