const users = [
    { id: 1, name: "Rahul Sharma", email: "rahul@gmail.com", role: "User" },
    { id: 2, name: "Amit Verma", email: "amit@gmail.com", role: "Provider" },
];

export default function UsersList() {
    return (
        <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold">Users</h2>
                <input
                    placeholder="Search users..."
                    className="border px-3 py-2 rounded-lg text-sm"
                />
            </div>

            <table className="w-full text-sm">
                <thead>
                <tr className="text-left border-b">
                    <th className="py-2">Name</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody>
                {users.map((u) => (
                    <tr key={u.id} className="border-b hover:bg-gray-50">
                        <td className="py-2">{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.role}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
