import { useAuth } from "../../../store/auth.store";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        login("demo-token");     // save token
        navigate("/");           // redirect to dashboard
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow w-96">
                <h2 className="text-xl font-bold mb-6">Admin Login</h2>

                <button
                    onClick={handleLogin}
                    className="bg-black text-white w-full p-2 rounded"
                >
                    Login
                </button>
            </div>
        </div>
    );
}
