import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const GoToFicha = () => {
  
  return (
    <button className="btn btn-primary" onClick={() => handleOnClick(tableMeta.rowData[0])} >
      Ir a la ficha
    </button>
  );
}
export default GoToFicha;