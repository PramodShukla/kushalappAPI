import { useEffect, useState } from "react";
import api from "../../../services/apiClient";

import Table from "../../../components/ui/Table";
import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [editing, setEditing] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    // ========================
    // FETCH
    // ========================
    const fetchCategories = async () => {
        try {
            setLoading(true);
            const res = await api.get("/categories");
            setCategories(res.data.data || []);
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    // ========================
    // ADD + UPDATE
    // ========================
    const handleSave = async () => {
        if (!value.trim()) return;

        try {
            if (editing) {
                // UPDATE
                await api.put(`/categories/${editing._id}`, { name: value });

                setCategories((prev) =>
                    prev.map((c) =>
                        c._id === editing._id ? { ...c, name: value } : c
                    )
                );
            } else {
                // CREATE
                const res = await api.post("/categories", { name: value });
                const newItem = res.data.data || res.data;
                setCategories((prev) => [...prev, newItem]);
            }

            setValue("");
            setEditing(null);
            setOpen(false);
        } catch (err) {
            console.error("Save error:", err);
        }
    };

    // ========================
    // DELETE
    // ========================
    const deleteCategory = async (id) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;

        try {
            await api.delete(`/categories/${id}`);
            setCategories((prev) => prev.filter((c) => c._id !== id));
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    // ========================
    // EDIT HANDLER
    // ========================
    const handleEdit = (row) => {
        setEditing(row);
        setValue(row.name);
        setOpen(true);
    };

    // ========================
    // LOADING SKELETON
    // ========================
    if (loading) {
        return (
            <div className="space-y-6">
                <div className="h-6 bg-gray-200 rounded w-40 animate-pulse" />
                <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="h-12 bg-gray-100 rounded-xl animate-pulse"
                        />
                    ))}
                </div>
            </div>
        );
    }

    // ========================
    // UI
    // ========================
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">Categories</h1>
                <Button onClick={() => setOpen(true)}>Add Category</Button>
            </div>

            {/* Table */}
            <Table
                columns={[
                    { label: "Name", key: "name" },
                    { label: "Sub Categories", key: "subCategories" },
                    { label: "Providers", key: "providers" },
                ]}
                data={categories.map((item) => ({
                    _id: item._id, // hidden but used internally
                    name: item.name,
                    subCategories: item.subCategoryCount || 0,
                    providers: item.providerCount || 0,
                }))}
                actions={(row) => (
                    <div className="space-x-3">
                        <button
                            onClick={() => handleEdit(row)}
                            className="text-blue-600 text-sm"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => deleteCategory(row._id)}
                            className="text-red-500 text-sm"
                        >
                            Delete
                        </button>
                    </div>
                )}
            />

            {/* Modal */}
            <Modal
                open={open}
                onClose={() => {
                    setOpen(false);
                    setEditing(null);
                    setValue("");
                }}
            >
                <h2 className="font-semibold mb-3">
                    {editing ? "Edit Category" : "Add Category"}
                </h2>

                <Input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Category name"
                />

                <Button onClick={handleSave} className="mt-4 w-full">
                    {editing ? "Update" : "Save"}
                </Button>
            </Modal>
        </div>
    );
}
