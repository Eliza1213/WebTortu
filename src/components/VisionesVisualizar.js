import { useEffect, useState } from "react";
import '../style/visionesPublica.css';

const VisionesVisualizar = () => {
    const [visiones, setVisiones] = useState([]);
  
    useEffect(() => {
      fetch("http://localhost:4000/api/visiones") // Llamada al backend
        .then((response) => response.json())
        .then((data) => setVisiones(data))
        .catch((error) => console.error("Error al obtener visiones:", error));
    }, []);
  
    return (
      <div className="visiones-container">
        <h2 className="visiones-title">Nuestra Visión</h2>
        {visiones.length === 0 ? (
          <p>No hay visiones disponibles</p>
        ) : (
          <ul className="visiones-list">
            {visiones.map((vision) => (
              <li key={vision._id} className="vision-item">
                <h3>{vision.titulo}</h3>
                <p>{vision.descripcion}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default VisionesVisualizar;