import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Perfil.css';
import { FiUser, FiEdit, FiSave, FiX, FiClock } from 'react-icons/fi';
import Swal from 'sweetalert2';

const Perfil = () => {
  const [usuario, setUsuario] = useState({
    nombre: localStorage.getItem('nombre') || '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    username: '',
    email: '',
    telefono: '',
    avatar: 'https://i.pravatar.cc/150?img=3',
    ultimoAcceso: new Date().toLocaleString()
  });

  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({ ...usuario });
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarPerfil = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!token || !userId) {
        navigate('/login');
        return;
      }

      try {
        setCargando(true);
        const response = await fetch(`http://localhost:4000/api/usuarios/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          navigate('/login');
          return;
        }

        const data = await response.json();
        
        // Adaptación a tu estructura real
        setUsuario({
          nombre: data.nombre || '',
          apellidoPaterno: data.ap || '',
          apellidoMaterno: data.am || '',
          username: data.username || '',
          email: data.email || '',
          telefono: data.telefono || '',
          avatar: 'https://i.pravatar.cc/150?img=3',
          ultimoAcceso: new Date().toLocaleString()
        });

        setFormData({
          nombre: data.nombre || '',
          apellidoPaterno: data.ap || '',
          apellidoMaterno: data.am || '',
          username: data.username || '',
          email: data.email || '',
          telefono: data.telefono || ''
        });

      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar la información del perfil'
        });
      } finally {
        setCargando(false);
      }
    };

    cargarPerfil();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      navigate('/login');
      return;
    }

    try {
      setCargando(true);
      const response = await fetch(`http://localhost:4000/api/usuarios/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          ap: formData.apellidoPaterno,
          am: formData.apellidoMaterno,
          telefono: formData.telefono
          // El email y username no se deberían poder modificar normalmente
        })
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
        return;
      }

      const data = await response.json();
      
      // Actualiza localStorage si es necesario
      if (data.nombre) {
        localStorage.setItem('nombre', data.nombre);
      }

      setUsuario(prev => ({
        ...prev,
        nombre: data.nombre || prev.nombre,
        apellidoPaterno: data.ap || prev.apellidoPaterno,
        apellidoMaterno: data.am || prev.apellidoMaterno,
        telefono: data.telefono || prev.telefono,
        ultimoAcceso: new Date().toLocaleString()
      }));

      setEditando(false);
      Swal.fire({
        icon: 'success',
        title: '¡Perfil actualizado!',
        showConfirmButton: false,
        timer: 1500
      });

    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar el perfil'
      });
    } finally {
      setCargando(false);
    }
  };

  if (cargando) {
    return (
      <div className="perfil-cargando">
        <div className="spinner"></div>
        <p>Cargando tu perfil...</p>
      </div>
    );
  }

  return (
    <div className="perfil-container">
      <div className="perfil-header">
        <h1><FiUser /> Mi Perfil</h1>
        <button 
          onClick={() => setEditando(!editando)} 
          className={`btn ${editando ? 'btn-cancelar' : 'btn-editar'}`}
          disabled={cargando}
        >
          {editando ? <><FiX /> Cancelar</> : <><FiEdit /> Editar</>}
        </button>
      </div>

      <div className="perfil-content">
        <div className="avatar-section">
          <img src={usuario.avatar} alt="Avatar" className="avatar" />
          {editando && (
            <button 
              type="button" 
              className="btn btn-avatar"
              onClick={() => alert('Funcionalidad para cambiar foto en desarrollo')}
            >
              <FiEdit /> Cambiar foto
            </button>
          )}
        </div>

        {editando ? (
          <form className="perfil-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Apellido Paterno</label>
              <input
                type="text"
                name="apellidoPaterno"
                value={formData.apellidoPaterno}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Apellido Materno</label>
              <input
                type="text"
                name="apellidoMaterno"
                value={formData.apellidoMaterno}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                disabled
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
              />
            </div>

            <div className="form-group">
              <label>Teléfono</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-guardar" 
              disabled={cargando}
            >
              <FiSave /> {cargando ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </form>
        ) : (
          <div className="perfil-info">
            <div className="info-item">
              <span className="info-label">Nombre completo:</span>
              <span className="info-value">
                {`${usuario.nombre} ${usuario.apellidoPaterno} ${usuario.apellidoMaterno}`.trim()}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Username:</span>
              <span className="info-value">{usuario.username}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{usuario.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Teléfono:</span>
              <span className="info-value">{usuario.telefono || 'No especificado'}</span>
            </div>
          </div>
        )}
      </div>

      {/* Sección simplificada de estadísticas */}
      <div className="perfil-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <FiClock />
          </div>
          <h3>Último acceso</h3>
          <p>{usuario.ultimoAcceso}</p>
        </div>
      </div>
    </div>
  );
};

export default Perfil;