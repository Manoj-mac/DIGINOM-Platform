import { Navigate } from "react-router-dom";

function ProtectedRoute({

    children,

    allowedRoles

}) {
    const role =
        localStorage
            .getItem("role")
            ?.toUpperCase();

    if (
        !allowedRoles.includes(
            role
        )
    ) {

        return (
            <Navigate
                to="/login"
            />
        );
    }

    return children;
}

export default ProtectedRoute;