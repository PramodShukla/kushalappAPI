import clsx from "clsx";

export default function Button({ children, className, ...props }) {
    return (
        <button
            {...props}
            className={clsx(
                "px-4 py-2 rounded-xl bg-black text-white text-sm hover:opacity-90 transition",
                className
            )}
        >
            {children}
        </button>
    );
}
