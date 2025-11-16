import { Navigate } from "react-router";

export function OnlyLoggedUsers({children}) {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return children
}