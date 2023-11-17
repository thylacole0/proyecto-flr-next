"use client";
import React, { useEffect, useState} from 'react';
import styles from './tablaRes.module.css';
import BotonesCrud from './botonesCrud.js';
import BotonAdd from './botonAgregar';
import axios from 'axios';
import MUIDataTable from 'mui-datatables';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import IconButton from '@mui/material/IconButton';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

const TablaResidentes = () => {

  const [residentes, setResidentes] = useState([]);
  const router = useRouter();
  const handleOnClick = (rut_res) => () => {
    router.push(`/ficha_residente?rut_res=${rut_res}`);
  }
  


  const getResidentes = async () => {

    try{
      const response = await axios.get("http://localhost:8080/allresidentes");
      const jsonDatos = await response.data;
      console.log(jsonDatos); 
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
          console.log(tableMeta.rowData[0])
          return (
            <>
              <div className="flex justify-center">
              <BotonesCrud residente={tableMeta.rowData}/>
              <IconButton aria-label="ficha" onClick={handleOnClick(tableMeta.rowData[0])} className="text-black" >
                <AssignmentIndIcon />
              </IconButton>
            </div>

            </>
          )
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

export default TablaResidentes;







// "use client";
// import React, { useEffect, useState} from 'react';
// import styles from './tablaRes.module.css';
// import BotonesCrud from './botonesCrud.js';
// import BotonAdd from './botonAgregar';
// import axios from 'axios';
// import MUIDataTable from 'mui-datatables';

// const TablaResidentes = () => {

//   const [residentes, setResidentes] = useState([]);

//   const handleDeleteRow = (rut_res) => {
//     try {
//       const response = axios.delete(`http://localhost:8080/allresidentes/${rut_res}`);
//       setResidentes(residentes.filter((residente) => residente.rut_res !== rut_res))
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getResidentes = async () => {
//     try{
//       const response = await axios.get("http://localhost:8080/allresidentes");
//       const jsonDatos = await response.data;
//       setResidentes(jsonDatos);
//     } catch (error) {
//     }
//   };
//   // Opciones de la tabla
//   const options = {
//     selectableRows: 'none',
//     responsive: 'standard',
//     download: true,
//     print: true,
//     pagination: true,
//     viewColumns: true,
//     search: true,
//     selectableRowsOnClick: false,
//     selectableRowsHeader: false,
//     filter: false,
//     tableId: 'residentes'
//   }

//   // Columnas de la tabla
//   const columns = [
//     {
//       name: "rut_res",
//       label: "RUT",
//     },
//     {
//       name: "nombres_res",
//       label: "Nombres",
//     },
//     {
//       name: "apes_res",
//       label: "Apellidos",
//     },
//     {
//       name: "direccion_res",
//       label: "Dirección",
//     },
//     {
//       name: "estadocivil_res",
//       label: "Estado Civil",
//     },
//     {
//       name: "fecha_nac_res",
//       label: "Fecha de nacimiento",
//     },
//     {
//       name: "medicamentos_res",
//       label: "Medicamentos",
//     },
//     {
//       name: "Acciones",
//       options: {
//         customBodyRender: (value, tableMeta, updateValue) => {
//           console.log(tableMeta.rowData[0])
//           return (
//             <BotonesCrud handleDeleteRow={() => handleDeleteRow(tableMeta.rowData[0])} residente={tableMeta.rowData}/>
//           )
//         }
//       }
//     }

//   ]
//   useEffect(() => {
//     getResidentes();
//   }, [])

//   // return (
//   //   <>
//   //     <div className="flex justify-center items-center mr-5 ml-10 pt-4 pb-4">
//   //       <MUIDataTable
//   //         title={"Residentes"}
//   //         data={residentes}
//   //         columns={columns}
//   //         options={options}
//   //       />
//   //     </div>
//   //   </>
//   // )
//   return (
//     <div className='flex justify-center '>
//       <div className={` ${styles['table-background']} container mx-auto mt-4 rounded-t-xl `}>
//         <div className="flex justify-between items-center mr-5 ml-10 pt-4 pb-4">
//           <h1 className="text-3xl font-bold mb-4 text-center">Residentes</h1>
//           <BotonAdd className="order-last" />
//         </div>
//         <div className="relative overflow-x-auto shadow-md sm:rounded-lg mr-5 ml-10 pt-4 pb-4">
//           <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
//             <thead className='text-xs text-gray-700 uppercase dark:text-gray-400'>
//               <tr className='border-b dark:border-gray-700 hover:bg-gray-300'>
//                 <th scope='col' className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">RUT</th>
//                 <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nombres</th>
//                 <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Apellidos</th>
//                 <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</th>
//                 <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Estado Civil</th>
//                 <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de nacimiento</th>
//                 <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Medicamentos</th>
//                 <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {residentes.map((residente, i) => (
//                 <tr key={residente.rut_res} className='border-b dark:border-gray-700 hover:bg-gray-300'>
//                   <td  className="px-6 py-4 text-center font-medium text-gray-500" >{residente.rut_res}</td>
//                   <td className="px-6 py-4 text-center font-medium text-gray-500" >{residente.nombres_res}</td>
//                   <td className="px-6 py-4 text-center font-medium text-gray-500" >{residente.apes_res}</td>
//                   <td className="px-6 py-4 text-center font-medium text-gray-500" >{residente.direccion_res}</td>
//                   <td className="px-6 py-4 text-center font-medium text-gray-500" >{residente.estadocivil_res}</td>
//                   <td className="px-6 py-4 text-center font-medium text-gray-500" >{residente.fecha_nac_res}</td>
//                   <td className="px-6 py-4 text-center font-medium text-gray-500" >{residente.medicamentos_res}</td>
//                   <td>
//                     <BotonesCrud handleDeleteRow={() => handleDeleteRow(residente.rut_res)} residente={residente}/>
//                   </td>
//                 </tr>
//               ))
//               }
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TablaResidentes;
