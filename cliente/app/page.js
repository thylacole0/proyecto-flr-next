import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Calendario from "@/components/bitacoraRes";

export default function HomePage() {
  return (
    <Router>
      <div>
        <Calendario />
      </div>
    </Router>
  );
}