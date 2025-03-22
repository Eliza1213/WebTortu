import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ListarInformacion = () => {
  const [informaciones, setInformaciones] = useState([]);

  useEffect(() => {
    const fetchInformaciones = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/informaciones");
        if (!response.ok) throw new Error("Error al obtener información");
        const data = await response.json();
        console.log("Información obtenida:", data); // Depuración
        setInformaciones(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchInformaciones();
  }, []);

  // Función para eliminar información con confirmación
  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta información?")) {
      try {
        const response = await fetch(`http://localhost:4000/api/informaciones/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setInformaciones(informaciones.filter((info) => info._id !== id));
        } else {
          console.error("Error al eliminar la información");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="informacion-container">
      <h2 className="informacion-titulo">Información sobre Tortugas</h2>
      {/* Botón para crear nueva información */}
      <Link to="/admin/informaciones/crear" className="btn-crear">
        ➕ Crear Nueva Información
      </Link>
      {informaciones.length === 0 ? (
        <p className="informacion-vacio">No hay información disponible</p>
      ) : (
        <table className="informacion-tabla">
          <thead>
            <tr>
              <th>Especie</th>
              <th>Alimentación</th>
              <th>Temperatura Ideal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {informaciones.map((info) => (
              <tr key={info._id} className="informacion-fila">
                <td>{info.especie}</td>
                <td>{info.alimentacion}</td>
                <td>{info.temperatura_ideal}</td>
                <td className="acciones">
                  <Link
                    to={`/admin/informaciones/actualizar/${info._id}`}
                    className="btn-accion btn-actualizar"
                  >
                    Actualizar
                  </Link>
                  <button
                    onClick={() => handleEliminar(info._id)}
                    className="btn-accion btn-eliminar"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListarInformacion;