import { createBrowserRouter } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

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
        element: (
            <>
                <SignedIn>
                    <ControlRoomLayout />
                </SignedIn>
                <SignedOut>
                    <RedirectToSignIn />
                </SignedOut>
            </>
        ),
        children: [
            { index: true, element: <DevOpsDashboard /> },
        ]
    },
    {
        path: "/capsule/dashboard",
        element: (
            <>
                <SignedIn>
                    <ControlRoomLayout />
                </SignedIn>
                <SignedOut>
                    <RedirectToSignIn />
                </SignedOut>
            </>
        ),
        children: [
            { index: true, element: <DevOpsDashboard /> },
        ]
    }
]);

export default router;
