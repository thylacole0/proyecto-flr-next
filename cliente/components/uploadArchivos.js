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

const UploadArchivos = () => {
    let rut_residente = ''

    const searchParams = useSearchParams();
    if (searchParams.get('rut_res') !== null) {
        rut_residente = searchParams.get('rut_res');
    }
    const [residente, setResidente] = useState([]);
    const [rut_res, setRut] = useState('');
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
    }, [files]);

    const handleDelete = (fileToDelete) => {
        setFiles(prevFiles => prevFiles.filter(file => file !== fileToDelete));
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
        files.forEach((file, index) => {
            formData.append(`file${index}`, file);
        });
        formData.append('nom_documento', fileName);
        formData.append('Residente_rut_res', rut_res);
        formData.append('Residente_Fundacion_id_fundacion', 1); // Asegúrate de obtener el valor correcto para id_fundacion

        const response = await fetch(`/upload/${rut_res}`, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const newFiles = await response.json();
      
            // Agrega los nuevos archivos subidos a la lista
            setFiles([...files, ...newFiles]);
      
            // Limpia el formulario
            setFileName("");
          } else {
            console.error("Error al subir archivos");
          }
    };

    return (
        <div className="container rounded mt-5 w-4/5 h-4/5 m-auto max-h-[90%]">
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
                            {file.type.startsWith("image/") && (
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
                                <IconButton aria-label="delete" onClick={() => handleDelete(file)}>
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