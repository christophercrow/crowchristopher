import * as React from 'react';
import { Routes, Route } from "react-router-dom";

import Home from './pages/Home/index copy.jsx';
import Me from './pages/Me';
import Works from './pages/Works';
import SysAdmin from './pages/SysAdmin';
import CyberSecurity from './pages/CyberSec';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/works" element={<Works />} />
      <Route path="/me" element={<Me />} />
      <Route path="/sysadmin" element={<SysAdmin />} />
      <Route path="/cybersecurity" element={<CyberSecurity />} />
    </Routes>
  );
}

export default App;
