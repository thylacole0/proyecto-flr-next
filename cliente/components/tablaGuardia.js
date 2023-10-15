"use client";
import React, { useEffect, useState} from 'react';
import styles from './tablaRes.module.css';
import BotonesCrudGuard from './botonesCrudGuard.js';
import BotonAdd from './botonAgregar';
import axios from 'axios';
import MUIDataTable from 'mui-datatables';

const TablaGuardias = () => {

  const [guardias, setGuardias] = useState([]);

  const handleDeleteRow = (rut_guard) => {
    try {
      const response = axios.delete(`http://localhost:8080/allguardias/${rut_guard}`);
      setGuardias(guardias.filter((guardia) => guardia.rut_guard !== rut_guard))
    } catch (error) {
      console.log(error);
    }
  };

  const getGuardias = async () => {

    try{
      const response = await axios.get("http://localhost:8080/allguardias");
      const jsonDatos = await response.data;
      setGuardias(jsonDatos);
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
      tableId: 'guardias'
    }
  
    // Columnas de la tabla
  const columns = [
    {
      name: "rut_guardia",
      label: "RUT",
    },
    {
      name: "nombres_guardia",
      label: "Nombres",
    },
    {
      name: "apes_guardia",
      label: "Apellidos",
    },
    {
      name: "correo_guardia",
      label: "Correo",
    },
    {
      name: "cel_guardia",
      label: "Celular",
    },
    {
      name: "celaux_guardia",
      label: "Numero Emergencia",
    },
    {
      name: "tipo_contrato_guardia",
      label: "Tipo de Contrato",
    },
    {
      name: "Acciones",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          console.log(tableMeta.rowData[0])
          return (
            <BotonesCrudGuard handleDeleteRow={() => handleDeleteRow(tableMeta.rowData[0])} guardia={tableMeta.rowData}/>
          )
        }
      }
    }

  ]

  useEffect(() => {
    getGuardias();
  }, [])

  return (
    <>
      <div className="flex justify-center items-center mr-5 ml-10 pt-4 pb-4">
        <MUIDataTable
          title={"Guardias"}
          data={guardias}
          columns={columns}
          options={options}
        />
      </div>
    </>
  );
};

export default TablaGuardias;
