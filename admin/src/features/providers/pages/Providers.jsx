import { useEffect, useState } from "react";
import api from "../../../services/apiClient";

import Table from "../../../components/ui/Table";
import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import ConfirmDialog from "../../../components/ui/ConfirmDialog";
import { useToast } from "../../../components/ui/useToast";

export default function Providers() {
    const { show, Toast } = useToast();

    const [providers, setProviders] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);

    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [confirm, setConfirm] = useState(null);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        experience: 0,

        address: {
            fullAddress: "",
            city: "",
            pincode: "",
        },

        location: {
            lng: "",
            lat: "",
        },

        documents: {
            aadhaar: "",
            pan: "",
        },

        services: {
            category: "",
            subCategories: [],
        },
    });

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        try {
            const [prov, cats, subs] = await Promise.all([
                api.get("/providers"),
                api.get("/categories"),
                api.get("/subcategories"),
            ]);

            setProviders(prov.data.data || []);
            setCategories(cats.data.data || []);
            setSubcategories(subs.data.data || []);
        } catch {
            show("Failed to load data", "error");
        }
    };

    // =======================
    // SAVE PROVIDER
    // =======================
    const handleSave = async () => {
        try {
            const payload = {
                ...form,
                location: {
                    type: "Point",
                    coordinates: [
                        Number(form.location.lng),
                        Number(form.location.lat),
                    ],
                },
                services: [
                    {
                        category: form.services.category,
                        subCategories: form.services.subCategories,
                    },
                ],
            };

            if (editing) {
                await api.put(`/providers/${editing._id}`, payload);
                show("Provider updated");
            } else {
                await api.post("/providers", payload);
                show("Provider added");
            }

            fetchAll();
            setOpen(false);
            setEditing(null);
        } catch (err) {
            console.error(err);
            show("Save failed", "error");
        }
    };

    // =======================
    // DELETE
    // =======================
    const handleDelete = async () => {
        try {
            await api.delete(`/providers/${confirm}`);
            setProviders((prev) => prev.filter((p) => p._id !== confirm));
            show("Deleted successfully");
        } catch {
            show("Delete failed", "error");
        }
        setConfirm(null);
    };

    return (
        <div className="space-y-6">
            <Toast />

            <div className="flex justify-between">
                <h1 className="text-xl font-bold">Providers</h1>
                <Button onClick={() => setOpen(true)}>Add Provider</Button>
            </div>

            {/* TABLE */}
            <Table
                columns={[
                    { label: "Name", key: "name" },
                    { label: "City", key: "city" },
                    { label: "Experience", key: "experience" },
                    { label: "Rating", key: "rating" },
                ]}
                data={providers.map((p) => ({
                    _id: p._id,
                    name: p.name,
                    city: p.address?.city,
                    experience: p.experience,
                    rating: p.rating || 0,
                }))}
                actions={(row) => (
                    <>
                        <button onClick={() => { setEditing(row); setOpen(true); }} className="text-blue-600 text-sm">Edit</button>
                        <button onClick={() => setConfirm(row._id)} className="text-red-600 text-sm">Delete</button>
                    </>
                )}
            />

            {/* MODAL FORM */}
            <Modal open={open} onClose={() => setOpen(false)}>
                <h2 className="font-semibold mb-4">
                    {editing ? "Edit Provider" : "Add Provider"}
                </h2>

                {/* BASIC */}
                <Input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} />
                <Input placeholder="Email" className="mt-2" onChange={e => setForm({...form, email: e.target.value})} />
                <Input placeholder="Phone" className="mt-2" onChange={e => setForm({...form, phone: e.target.value})} />
                <Input placeholder="Experience (years)" type="number" className="mt-2" onChange={e => setForm({...form, experience: e.target.value})} />

                {/* ADDRESS */}
                <Input placeholder="Full Address" className="mt-2" onChange={e => setForm({...form, address: {...form.address, fullAddress: e.target.value}})} />
                <Input placeholder="City" className="mt-2" onChange={e => setForm({...form, address: {...form.address, city: e.target.value}})} />
                <Input placeholder="Pincode" className="mt-2" onChange={e => setForm({...form, address: {...form.address, pincode: e.target.value}})} />

                {/* DOCUMENTS */}
                <Input placeholder="Aadhaar" className="mt-2" onChange={e => setForm({...form, documents: {...form.documents, aadhaar: e.target.value}})} />
                <Input placeholder="PAN" className="mt-2" onChange={e => setForm({...form, documents: {...form.documents, pan: e.target.value}})} />

                {/* LOCATION */}
                <Input placeholder="Longitude" className="mt-2" onChange={e => setForm({...form, location: {...form.location, lng: e.target.value}})} />
                <Input placeholder="Latitude" className="mt-2" onChange={e => setForm({...form, location: {...form.location, lat: e.target.value}})} />

                {/* SERVICES */}
                <Select
                    options={categories}
                    value={form.services.category}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            services: { ...form.services, category: e.target.value },
                        })
                    }
                />

                <Button onClick={handleSave} className="mt-4 w-full">
                    Save Provider
                </Button>
            </Modal>

            <ConfirmDialog
                open={!!confirm}
                title="Delete this provider?"
                onClose={() => setConfirm(null)}
                onConfirm={handleDelete}
            />
        </div>
    );
}
