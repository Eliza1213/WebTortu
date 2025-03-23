import { useEffect, useState } from "react";

const ContactoVisualizar = () => {
    const [contactos, setContactos] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/api/contactos") // Llamada al backend
            .then((response) => response.json())
            .then((data) => setContactos(data))
            .catch((error) => console.error("Error al obtener contactos:", error));
    }, []);

    return (
        <div className="contactos-container">
            <h2 className="contactos-title">Nuestros Contactos</h2>
            {contactos.length === 0 ? (
                <p>No hay contactos disponibles</p>
            ) : (
                <ul className="contactos-list">
                    {contactos.map((contacto) => (
                        <li key={contacto._id} className="contacto-item">
                            <p><strong>Email:</strong> {contacto.email}</p>
                            <p><strong>Teléfono:</strong> {contacto.telefono}</p>
                            <p><strong>Ubicación:</strong> {contacto.ubicacion}</p>
                            {contacto.redes_sociales && contacto.redes_sociales.length > 0 && (
                                <div className="redes-sociales">
                                    <strong>Redes Sociales:</strong>
                                    <ul>
                                        {contacto.redes_sociales.map((red, index) => (
                                            <li key={index}>
                                                <strong>{red.nombre}:</strong> <a href={red.enlace} target="_blank" rel="noopener noreferrer">{red.enlace}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ContactoVisualizar;
