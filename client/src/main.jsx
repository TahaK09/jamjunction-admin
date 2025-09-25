import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";
import * as ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App.jsx";

import Signin from "./pages/Signin.jsx";
import { AuthContextProvider } from "./context/authContext.jsx";
import AuthGuard from "./lib/authGuard.jsx";
import PublicLayout from "./layouts/publicLayout.jsx";
import PrivateLayout from "./layouts/privateLayout.jsx";
import Tickets from "./pages/tickets.jsx";
import Home from "./pages/home.jsx";
import Events from "./pages/events.jsx";
import Validate from "./pages/validationPage.jsx";

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/signin", element: <Signin /> },
      { path: "signup", element: <Navigate to="/signin" replace /> },
    ],
  },
  {
    element: (
      <AuthGuard>
        <PrivateLayout />
      </AuthGuard>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "tickets", element: <Tickets /> },
      { path: "events", element: <Events /> },
      { path: "/validate/:ticketId", element: <Validate /> },
    ],
  },
  { path: "*", element: "404!" },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
