import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../auth/Login";
import ErrorPage from "../error/ErrorPage";
import Sidebar from "../../components/sidebar/Sidebar";

const isTokenValid = () => {
  const refreshToken = sessionStorage.getItem("refreshToken");
  if (!refreshToken) return false;

  const tokenData = JSON.parse(atob(refreshToken.split(".")[1])); // Decodes the JWT
  const currentTime = Math.floor(Date.now() / 1000);

  return tokenData.exp > currentTime;  // Check if the token is expired
};



export const AppRouter = createBrowserRouter([
    {
      path: "/welcome",
      element: isTokenValid() ? <Navigate to="/" replace /> : <Login />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/",
      element: !isTokenValid() ? <Navigate to="/welcome" replace /> : <Sidebar />,
      errorElement: <ErrorPage />,
    },
  ]);
  