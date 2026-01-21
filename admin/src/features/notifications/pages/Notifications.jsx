import { Card } from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

const notifications = [
    { id: 1, title: "New provider registered", time: "2 min ago" },
    { id: 2, title: "Subscription purchased", time: "1 hour ago" },
    { id: 3, title: "New user joined via referral", time: "Today" },
];

export default function Notifications() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Notifications</h1>
                <Button>Send Notification</Button>
            </div>

            <div className="space-y-4">
                {notifications.map((n) => (
                    <Card key={n.id}>
                        <div className="flex justify-between">
                            <div>
                                <p className="font-medium">{n.title}</p>
                                <p className="text-sm text-gray-500">{n.time}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
