import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import '../style/login.css';

const FormLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

      // Guardar datos en localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("rol", data.rol);
      localStorage.setItem("nombre", data.nombre);

      Swal.fire({ icon: "success", title: "Inicio de sesión exitoso" });

      // Redirección basada en el rol
      if (data.rol === "admin") {
        navigate(location.state?.from?.pathname || "/admin", { replace: true });
      } else {
        navigate("/usuario", { replace: true });
      }

    } catch (error) {
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
