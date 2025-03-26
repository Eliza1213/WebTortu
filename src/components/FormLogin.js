import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import '../style/login.css';

const FormLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Alternar visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulario enviado con datos:", formData); // 🚀 Depuración

    // Validar que los campos no estén vacíos
    if (!formData.email || !formData.password) {
      Swal.fire({ icon: "error", title: "Error", text: "Por favor, completa todos los campos." });
      return;
    }

    // Validar el formato del correo electrónico
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(formData.email)) {
      Swal.fire({ icon: "error", title: "Error", text: "El formato del correo electrónico no es válido." });
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log("Estado de la respuesta:", response.status); // 🚀 Ver código de estado
      const data = await response.json();
      console.log("Respuesta del servidor:", data); // 🚀 Ver datos recibidos

      if (!response.ok) throw new Error(data.error || "Error en la autenticación");

      // Guardar datos en localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId._id);  // ¡Este es el que falta!
      localStorage.setItem("nombre", data.nombre);

      Swal.fire({ icon: "success", title: "Inicio de sesión exitoso" });

      // Redirigir según el rol del usuario
      if (data.rol === "admin") {
        navigate(location.state?.from?.pathname || "/admin", { replace: true });
      } else {
        navigate("/usuario", { replace: true });
      }

    } catch (error) {
      console.error("Error en el login:", error.message); // 🚀 Ver error en consola
      Swal.fire({ icon: "error", title: "Error", text: error.message });
    }
  };

  return (
    <div className="login-container">
      <h1>Formulario de Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Correo Electrónico:</label>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="button" onClick={togglePasswordVisibility} className="toggle-password">
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>
        <button type="submit" className="submit-button">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default FormLogin;
