import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import ControlRoomLayout from "../layouts/ControlRoomLayout";
import DevOpsDashboard from "../components/devops/DevOpsDashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: "", element: <Home /> },
        ],
    },
    {
        path: "/capsule",
        element: <MainLayout />,
        children: [
            { path: "", element: <Home /> },
        ],
    },
    {
        path: "/dashboard",
        element: <ControlRoomLayout />,
        children: [
            { index: true, element: <DevOpsDashboard /> },
        ]
    },
    {
        path: "/capsule/dashboard",
        element: <ControlRoomLayout />,
        children: [
            { index: true, element: <DevOpsDashboard /> },
        ]
    }
]);

export default router;
