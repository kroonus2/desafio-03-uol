import { useRoutes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import ProtectedRoute from "../components/protectedRoute";
import Search from "../pages/Search";
import AllProducts from "../pages/Products";
import ProductPage from "../pages/Product";
import Cart from "../pages/Cart";
// import { NotFound } from '../pages/NotFound';

export const MainRoutes = () => {
  // Usando a rota protegida em todas as pagina menos nas de autenticaçao
  return useRoutes([
    { path: "/signin", element: <Signin /> },
    { path: "/signup", element: <Signup /> },
    { path: "/", element: <ProtectedRoute children={<Homepage />} /> },
    { path: "/search", element: <ProtectedRoute children={<Search />} /> },
    {
      path: "/all-products",
      element: <ProtectedRoute children={<AllProducts />} />,
    },
    {
      path: "/product/:id",
      element: <ProtectedRoute children={<ProductPage />} />,
    },
    { path: "/my-cart", element: <ProtectedRoute children={<Cart />} /> },
    // { path: "*", element: <NotFound /> },
  ]);
};
