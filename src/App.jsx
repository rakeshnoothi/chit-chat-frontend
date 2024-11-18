import { createBrowserRouter, RouterProvider } from "react-router-dom";

// page imports.
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthenticationProvider from "./context/AuthenticationProvider";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <PrivateRoute element={<Home />} />,
        },
        {
            path: "login",
            element: <PublicRoute element={<Login />} />,
        },
        {
            path: "register",
            element: <PublicRoute element={<Register />} />,
        },
    ]);
    return (
        <>
            <AuthenticationProvider>
                <RouterProvider router={router} />
                <ToastContainer limit={2} />
            </AuthenticationProvider>
        </>
    );
}

export default App;
