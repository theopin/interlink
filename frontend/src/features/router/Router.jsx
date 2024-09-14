import { createBrowserRouter } from "react-router-dom";
import Login from "../auth/Login";
import InvalidRoute from "../error/InvalidRoute";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <InvalidRoute />,
    },
  ]);
  