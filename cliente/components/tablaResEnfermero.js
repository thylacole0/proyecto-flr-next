"use client";
import React, { useEffect, useState} from 'react';
import styles from './tablaRes.module.css';
import GoToFicha from './botonToRes.js';
import axios from 'axios';
import MUIDataTable from 'mui-datatables';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Button from '@mui/material/Button';

const TablaResidentesEnfermero = () => {

    const [residentes, setResidentes] = useState([]);

    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();

    const handleOnClick = (rut_res) => () => {
      router.push(`/ficha_residente?rut_res=${rut_res}`);
    }

    const getResidentes = async () => {

    try{
        const response = await axios.get("http://localhost:8080/allresidentes");
        const jsonDatos = await response.data;
        setResidentes(jsonDatos);
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
      tableId: 'residentes'
    }
  
    // Columnas de la tabla
  const columns = [
    {
      name: "rut_res",
      label: "RUT",
    },
    {
      name: "nombres_res",
      label: "Nombres",
    },
    {
      name: "apes_res",
      label: "Apellidos",
    },
    {
      name: "direccion_res",
      label: "Dirección",
    },
    {
      name: "estadocivil_res",
      label: "Estado Civil",
    },
    {
      name: "fecha_nac_res",
      label: "Fecha de nacimiento",
    },
    {
      name: "medicamentos_res",
      label: "Medicamentos",
    },
    {
      name: "Acciones",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <Button variant="outlined" onClick={handleOnClick(tableMeta.rowData[0])}>Ver ficha</Button>
            );
        }
      }
    }

  ]

  useEffect(() => {
    getResidentes();
    
  }, [])

  return (
    <>
      <div className="flex justify-center items-center mr-5 ml-10 pt-4 pb-4">
        <MUIDataTable
          title={"Residentes"}
          data={residentes}
          columns={columns}
          options={options}
        />
      </div>
    </>
  );
};

export default TablaResidentesEnfermero;
