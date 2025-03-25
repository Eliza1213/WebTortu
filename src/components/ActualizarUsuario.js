import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import "../style/Actualizar.css";

const ActualizarUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rol, setRol] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:4000/api/usuarios/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status !== 200 || !response.data) {
          throw new Error("Datos de usuario no recibidos");
        }

        setRol(response.data.rol);
        setError(null);
      } catch (error) {
        console.error("Error fetching user:", error.response?.data || error.message);
        setError(error.response?.data?.message || "Error al cargar usuario");
        Swal.fire("Error", "No se pudo cargar la información del usuario", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:4000/api/usuarios/${id}/rol`,
        { rol },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (response.status === 200) {
        await Swal.fire("Éxito", "Rol actualizado correctamente", "success");
        navigate("/admin/usuarios");
      }
    } catch (error) {
      console.error("Update error:", error.response?.data || error.message);
      Swal.fire(
        "Error", 
        error.response?.data?.message || "Error al actualizar el rol", 
        "error"
      );
    }
  };

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="actualizar-container">
      <h2>Actualizar Rol</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Seleccione el nuevo rol:</label>
          <select
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            required
            className="form-control"
          >
            <option value="">-- Seleccione --</option>
            <option value="usuario">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <div className="button-group">
          <button type="submit" className="btn-primary">
            Guardar Cambios
          </button>
          <button 
            type="button" 
            className="btn-secondary"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ActualizarUsuario;