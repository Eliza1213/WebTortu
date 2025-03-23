import { useEffect, useState } from "react";
import '../style/visionesPublica.css';

const MisionesVisualizar = () => {
    const [misiones, setMisiones] = useState([]);
  
    useEffect(() => {
      fetch("http://localhost:4000/api/misiones") // Llamada al backend
        .then((response) => response.json())
        .then((data) => setMisiones(data))
        .catch((error) => console.error("Error al obtener misiones:", error));
    }, []);
  
    return (
      <div className="visiones-container">
        <h2 className="visiones-title">Nuestra Misión</h2>
        {misiones.length === 0 ? (
          <p>No hay Misiones disponibles</p>
        ) : (
          <ul className="visiones-list">
            {misiones.map((mision) => (
              <li key={mision._id} className="vision-item">
                <h3>{mision.titulo}</h3>
                <p>{mision.descripcion}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default MisionesVisualizar;
