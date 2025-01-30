import { useRoutes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import ProtectedRoute from "../components/protectedRoute";
import Search from "../pages/Search";
import AllProducts from "../pages/Allproducts";
// import { NotFound } from '../pages/NotFound';

export const MainRoutes = () => {
  return useRoutes([
    { path: "/", element: <ProtectedRoute children={<Homepage />} /> },
    { path: "/signin", element: <Signin /> },
    { path: "/signup", element: <Signup /> },
    { path: "/search", element: <Search /> },
    { path: "/all-products", element: <AllProducts /> },

    // { path: "*", element: <NotFound /> },
  ]);
};
