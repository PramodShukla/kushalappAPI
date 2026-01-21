export default function Modal({ open, onClose, children }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-md">
                {children}
                <button onClick={onClose} className="mt-4 text-sm text-red-500">Close</button>
            </div>
        </div>
    );
}
