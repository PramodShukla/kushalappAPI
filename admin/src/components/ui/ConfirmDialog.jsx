export default function ConfirmDialog({ open, onClose, onConfirm, title }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-sm">
                <h2 className="font-semibold text-lg mb-3">{title}</h2>

                <div className="flex justify-end gap-3 mt-6">
                    <button onClick={onClose} className="text-sm text-gray-600">
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
