import React, { useState, useEffect } from 'react'; 
import { useRouter } from 'next/router';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/login');
  }, []);

  return <p>Cerrando sesión...</p>;
};

export default Logout;