import { useRoutes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import ProtectedRoute from "../components/protectedRoute";
// import { NotFound } from '../pages/NotFound';

export const MainRoutes = () => {
  return useRoutes([
    { path: "/", element: <ProtectedRoute children={<Homepage />} /> },
    { path: "/signin", element: <Signin /> },
    { path: "/signup", element: <Signup /> },
    // { path: "*", element: <NotFound /> },
  ]);
};
