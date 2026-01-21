import { Card } from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

export default function Settings() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Settings</h1>

            {/* Profile */}
            <Card>
                <h2 className="font-semibold mb-4">Admin Profile</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <Input placeholder="Full Name" />
                    <Input placeholder="Email" />
                </div>
                <Button className="mt-4">Save Changes</Button>
            </Card>

            {/* Platform Settings */}
            <Card>
                <h2 className="font-semibold mb-4">Platform Configuration</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <Input placeholder="App Name" />
                    <Input placeholder="Support Email" />
                    <Input placeholder="Referral Bonus Amount" />
                    <Input placeholder="Commission (%)" />
                </div>
                <Button className="mt-4">Update Settings</Button>
            </Card>
        </div>
    );
}
