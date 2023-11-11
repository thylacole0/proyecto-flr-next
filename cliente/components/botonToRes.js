import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

const GoToFicha = () => {
  
  return (
    <button className="btn btn-primary" onClick={() => handleOnClick(tableMeta.rowData[0])} >
      Ir a la ficha
    </button>
  );
}
export default GoToFicha;