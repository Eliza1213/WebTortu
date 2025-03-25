import { useEffect, useState } from "react";
import '../style/visionesPublica.css';
import Footer from "./Footer"; // Importa el Footer

const VisionesVisualizar = () => {
  const [visiones, setVisiones] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/visiones") // Llamada al backend
      .then((response) => response.json())
      .then((data) => setVisiones(data))
      .catch((error) => console.error("Error al obtener visiones:", error));
  }, []);

  return (
    <>
      <div className="visiones-container">
        <h2 className="visiones-title">Nuestra Visión</h2>
        {visiones.length === 0 ? (
          <p className="no-visiones">No hay visiones disponibles</p>
        ) : (
          <div className="visiones-grid">
            {visiones.map((vision) => (
              <div key={vision._id} className="vision-card">
                <h3 className="vision-titulo">{vision.titulo}</h3>
                <p className="vision-descripcion">{vision.descripcion}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default VisionesVisualizar;