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
import SaveIcon from '@mui/icons-material/Save';

const UploadArchivos = () => {
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
        formData.append('rut_res', 123456789-0);
        formData.append('id_fundacion', 1); // Asegúrate de obtener el valor correcto para id_fundacion

        const response = await fetch('/upload/123456789-0', {
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
        <div className="container flex flex-col mt-20" style={{ backgroundColor: "white", width: "50%", height: containerHeight, borderRadius: "10px"}}>
            <div style={{ backgroundColor: "lightgray", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 16px" }}>
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
            <div style={{ height: "350px", overflowY: "scroll", padding: "10px", display: "flex", flexWrap: "wrap" }}>
                {files.map((file) => (
                    <Card key={file.id} style={{ width: "23%", margin: "10px" }}>
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
                            <Button variant="outlined" size="medium" onClick={() => handleDownload(file)}>
                                Descargar
                            </Button>
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