import { useAuth } from "../../store/auth.store";

export default function Navbar() {
    const { logout } = useAuth();

    return (
        <header className="bg-white border-b p-4 flex justify-between">
            <h1 className="font-semibold">Dashboard</h1>
            <button onClick={logout} className="text-red-500">Logout</button>
        </header>
    );
}
