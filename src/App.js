// src/App.js
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import FormLogin from "./components/FormLogin";
import FormRegistro from "./components/FormRegistro";
import FormRecuperacion from "./components/FormRecuperacion";
import Home from "./components/Home";
import UserDashboard from "./page/UserDashboard";
import AdminDashboard from "./page/AdminDashboard";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import HeaderPublic from "./components/HeaderPublic";
import HeaderAdmin from "./components/HeaderAdmin";
import Perfil from "./components/Perfil";
import TerrarioControl from "./components/TerrarioControl";
import MisionesVisualizar from "./components/MisionesVisualizar";
import InformacionVisualizar from "./components/InformacionVisualizar";
import ProductosVisualizar from "./components/ProductosVisualizar";
import VisionesVisualizar from "./components/VisionesVisualizar";
import ContactoVisualizar from "./components/ContactoVisualizar";
import PoliticasVisualizar from "./components/PoliticasVisualizar";
import PreguntasVisualizar from "./components/PreguntasVisualizar";
import TerminosVisualizar from "./components/TerminosVisualizar";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div>
      {/* Mostrar HeaderAdmin solo en rutas de admin, HeaderPublic en otras */}
      {isAdminRoute ? <HeaderAdmin /> : <HeaderPublic />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<FormLogin />} />
        <Route path="/registro" element={<FormRegistro />} />
        <Route path="/recuperacion" element={<FormRecuperacion />} />
        <Route path="/mision" element={<MisionesVisualizar />} />
        <Route path="/InformacionVisualizar" element={<InformacionVisualizar/>} />
        <Route path="/productos" element={<ProductosVisualizar/>}/>
        <Route path="/vision" element={<VisionesVisualizar/>}/>
        <Route path="/contacto" element={<ContactoVisualizar/>}/>
        <Route path="/politicas" element={<PoliticasVisualizar/>}/>
        <Route path="/preguntas" element={<PreguntasVisualizar/>}/>
        <Route path="/terminos" element={<TerminosVisualizar/>}/>
        
        <Route element={<PrivateRoute />}>
          <Route path="/usuario" element={<UserDashboard />} />
          <Route path="configuraciones" element={<TerrarioControl />}/>
          <Route path="/perfil" element={<Perfil />} />
        </Route>

        <Route path="/admin/*" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      </Routes>
    </div>
  );
}

export default App;