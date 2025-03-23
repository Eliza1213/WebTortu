import React, { useState, useEffect } from "react";
import axios from "axios";

const FormRecuperacion = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    respuestaSecreta: "",
    nuevaPassword: "",
    confirmarPassword: "",
  });
  const [mensaje, setMensaje] = useState("");
  const [preguntaSecreta, setPreguntaSecreta] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNextStep = async () => {
    if (step === 0) {
      // Verificar correo
      try {
        const response = await axios.post("http://localhost:4000/api/usuarios/verificar-correo", { email: formData.email });
        setMensaje(response.data.mensaje);
        setStep(1);
      } catch (error) {
        setMensaje(error.response.data.error);
      }
    } else if (step === 1) {
      // Verificar respuesta secreta
      try {
        const response = await axios.post("http://localhost:4000/api/usuarios/verificar-respuesta", {
          email: formData.email,
          respuesta: formData.respuestaSecreta,
        });
        setMensaje(response.data.mensaje);
        setStep(2);
      } catch (error) {
        setMensaje(error.response.data.error);
      }
    } else if (step === 2) {
      // Cambiar contraseña
      if (formData.nuevaPassword === formData.confirmarPassword) {
        try {
          const response = await axios.post("http://localhost:4000/api/usuarios/cambiar-contrasena", {
            email: formData.email,
            nuevaPassword: formData.nuevaPassword,
          });
          setMensaje(response.data.mensaje);
          setStep(3); // Paso final
        } catch (error) {
          setMensaje(error.response.data.error);
        }
      } else {
        setMensaje("Las contraseñas no coinciden.");
      }
    }
  };

  const fetchPreguntaSecreta = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/usuarios/obtener-pregunta", { email: formData.email });
      setPreguntaSecreta(response.data.preguntaSecreta);
    } catch (error) {
      setMensaje(error.response.data.error);
    }
  };

  // Obtener la pregunta secreta cuando se verifica el correo
  useEffect(() => {
    if (step === 1) {
      fetchPreguntaSecreta();
    }
  }, [step]);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {step === 0 && (
        <div>
          <label>Correo Electrónico:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          <button type="button" onClick={handleNextStep}>Siguiente</button>
        </div>
      )}

      {step === 1 && (
        <div>
          <label>{preguntaSecreta}</label>
          <input type="text" name="respuestaSecreta" value={formData.respuestaSecreta} onChange={handleChange} required />
          <button type="button" onClick={() => setStep(0)}>Atrás</button>
          <button type="button" onClick={handleNextStep}>Siguiente</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <label>Nueva Contraseña:</label>
          <input type="password" name="nuevaPassword" value={formData.nuevaPassword} onChange={handleChange} required />
          <label>Confirmar Contraseña:</label>
          <input type="password" name="confirmarPassword" value={formData.confirmarPassword} onChange={handleChange} required />
          <button type="button" onClick={() => setStep(1)}>Atrás</button>
          <button type="button" onClick={handleNextStep}>Cambiar Contraseña</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <p>{mensaje}</p>
        </div>
      )}

      {mensaje && step !== 3 && <p>{mensaje}</p>}
    </form>
  );
};

export default FormRecuperacion;