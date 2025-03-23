import React, { useState } from "react";

const CrearInformacion = () => {
  const [especie, setEspecie] = useState("");
  const [alimentacion, setAlimentacion] = useState("");
  const [temperaturaIdeal, setTemperaturaIdeal] = useState("");
  const [humedadIdeal, setHumedadIdeal] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevaInformacion = {
      especie,
      alimentacion,
      temperatura_ideal: temperaturaIdeal,
      humedad_ideal: humedadIdeal,
      descripcion,
      imagen,
    };

    const response = await fetch("http://localhost:4000/api/informaciones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaInformacion),
    });

    if (response.ok) {
      alert("Información creada con éxito");
    } else {
      alert("Error al crear la información");
    }
  };

  return (
    <div className="informacion-container">
      <h2>Crear Información</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Especie"
          value={especie}
          onChange={(e) => setEspecie(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Alimentación"
          value={alimentacion}
          onChange={(e) => setAlimentacion(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Temperatura Ideal"
          value={temperaturaIdeal}
          onChange={(e) => setTemperaturaIdeal(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Humedad Ideal"
          value={humedadIdeal}
          onChange={(e) => setHumedadIdeal(e.target.value)}
          required
        />
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="URL de la Imagen"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
          required
        />
        <button type="submit">Crear Información</button>
      </form>
    </div>
  );
};

export default CrearInformacion;
