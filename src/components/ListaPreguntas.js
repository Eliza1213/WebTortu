import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const ListarPreguntas = () => {
  const [preguntas, setPreguntas] = useState([]);

  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/preguntas");
        if (!response.ok) throw new Error("Error al obtener preguntas");
        const data = await response.json();
        console.log("Preguntas obtenidas:", data); // Depuración
        setPreguntas(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPreguntas();
  }, []);

  // Función para eliminar una pregunta con confirmación
  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta pregunta?")) {
      try {
        const response = await fetch(`http://localhost:4000/api/preguntas/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setPreguntas(preguntas.filter((pregunta) => pregunta._id !== id));
        } else {
          console.error("Error al eliminar la pregunta");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="preguntas-container">
      <h2 className="preguntas-titulo">Preguntas</h2>
      {/* Botón para crear una nueva pregunta */}
      <Link to="/admin/preguntas/crear" className="btn-crear">
        ➕ Crear Nueva Pregunta
      </Link>
      {preguntas.length === 0 ? (
        <p className="preguntas-vacio">No hay preguntas disponibles</p>
      ) : (
        <table className="preguntas-tabla">
          <thead>
            <tr>
              <th>Título</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {preguntas.map((pregunta) => (
              <tr key={pregunta._id} className="pregunta-fila">
                <td>{pregunta.pregunta || "Sin título"}</td>
                <td className="acciones">
                  <Link
                    to={`/admin/preguntas/actualizar/${pregunta._id}`}
                    className="btn-accion btn-actualizar"
                  >
                    Actualizar
                  </Link>
                  <button
                    onClick={() => handleEliminar(pregunta._id)}
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

export default ListarPreguntas;