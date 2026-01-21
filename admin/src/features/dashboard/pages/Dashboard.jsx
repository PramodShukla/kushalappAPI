import { Users, Briefcase, IndianRupee, Bell, Plus } from "lucide-react";

export default function Dashboard() {
    return (
        <div className="space-y-8">

            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <p className="text-gray-500">Welcome back, Admin 👋</p>
                </div>

                <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg">
                    <Plus size={18} />
                    Add Provider
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Users" value="1,245" icon={<Users />} />
                <StatCard title="Service Providers" value="342" icon={<Briefcase />} />
                <StatCard title="Revenue" value="₹78,450" icon={<IndianRupee />} />
            </div>

            {/* Middle Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Chart Placeholder */}
                <div className="md:col-span-2 bg-white p-6 rounded-xl shadow">
                    <h2 className="font-semibold mb-4">Platform Growth</h2>
                    <div className="h-64 flex items-center justify-center text-gray-400 border border-dashed rounded-lg">
                        📊 Chart will go here
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="font-semibold mb-4 flex items-center gap-2">
                        <Bell size={18} /> Recent Activity
                    </h2>

                    <ul className="space-y-4 text-sm">
                        <li>🧑 New user registered</li>
                        <li>🔧 New provider approved</li>
                        <li>💳 Subscription purchased</li>
                        <li>⭐ New 5-star review received</li>
                    </ul>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="font-semibold mb-4">Quick Overview</h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-xl font-bold">24</p>
                        <p className="text-sm text-gray-500">New Today</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-xl font-bold">18</p>
                        <p className="text-sm text-gray-500">Active Leads</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-xl font-bold">92%</p>
                        <p className="text-sm text-gray-500">Satisfaction</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-xl font-bold">12</p>
                        <p className="text-sm text-gray-500">Pending Reviews</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow flex items-center justify-between">
            <div>
                <p className="text-gray-500 text-sm">{title}</p>
                <p className="text-2xl font-bold mt-1">{value}</p>
            </div>
            <div className="p-3 bg-gray-100 rounded-lg text-gray-700">
                {icon}
            </div>
        </div>
    );
}
