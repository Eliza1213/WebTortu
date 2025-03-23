import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ActualizarProducto = () => {
  const { id } = useParams(); // Obtiene el ID del producto desde la URL
  const navigate = useNavigate(); // Para redirigir después de actualizar
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/productos/${id}`);
        if (!response.ok) throw new Error("Error al obtener el producto");
        const data = await response.json();
        setNombre(data.nombre);
        setDescripcion(data.descripcion);
        setPrecio(data.precio);
        setStock(data.stock);
        setImagenes(data.imagenes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducto();
  }, [id]);

  const handleImagenChange = (index, value) => {
    const nuevasImagenes = [...imagenes];
    nuevasImagenes[index] = value;
    setImagenes(nuevasImagenes);
  };

  const handleAgregarImagen = () => {
    setImagenes([...imagenes, ""]);
  };

  const handleEliminarImagen = (index) => {
    const nuevasImagenes = imagenes.filter((_, i) => i !== index);
    setImagenes(nuevasImagenes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProducto = { 
      nombre, 
      descripcion, 
      precio: parseFloat(precio), 
      stock: parseInt(stock), 
      imagenes 
    };

    try {
      const response = await fetch(`http://localhost:4000/api/productos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProducto),
      });

      if (response.ok) {
        alert("Producto actualizado con éxito");
        navigate("/admin/productos/listar"); // Redirige a la lista de productos
      } else {
        alert("Error al actualizar producto");
      }
    } catch (error) {
      console.error("Error en la actualización:", error);
    }
  };

  return (
    <div className="productos-container">
      <h2>Actualizar Producto</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
        <h4>Imágenes</h4>
        {imagenes.map((imagen, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={`URL de la imagen ${index + 1}`}
              value={imagen}
              onChange={(e) => handleImagenChange(index, e.target.value)}
              required
            />
            <button type="button" onClick={() => handleEliminarImagen(index)}>
              Eliminar
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAgregarImagen}>
          Agregar Imagen
        </button>
        <button type="submit">Actualizar Producto</button>
      </form>
    </div>
  );
};

export default ActualizarProducto;
