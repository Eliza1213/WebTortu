import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/Perfil.css';

const Perfil = () => {
  // Estado inicial vacío
  const [usuario, setUsuario] = useState({
    nombre: '',
    email: '',
    telefono: '',
    avatar: 'https://i.pravatar.cc/150?img=5',
    tortugas: [],
    ultimoAcceso: new Date().toISOString().split('T')[0] // Fecha actual
  });

  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({ ...usuario });
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Cargar datos del perfil al montar el componente
  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        setCargando(true);
        const token = localStorage.getItem('token'); // Asumiendo que usas JWT
        
        const response = await fetch('http://localhost:4000/api/usuarios/perfil', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error('Error al cargar perfil');

        const data = await response.json();
        setUsuario(data);
        setFormData(data);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    cargarPerfil();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setCargando(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:4000/api/usuarios/perfil', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Error al actualizar');

      const data = await response.json();
      setUsuario(data);
      setEditando(false);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  if (cargando) return <div className="cargando">Cargando perfil...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="perfil-container">
      <div className="perfil-header">
        <h1>Mi Perfil</h1>
        <button 
          onClick={() => setEditando(!editando)}
          className="editar-btn"
          disabled={cargando}
        >
          {editando ? 'Cancelar' : 'Editar Perfil'}
        </button>
      </div>

      <div className="perfil-content">
        <div className="avatar-section">
          <img 
            src={usuario.avatar} 
            alt="Avatar" 
            className="avatar-img"
          />
          {editando && (
            <button className="cambiar-avatar-btn">
              Cambiar Foto
            </button>
          )}
        </div>

        {editando ? (
          <form onSubmit={handleSubmit} className="perfil-form">
            <div className="form-group">
              <label>Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Teléfono:</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
              />
            </div>

            <button 
              type="submit" 
              className="guardar-btn"
              disabled={cargando}
            >
              {cargando ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </form>
        ) : (
          <div className="info-perfil">
            <div className="info-item">
              <span className="info-label">Nombre:</span>
              <span className="info-value">{usuario.nombre}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{usuario.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Teléfono:</span>
              <span className="info-value">{usuario.telefono || 'No especificado'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Mis Tortugas:</span>
              <div className="tortugas-list">
                {usuario.tortugas.length > 0 ? (
                  usuario.tortugas.map((tortuga, index) => (
                    <span key={index} className="tortuga-tag">
                      {tortuga.nombre || tortuga}
                    </span>
                  ))
                ) : (
                  <span className="sin-tortugas">No hay tortugas registradas</span>
                )}
                <Link to="/usuario/tortugas" className="agregar-tortuga">
                  +
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="stats-section">
        <div className="stat-card">
          <h3>Último Acceso</h3>
          <p>{usuario.ultimoAcceso}</p>
        </div>
        <div className="stat-card">
          <h3>Tortugas Registradas</h3>
          <p>{usuario.tortugas.length}</p>
        </div>
        <div className="stat-card">
          <h3>Dispositivos IoT</h3>
          <p>{usuario.dispositivosIoT || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default Perfil;