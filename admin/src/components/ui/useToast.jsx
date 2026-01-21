import { useState } from "react";

export function useToast() {
    const [toast, setToast] = useState(null);

    const show = (message, type = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const Toast = () =>
        toast ? (
            <div
                className={`fixed bottom-5 right-5 px-4 py-2 rounded-xl text-sm shadow text-white
        ${toast.type === "error" ? "bg-red-600" : "bg-black"}`}
            >
                {toast.message}
            </div>
        ) : null;

    return { show, Toast };
}
