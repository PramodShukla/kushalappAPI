export default function Select({ options, value, onChange }) {
    return (
        <select
            value={value}
            onChange={onChange}
            className="w-full px-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black bg-white"
        >
            <option value="">Select category</option>
            {options.map((opt) => (
                <option key={opt._id} value={opt._id}>
                    {opt.name}
                </option>
            ))}
        </select>
    );
}
