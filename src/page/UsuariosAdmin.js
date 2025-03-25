import { Routes, Route } from "react-router-dom";
import ListaUsuarios from "../components/ListaUsuarios";
import ActualizarUsuario from "../components/ActualizarUsuario";

const UsuariosAdmin = () => {
  return (
    <Routes>
      <Route index element={<ListaUsuarios />} /> {/* /admin/usuarios */}
      <Route path="actualizar/:id" element={<ActualizarUsuario />} /> {/* /admin/usuarios/actualizar/123 */}
    </Routes>
  );
};

export default UsuariosAdmin;
