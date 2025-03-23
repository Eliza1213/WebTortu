import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import '../style/login.css';

const FormLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      localStorage.setItem("token", data.token);
      localStorage.setItem("rol", data.rol);
      localStorage.setItem("nombre", data.nombre);

      Swal.fire({ icon: "success", title: "Inicio de sesión exitoso" });

      if (data.rol === "admin") {
        navigate("/admin");
      } else {
        navigate("/usuario");
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: error.message });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Correo Electrónico:</label>
      <input type="email" name="email" placeholder="Correo electrónico" onChange={handleChange} required />
      <label>Contraseña:</label>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          required
        />
        <button type="button" onClick={togglePasswordVisibility}>
          {showPassword ? "🙈" : "👁️"}
        </button>
      </div>
      <button type="submit">Iniciar sesión</button>
    </form>
  );
};

export default FormLogin;