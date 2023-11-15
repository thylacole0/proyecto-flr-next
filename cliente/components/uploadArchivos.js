"use client";
import React, { useState, useEffect } from "react";
import defaultImage from '../public/pdf.png';
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { set } from "react-hook-form";
import { saveAs } from 'file-saver';

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
    const [archivo, setArchivo] = useState('');
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [containerHeight, setContainerHeight] = useState(400);
    const [fileName, setFileName] = useState("");

    const [open, setOpen] = useState(false);
    const handleOpenDialog = () => setOpen(true);
    const handleCloseDialog = () => {
        setOpen(false)
        setFileName("");
        setFileUpload([]);
    }
    const reload = () => window.location.reload();
    const [fileupload, setFileUpload] = useState([]);

    const handleFileUpload = (event) => {
        const fileList = Array.from(event.target.files);
        setFiles([...files, ...fileList]);
    };

    const handleFileChange = (event) => {
        console.log('event', event.target.files[0])
        setFileName(event.target.files[0].name);
        setFileUpload(event.target.files[0])
    }



    const handleDownload = async (file) => {
        let downloadUrl;
        console.log('file', file)
        // Comprueba la extensión del archivo
        const extension = file.nom_documento.split('.').pop().toLowerCase();
    
        // Determina el tipo de archivo basándose en la extensión
        let filetype;
        if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
            filetype = 'images';
        } else if (extension === 'pdf') {
            filetype = 'documents';
        } else {
            console.error('Unsupported file type');
            return;
        }
    
        // Construye la URL de descarga
        downloadUrl = `http://localhost:8080/download/${filetype}/${file.id_portafolio}`;
    
        try {
            const response = await axios.get(downloadUrl, { responseType: 'blob' });
            
            // Utiliza FileSaver para guardar el Blob
            saveAs(new Blob([response.data]), file.nom_documento);
        } catch (error) {
            console.error('Network error', error);
        }   
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

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', fileupload);
        formData.append('nom_documento', fileName);
        formData.append('rut_res', rut_residente);
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
                    <h1>Archivos del residente</h1>
                    <div>
                        <label htmlFor="file-upload">
                            <Button onClick={handleOpenDialog} component="label" variant="contained" className="m-2" startIcon={<CloudUploadIcon />}>
                                Subir Archivo
                            </Button>
                            <Dialog open={open} onClose={handleCloseDialog} id={`id${residente.rut_res}`}>
                                <DialogTitle>Elija su Archivo a subir</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Permitido JPG, PNG, PDF.
                                    </DialogContentText>
                                    {selectedFile && <img src={selectedFile} alt="Selected" style={{ width: '100%', height: 'auto' }} />}
                                    <Button onClick={handleOpenDialog} component="label" variant="contained" className="m-2" startIcon={<CloudUploadIcon />}>
                                        Elija su Archivo
                                        <input type="file" hidden onChange={handleFileChange} />
                                    </Button>
                                    <div className="flex items-center border-solid border-2 border-gray-1000 rounded-lg p-4 bg-[#f9f9f9]">
                                        <div className="file-icon">
                                            {/* <img src="/path/to/file-icon.png" alt="File Icon" /> */}
                                        </div>
                                        <div className="file-info">
                                            <h2 className="font-sans italic">Nombre del archivo: {fileName}</h2>
                                            <p className="font-sans italic">Tamaña archivo: {fileupload.size} bytes</p>
                                        </div>
                                    </div>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCloseDialog} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "><span>Cancelar</span></Button>
                                    <Button variant="contained" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline " onClick={(e) => {handleUpload(); handleCloseDialog()}} endIcon={<SaveIcon />}>
                                        Guardar
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </label>
                    </div>
                </div>
                <div className="flex flex-wrap overflow-y-auto max-h-[90%] min-h-[90%] bg-white shadow-md rounded-b-md">
                    {files.map((file) => (
                        <Card key={file.id_portafolio} sx={{ height: '700px' }} className="w-1/4 h-1/4 mt-3 mr-2 ml-2 mb-1 bg-zinc-300">
                            {file && file.type && file.type.startsWith("image/") && (
                                <CardActionArea onClick={() => setSelectedFile(file)}>
                                    <CardMedia component="img" style={{maxWidth: '100%', maxHeight: '100%'}} image={`http://localhost:8080/static/${file.archivo.replace(/\\/g, '/').replace('src/uploads/', '')}`} alt={file.name} />
                                </CardActionArea>
                            )}
                            {(file.type === "application/pdf") && (
                                <CardActionArea onClick={() => setSelectedFile(file)}>
                                    <CardMedia component="img" style={{maxWidth: '100%', maxHeight: '100%'}}  image='http://localhost:8080/static/other/pdf.png' alt='Default Name' />
                                </CardActionArea>
                            )}
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {file.nom_documento}
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