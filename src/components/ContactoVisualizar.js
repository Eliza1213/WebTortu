import { useEffect, useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGlobe } from "react-icons/fa"; // Importar iconos de redes sociales
import LeafletMap from "./LeafletMap"; // Importa el componente LeafletMap
import "../style/Contacto.css";

const ContactoVisualizar = () => {
  const [contactos, setContactos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/contactos") // Llamada al backend
      .then((response) => response.json())
      .then((data) => setContactos(data))
      .catch((error) => console.error("Error al obtener contactos:", error));
  }, []);

  // Función para obtener el icono de la red social
  const getSocialIcon = (nombre) => {
    switch (nombre.toLowerCase()) {
      case "facebook":
        return <FaFacebook />;
      case "twitter":
        return <FaTwitter />;
      case "instagram":
        return <FaInstagram />;
      case "linkedin":
        return <FaLinkedin />;
      default:
        return <FaGlobe />;
    }
  };

  return (
    <div className="contactos-container">
      <h2 className="contactos-title">Nuestros Contactos</h2>
      {contactos.length === 0 ? (
        <p className="no-contactos">No hay contactos disponibles</p>
      ) : (
        <div className="contactos-grid">
          {contactos.map((contacto) => (
            <div key={contacto._id} className="contacto-card">
              <h3 className="contacto-email"><strong>Correo:</strong>{contacto.email}</h3>
              <p className="contacto-info"><strong>Teléfono:</strong> {contacto.telefono}</p>
              {/* Muestra el nombre de la dirección */}
              <p className="contacto-info"><strong>Ubicación:</strong> {contacto.ubicacion.direccion}</p>
              {/* Muestra el mapa usando LeafletMap */}
              <LeafletMap lat={contacto.ubicacion.lat} lng={contacto.ubicacion.lng} />
              {contacto.redes_sociales && contacto.redes_sociales.length > 0 && (
                <div className="redes-sociales">
                  <strong>Redes Sociales:</strong>
                  <div className="redes-icons">
                    {contacto.redes_sociales.map((red, index) => (
                      <a
                        key={index}
                        href={red.enlace}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="red-social"
                      >
                        {getSocialIcon(red.nombre)}
                        <span>{red.nombre}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactoVisualizar;