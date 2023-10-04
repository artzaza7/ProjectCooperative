import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/js/bootstrap'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './page/Home.jsx';
import AllTranscation from './page/AllTranscation.jsx';
import History from './page/History.jsx';
import Login from './page/login/login.jsx';
import Register from './page/login/register.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/alltranscation" element={<AllTranscation />} />
        <Route path="/history" element={<History />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);