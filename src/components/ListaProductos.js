import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ListarProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/productos");
        if (!response.ok) throw new Error("Error al obtener productos");
        const data = await response.json();
        console.log("Productos obtenidos:", data); // Depuración
        setProductos(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProductos();
  }, []);

  // Función para eliminar un producto con confirmación
  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        const response = await fetch(`http://localhost:4000/api/productos/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setProductos(productos.filter((producto) => producto._id !== id));
        } else {
          console.error("Error al eliminar el producto");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="productos-container">
      <h2 className="productos-titulo">Productos</h2>
      {/* Botón para crear un nuevo producto */}
      <Link to="/admin/productos/crear" className="btn-crear">
        ➕ Crear Nuevo Producto
      </Link>
      {productos.length === 0 ? (
        <p className="productos-vacio">No hay productos disponibles</p>
      ) : (
        <table className="productos-tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto._id} className="producto-fila">
                <td>{producto.nombre}</td>
                <td>${producto.precio.toFixed(2)}</td>
                <td className="acciones">
                  <Link
                    to={`/admin/productos/actualizar/${producto._id}`}
                    className="btn-accion btn-actualizar"
                  >
                    Actualizar
                  </Link>
                  <button
                    onClick={() => handleEliminar(producto._id)}
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

export default ListarProductos;