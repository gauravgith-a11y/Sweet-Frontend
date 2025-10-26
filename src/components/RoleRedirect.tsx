import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const RoleRedirect = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!user) return; // not logged in, no redirect

        // Prevent unnecessary redirects if already on correct page
        if (user.role.toLowerCase() === "admin" && location.pathname.startsWith("/admin")) {
            return;
        }
        if (user.role.toLowerCase() !== "admin" && location.pathname === "/") {
            return;
        }

        // Redirect based on role
        if (user.role.toLowerCase() === "admin") {
            navigate("/admin", { replace: true });
        } else {
            navigate("/", { replace: true });
        }
    }, [user, navigate, location.pathname]);

    return null;
};

export default RoleRedirect;
