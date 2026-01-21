import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth.store";

export default function ProtectedRoute({ children }) {
    const { token } = useAuth();
    return token ? children : <Navigate to="/login" />;
}
