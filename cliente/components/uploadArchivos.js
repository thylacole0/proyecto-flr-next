"use client";
import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Modal, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete'
import DownloadIcon from '@mui/icons-material/Download'
import SaveIcon from '@mui/icons-material/Save';
import { useSearchParams } from 'next/navigation'
import axios from 'axios';

const UploadArchivos = () => {
    let rut_residente = ''

    const searchParams = useSearchParams();
    if (searchParams.get('rut_res') !== null) {
        rut_residente = searchParams.get('rut_res');
        console.log('',rut_residente)
    }
    const [residente, setResidente] = useState([]);
    const [rut_res, setRut] = useState('');
    const [id_portafolio, setIdPortafolio] = useState('');
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [containerHeight, setContainerHeight] = useState(400);
    const [fileName, setFileName] = useState("");

    const handleFileUpload = (event) => {
        const fileList = Array.from(event.target.files);
        setFiles([...files, ...fileList]);
    };

    const handleDownload = (file) => {
        const downloadUrl = `/ruta_servidor/${file.name}`;

        // Abre una nueva ventana o pestaña para descargar el archivo
        window.open(downloadUrl, '_blank');
    };

    useEffect(() => {
        // Calculate the height of the container based on the number of cards
        const numCards = files.length;
        const numRows = Math.ceil(numCards / 3); // Assuming 3 cards per row
        const height = numRows * 250; // Assuming each row is 250px tall
        setContainerHeight(Math.min(height, 400)); // Set a minimum height of 400
        axios.get(`http://localhost:8080/files/${rut_residente}`)
            .then(response => {
                // La respuesta fue exitosa
                console.log('response', response.data)
                console.log('response', response.data[0].id_portafolio)
                setFiles(response.data);
            })
            .catch(error => {
                // Hubo un error al obtener los archivos
                console.error("Error al obtener archivos", error);
        }   );
    }, []);

    const handleDelete = (file) => {
        console.log('file', file)
        axios.delete(`http://localhost:8080/files/${file}`)
            .then(response => {
                // La respuesta fue exitosa
                // Puedes actualizar el estado de los archivos aquí para reflejar que el archivo ha sido borrado
                setFiles(files.filter(f => f.id_portafolio !== file));
            })
            .catch(error => {
                // Hubo un error al borrar el archivo
                console.error("Error al borrar archivo", error);
            });
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });


    const handleUpload = async () => {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('file', file);
        });
        formData.append('nom_documento', fileName);
        formData.append('rut_res', rut_residente);
        console.log('rut_res', rut_residente);
        axios.post(`http://localhost:8080/upload`, formData,  {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            // La respuesta fue exitosa
            const newFiles = response.data;

            // Agrega los nuevos archivos subidos a la lista
            setFiles([...files, ...newFiles]);

            // Limpia el formulario
            setFileName("");
        })
        .catch(error => {
            // Hubo un error al subir los archivos
            console.error("Error al subir archivos", error);
        });
    };

    return (
        <div className="relative rounded mt-5 w-5/6 h-5/6 m-auto max-h-[90%]">
                <div className="relative rounded-t-md shadow-md z-10 bg-gray-200 flex justify-between items-center p-4 w-full">
                    <h2>Files</h2>
                    <div>
                        <input type="file" multiple onChange={handleFileUpload} className="hidden" id="file-upload" />
                        <label htmlFor="file-upload">
                            <Button component="label" variant="contained" className="m-2" startIcon={<CloudUploadIcon />}>
                                Upload file
                                <VisuallyHiddenInput type="file" onChange={handleFileUpload} className="hidden" id="file-upload" />
                            </Button>
                        </label>
                            <Button variant="contained" onClick={handleUpload} endIcon={<SaveIcon />}>
                                Guardar
                            </Button>
                    </div>
                </div>
                <div className="flex flex-wrap overflow-y-auto max-h-[90%] min-h-[90%] bg-white shadow-md rounded-b-md">
                    {files.map((file) => (
                        <Card key={file.id} className="w-1/4 h-1/4 mt-1 mr-2 ml-2 mb-1 bg-zinc-300">
                            {file && file.type && file.type.startsWith("image/") && (
                                <CardActionArea onClick={() => setSelectedFile(file)}>
                                    <CardMedia component="img" height="140" image={URL.createObjectURL(file)} alt={file.name} />
                                </CardActionArea>
                            )}
                            {(file.type === "application/pdf") && (
                                <CardActionArea onClick={() => setSelectedFile(file)}>
                                    <CardMedia component="img" height="140" image="../public/Logo_blanco.png" alt={file.name} />
                                </CardActionArea>
                            )}
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {file.name}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton aria-label="delete" onClick={() => handleDelete(file.id_portafolio)}>
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton aria-label="download" onClick={() => handleDownload(file)}>
                                    <DownloadIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    ))}
                </div>
                <Modal open={selectedFile !== null} onClose={() => setSelectedFile(null)}>
                <Box sx={{ width: '60vw', height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {selectedFile && selectedFile.type.startsWith("image/") && (
                        <img src={URL.createObjectURL(selectedFile)} alt={selectedFile.name} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    )}
                </Box>
                </Modal>
        </div>
    );
};
export default UploadArchivos;