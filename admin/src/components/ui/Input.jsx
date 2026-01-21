export default function Input(props) {
    return (
        <input
            {...props}
            className="w-full px-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
    );
}
