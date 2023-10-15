"use client";
import React, { useEffect, useState} from 'react';
import styles from './tablaRes.module.css';
import BotonesCrudNurse from './botonesCrudNurse.js';
import BotonAdd from './botonAgregar';
import axios from 'axios';
import MUIDataTable from 'mui-datatables';

const TablaEnfermeros = () => {

  const [enfermeros, setEnfermeros] = useState([]);
  
  const handleDeleteRow = (rut_enfer) => {
    try {
      const response = axios.delete(`http://localhost:8080/allenfermeros/${rut_enfer}`);
      setEnfermeros(enfermeros.filter((enfermero) => enfermero.rut_enfer !== rut_enfer))

    } catch (error) {
      console.log(error);
    }
  };

  const getEnfermeros = async () => {

    try{
      const response = await axios.get("http://localhost:8080/allenfermeros");
      const jsonDatos = await response.data;
      console.log(jsonDatos); 
      setEnfermeros(jsonDatos);
    } catch (error) {
      console.log(error);
    }
  };

    // Opciones de la tabla
    const options = {
      selectableRows: 'none',
      responsive: 'standard',
      download: true,
      print: true,
      pagination: true,
      viewColumns: true,
      search: true,
      selectableRowsOnClick: false,
      selectableRowsHeader: false,
      filter: false,
      tableId: 'enfermeros'
    }
  
    // Columnas de la tabla
  const columns = [
    {
      name: "rut_enfer",
      label: "RUT",
    },
    {
      name: "nombres_enfer",
      label: "Nombres",
    },
    {
      name: "apes_enfer",
      label: "Apellidos",
    },
    {
      name: "correo_enfer",
      label: "Correo",
    },
    {
      name: "cel_enfer",
      label: "Celular",
    },
    {
      name: "celaux_enfer",
      label: "Numero de emergencia",
    },
    {
      name: "tipo_contrato_enfer",
      label: "Tipo de contrato",
    },
    {
      name: "turno_enfer",
      label: "Turno",
    },
    {
      name: "especialidad_enfer",
      label: "Especialidad",
    },
    {
      name: "Acciones",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          console.log(tableMeta.rowData[0])
          return (
            <BotonesCrudNurse handleDeleteRow={() => handleDeleteRow(tableMeta.rowData[0])} enfermero={tableMeta.rowData}/>
          )
        }
      }
    }

  ]

  useEffect(() => {
    getEnfermeros();
  }, [])

  return (
    <>
      <div className="flex justify-center items-center mr-5 ml-10 pt-4 pb-4">
        <MUIDataTable
          title={"Enfermeros"}
          data={enfermeros}
          columns={columns}
          options={options}
        />
      </div>
    </>
  );
};

export default TablaEnfermeros;
