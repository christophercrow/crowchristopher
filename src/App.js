import * as React from 'react';
import { Routes, Route } from "react-router-dom";

import Home from './pages/Home/index.jsx';
import Me from './pages/Me';
import Works from './pages/Works';
import SysAdmin from './pages/SysAdmin';
import CyberSecurity from './pages/CyberSec';

// --- Import the new Projects pages ---
import ProjectsPage from './pages/Projects/ProjectsPage.jsx';
import TopicProjectsPage from './pages/Projects/TopicProjectsPage.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/works" element={<Works />} />
      <Route path="/me" element={<Me />} />
      <Route path="/sysadmin" element={<SysAdmin />} />
      <Route path="/cybersecurity" element={<CyberSecurity />} />
      {/* --- New Projects Section --- */}
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/projects/:topicId" element={<TopicProjectsPage />} />
    </Routes>
  );
}

export default App;
