import Home from '../pages/Home'
import TabelaUsuarios from '../pages/Users/TabelaUsuarios';
import Formulario from '../pages/Users/Formulario';
import { useRoutes } from "react-router-dom"

export const AppRoute = () => {
    let routes = useRoutes([
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/users", element: <TabelaUsuarios /> },
      { path: "/users/formulario", element: <Formulario /> },
      { path: "/users/formulario/:id", element: <Formulario /> },
    ]);
    return routes;
  };