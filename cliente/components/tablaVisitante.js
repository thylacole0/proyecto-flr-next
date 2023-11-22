"use client";
import React, { useEffect, useState} from 'react';
import styles from './tablaRes.module.css';
import BotonesCrud from './botonesCrudVis.js';
import BotonAdd from './botonAgregar';
import axios from 'axios';
import MUIDataTable from 'mui-datatables';

const TablaVisitantes = () => {

  const [visitantes, setVisitantes] = useState([]);
  
  const handleDeleteRow = (rut) => {
    try {
      const response = axios.delete(`http://localhost:8080/allvisitantes/${rut}`);
      setVisitantes(visitantes.filter((visitante) => visitante.rut !== rut))

    } catch (error) {
      console.log(error);
    }
  };

  const getVisitantes = async () => {

    try{
      const response = await axios.get("http://localhost:8080/allvisitantes");
      const jsonDatos = await response.data;
      console.log(jsonDatos); 
      setVisitantes(jsonDatos);
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
      tableId: 'visitantes'
    }
  
    // Columnas de la tabla
    const columns = [
      {
        name: "rut_vis",
        label: "RUT",
      },
      {
        name: "nombres_vis",
        label: "Nombres",
      },
      {
        name: "apes_vis",
        label: "Apellidos",
      },
      {
        name: "email_vis",
        label: "Email",
      },
      {
        name: "telefono_vis",
        label: "Celular",
      },
      {
        name: "direccion_vis",
        label: "Dirección",
      },
      {
        name: "rut_res",
        label: "Rut Residente Asociado",
      },
      {
        name: "Acciones",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <BotonesCrud handleDeleteRow={() => handleDeleteRow(tableMeta.rowData[0])} visitante={tableMeta.rowData}/>
            )
          }
        }
      }
  
    ]

  useEffect(() => {
    getVisitantes();
  }, [])

  return (
    <>
      <div className="flex justify-center items-center mr-5 ml-10 pt-4 pb-4">
        <MUIDataTable
          title={"Visitantes"}
          data={visitantes}
          columns={columns}
          options={options}
        />
      </div>
    </>
  );
};

export default TablaVisitantes;
