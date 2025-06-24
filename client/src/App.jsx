import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard';
import Report from './pages/Report';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/report" element={<Dashboard />} />
          <Route path="/report/:id" element={<Report />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
