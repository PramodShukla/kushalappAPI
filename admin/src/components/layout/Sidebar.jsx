import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Users,
    Briefcase,
    CreditCard,
    Gift,
    Bell,
    Settings
} from "lucide-react";
import clsx from "clsx";

const menu = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Users", path: "/users", icon: Users },
    { name: "Providers", path: "/providers", icon: Briefcase },
    { name: "Sub Category", path: "/subcategories", icon: CreditCard },
    { name: "Category", path: "/categories", icon: Gift },
    { name: "Notifications", path: "/notifications", icon: Bell },
    { name: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar() {
    return (
        <aside className="w-64 bg-white border-r h-screen sticky top-0">
            <div className="p-6 font-bold text-xl">LOGIXHUNT Admin</div>

            <nav className="px-3 space-y-1">
                {menu.map((item, i) => (
                    <NavLink key={i} to={item.path}>
                        {({ isActive }) => (
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className={clsx(
                                    "flex items-center gap-3 px-4 py-2 rounded-xl text-sm cursor-pointer",
                                    isActive
                                        ? "bg-black text-white"
                                        : "text-gray-600 hover:bg-gray-100"
                                )}
                            >
                                <item.icon size={18} />
                                {item.name}
                            </motion.div>
                        )}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}
