import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const RoleRedirect = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) return; // no user, do nothing

        if (user.role.toLowerCase() === "admin" && window.location.pathname !== "/admin") {
            navigate("/admin", { replace: true });
        }
    }, [user, navigate]);

    return null;
};

export default RoleRedirect;
