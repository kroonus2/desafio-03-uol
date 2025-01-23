import { useRoutes } from "react-router-dom";
import Login from "../pages/Login";
import Homepage from "../pages/Homepage";
// import { NotFound } from '../pages/NotFound';
// import { Login } from '../pages/Login';
// import { Register } from '../pages/Register';

export const MainRoutes = () => {
  return useRoutes([
    { path: "/", element: <Login /> },
    { path: "/home", element: <Homepage /> },
    // { path: "/register", element: <Register /> },
    // { path: "/category/:type", element: <CategoryPage /> },
    // { path: "*", element: <NotFound /> },
  ]);
};
