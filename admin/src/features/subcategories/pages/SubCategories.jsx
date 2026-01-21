import { useEffect, useState } from "react";
import api from "../../../services/apiClient";

import Table from "../../../components/ui/Table";
import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import ConfirmDialog from "../../../components/ui/ConfirmDialog";
import { useToast } from "../../../components/ui/useToast";

export default function SubCategories() {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);

    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [confirm, setConfirm] = useState(null);

    const [form, setForm] = useState({
        name: "",
        category: "",
    });

    const { show, Toast } = useToast();

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        try {
            const [subRes, catRes] = await Promise.all([
                api.get("/subcategories"),
                api.get("/categories"),
            ]);

            setItems(subRes.data.data || []);
            setCategories(catRes.data.data || []);
        } catch {
            show("Failed to load data", "error");
        }
    };

    // ========================
    // SAVE (ADD / EDIT)
    // ========================
    const handleSave = async () => {
        if (!form.name || !form.category) {
            show("All fields required", "error");
            return;
        }

        try {
            if (editing) {
                await api.put(`/subcategories/${editing._id}`, form);

                setItems((prev) =>
                    prev.map((i) =>
                        i._id === editing._id
                            ? { ...i, name: form.name, category: categories.find(c => c._id === form.category) }
                            : i
                    )
                );

                show("Subcategory updated");
            } else {
                const res = await api.post("/subcategories", form);
                setItems((prev) => [...prev, res.data.data || res.data]);
                show("Subcategory added");
            }

            setForm({ name: "", category: "" });
            setEditing(null);
            setOpen(false);
        } catch {
            show("Save failed", "error");
        }
    };

    // ========================
    // DELETE
    // ========================
    const handleDelete = async () => {
        try {
            await api.delete(`/subcategories/${confirm}`);
            setItems((prev) => prev.filter((i) => i._id !== confirm));
            show("Deleted successfully");
        } catch {
            show("Delete failed", "error");
        }
        setConfirm(null);
    };

    // ========================
    // EDIT
    // ========================
    const handleEdit = (row) => {
        setEditing(row);
        setForm({
            name: row.name,
            category: row.categoryId,
        });
        setOpen(true);
    };

    return (
        <div className="space-y-6">
            <Toast />

            <div className="flex justify-between">
                <h1 className="text-xl font-bold">Sub Categories</h1>
                <Button onClick={() => setOpen(true)}>Add SubCategory</Button>
            </div>

            {/* Table */}
            <Table
                columns={[
                    { label: "Name", key: "name" },
                    { label: "Category", key: "categoryName" },
                ]}
                data={items.map((i) => ({
                    _id: i._id,
                    name: i.name,
                    categoryName: i.category?.name || "-",
                    categoryId: i.category?._id,
                }))}
                actions={(row) => (
                    <>
                        <button
                            onClick={() => handleEdit(row)}
                            className="text-blue-600 text-sm"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => setConfirm(row._id)}
                            className="text-red-600 text-sm"
                        >
                            Delete
                        </button>
                    </>
                )}
            />

            {/* Modal */}
            <Modal open={open} onClose={() => setOpen(false)}>
                <h2 className="font-semibold mb-3">
                    {editing ? "Edit" : "Add"} SubCategory
                </h2>

                <Input
                    placeholder="Subcategory name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <div className="mt-3">
                    <Select
                        options={categories}
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                    />
                </div>

                <Button onClick={handleSave} className="mt-4 w-full">
                    {editing ? "Update" : "Save"}
                </Button>
            </Modal>

            <ConfirmDialog
                open={!!confirm}
                title="Delete this subcategory?"
                onClose={() => setConfirm(null)}
                onConfirm={handleDelete}
            />
        </div>
    );
}
