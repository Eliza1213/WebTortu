import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style/Home.css";

const Home = () => {
  const [leftSliderOpen, setLeftSliderOpen] = useState(false);

  const toggleLeftSlider = () => {
    setLeftSliderOpen(!leftSliderOpen);
  };

  const closeSliderOutside = (e) => {
    if (leftSliderOpen && !e.target.closest(".left-slider") && !e.target.closest(".slider-toggle")) {
      setLeftSliderOpen(false);
    }
  };

  return (
    <div className="home-container" onClick={closeSliderOutside}>
      {/* Botón para abrir el deslizador izquierdo */}
      <button 
        className={`slider-toggle left ${leftSliderOpen ? "hidden" : ""}`} 
        onClick={toggleLeftSlider}
      >
        ☰
      </button>

      {/* Deslizador izquierdo */}
      <div className={`left-slider ${leftSliderOpen ? "open" : ""}`} onClick={(e) => e.stopPropagation()}>
        <div className="slider-content">
          <h2 style={{ color: "white", textAlign: "center", whiteSpace: "nowrap" }}>Menú</h2>
          <Link to="/InformacionVisualizar" onClick={toggleLeftSlider}>Información de tortugas</Link>
          <Link to="/productos" onClick={toggleLeftSlider}>Productos</Link>
          <Link to="/contacto" onClick={toggleLeftSlider}>Contacto</Link>
          <Link to="/mision" onClick={toggleLeftSlider}>Misión</Link>
          <Link to="/vision" onClick={toggleLeftSlider}>Visión</Link>
          <Link to="/politicas" onClick={toggleLeftSlider}>Políticas</Link>
          <Link to="/preguntas" onClick={toggleLeftSlider}>Preguntas</Link>
          <Link to="/terminos" onClick={toggleLeftSlider}>Términos y condiciones</Link>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="home-content">
        <h1>Bienvenido a TORTU-TERRA</h1>

        {/* Contenedores para imágenes */}
        <div className="image-container">
          <p>Contenedor para imagen 1</p>
        </div>
        <div className="image-container">
          <p>Contenedor para imagen 2</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
