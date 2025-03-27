// UserProfile.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:4000/api/usuarios/perfil", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener el perfil del usuario");
        }

        const data = await response.json();
        // Asegúrate de acceder a la propiedad 'usuario' del objeto de respuesta
        setUserData(data.usuario);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (!userData) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Perfil de Usuario</h1>
      <p>Nombre: {userData.nombre}</p>
      <p>Apellido Paterno: {userData.ap}</p>
      <p>Apellido Materno: {userData.am}</p>
      <p>Correo Electrónico: {userData.email}</p>
      <p>Telefono: {userData.telefono}</p>
      <p>Nombre de usuario: {userData.username}</p>
      <p>Rol: {userData.rol}</p>
      {/* Agrega más campos según sea necesario */}
    </div>
  );
};

export default UserProfile;
