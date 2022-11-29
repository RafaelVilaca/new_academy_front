import Home from '../pages/Home';
import FormularioUsuario from '../pages/Users/FormularioUsuario';
import TabelaUsuarios from '../pages/Users/TabeladeUsuarios';
import FormularioTreino from '../pages/Training/FormularioTreinos';
import TodosExerciciosDoTreino from '../pages/Training/TodosExerciciosDoTreino';
import TabeladeTreinos from '../pages/Training/TabeladeTreinos';
import TabelaExercicios from '../pages/Exercises/TabeladeExercicios';
import FormularioExercicios from '../pages/Exercises/FormularioExercicios';
import { useRoutes } from "react-router-dom";

export const AppRoute = () => {
    let routes = useRoutes([
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/users", element: <TabelaUsuarios /> },
      { path: "/users/formulario", element: <FormularioUsuario /> },
      { path: "/users/formulario/:id", element: <FormularioUsuario /> },
      { path: "/training", element: <TabeladeTreinos /> },
      { path: "/training/formulario", element: <FormularioTreino /> },
      { path: "/training/formulario/:id", element: <FormularioTreino /> },
      { path: "/training/see-all-exercises/:treino/:id", element: <TodosExerciciosDoTreino /> },
      { path: "/exercises", element: <TabelaExercicios /> },
      { path: "/exercises/formulario", element: <FormularioExercicios /> },
      { path: "/exercises/formulario/:id", element: <FormularioExercicios /> },
    ]);
    return routes;
  };