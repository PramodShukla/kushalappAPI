export default function Table({ columns, data, actions }) {
    return (
        <div className="overflow-x-auto border rounded-xl">
            <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                <tr>
                    {columns.map((col) => (
                        <th key={col.key} className="text-left p-3 font-medium">
                            {col.label}
                        </th>
                    ))}
                    {actions && <th className="p-3">Actions</th>}
                </tr>
                </thead>

                <tbody>
                {data.map((row, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                        {columns.map((col) => (
                            <td key={col.key} className="p-3">
                                {row[col.key]}
                            </td>
                        ))}

                        {actions && (
                            <td className="p-3 space-x-3">
                                {actions(row)}
                            </td>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
