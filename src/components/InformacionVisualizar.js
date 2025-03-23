import { useEffect, useState } from "react";
import '../style/productosPublica.css'; // Asegúrate de tener una hoja de estilos adecuada

const InformacionVisualizar = () => {
    const [informaciones, setInformaciones] = useState([]);

    useEffect(() => {
      fetch("http://localhost:4000/api/informaciones") // Llamada al backend
        .then((response) => response.json())
        .then((data) => setInformaciones(data))
        .catch((error) => console.error("Error al obtener la información:", error));
    }, []);

    return (
      <div className="productos-container">
        <h2 className="productos-title">Información sobre Tortugas</h2>
        {informaciones.length === 0 ? (
          <p>No hay información disponible</p>
        ) : (
          <ul className="productos-list">
            {informaciones.map((info) => (
              <li key={info._id} className="productos-item">
                <h3>{info.especie}</h3>
                <p><strong>Alimentación:</strong> {info.alimentacion}</p>
                <p><strong>Temperatura Ideal:</strong> {info.temperatura_ideal}</p>
                <p><strong>Humedad Ideal:</strong> {info.humedad_ideal}</p>
                <p><strong>Descripción:</strong> {info.descripcion}</p>
                {info.imagen && (
                  <div className="productos-imagen">
                    <img src={info.imagen} alt={`Imagen de ${info.especie}`} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

export default InformacionVisualizar;
