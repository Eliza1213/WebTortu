// frontend/src/components/ListaUsuarios.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/ListaUsuarios.css";

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const response = await fetch("http://localhost:4000/api/usuarios");
      const data = await response.json();
      setUsuarios(data);
    };

    fetchUsuarios();
  }, []);

  return (
    <div className="usuarios-container">
      <h2>Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Username</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario._id}>
              <td>{usuario.nombre}</td>
              <td>{usuario.username}</td>
              <td>{usuario.email}</td>
              <td>{usuario.rol}</td>
              <td>
                <Link to={`/admin/usuarios/actualizar/${usuario._id}`}>
                  Actualizar Rol
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaUsuarios;