import { Routes, Route } from "react-router-dom";
import Dashboard from "../features/dashboard/pages/Dashboard";
import UsersList from "../features/users/pages/UsersList";
import Login from "../features/auth/pages/Login";
import Settings from "../features/settings/pages/Settings";
import Notifications from "../features/notifications/pages/Notifications";
import Categories from "../features/categories/pages/Categories";
import SubCategories from "../features/subcategories/pages/SubCategories";
import Providers from "../features/providers/pages/Providers";
import AdminLayout from "../components/layout/AdminLayout";
import ProtectedRoute from "./protected-route";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/" element={
                <ProtectedRoute>
                    <AdminLayout><Dashboard /></AdminLayout>
                </ProtectedRoute>
            } />

            <Route path="/users" element={
                <ProtectedRoute>
                    <AdminLayout><UsersList /></AdminLayout>
                </ProtectedRoute>
            } />

            <Route path="/settings" element={<ProtectedRoute><AdminLayout><Settings /></AdminLayout></ProtectedRoute>} />

            <Route path="/notifications" element={<ProtectedRoute><AdminLayout><Notifications /></AdminLayout></ProtectedRoute>} />

            <Route path="/categories" element={<ProtectedRoute><AdminLayout><Categories /></AdminLayout></ProtectedRoute>} />
            <Route path="/subcategories" element={<ProtectedRoute><AdminLayout><SubCategories /></AdminLayout></ProtectedRoute>} />
            <Route path="/providers" element={<ProtectedRoute><AdminLayout><Providers /></AdminLayout></ProtectedRoute>} />

        </Routes>
    );
}
