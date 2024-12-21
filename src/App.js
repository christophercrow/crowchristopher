import * as React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Me from './pages/Me'
import Works from './pages/Works'
import BlogPage from "./pages/Blog";
import BlogDetail from "./components/BlogDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/works" element={<Works />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/categories/:category" element={<BlogPage />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/me" element={<Me />} />
    </Routes>
  );
}

// function Blog() {
//   window.location.href = 'https://fossian.com';
//   return null;
// }

export default App;
