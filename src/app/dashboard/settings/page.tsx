'use client'

import { SettingsForm } from "./setting-form";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

interface Settings {
    theme: string;
    notifications: boolean;
    user: string;
    password: string;
    confirmPass: string;
}

export default function Settings() {
    const { data: session } = useSession();
    const { register, handleSubmit, setValue } = useForm<Settings>();
    const [settings, setSettings] = useState<Settings>({
        theme: "light",
        notifications: true,
        user: "",
        password: "",
        confirmPass: "",
    });

    useEffect(() => {
        if (session?.user?.email) {
            fetch(`/api/get-settings?user=${session.user?.email}`)
                .then(response => response.json())
                .then(data => {
                    setSettings(data);
                    setValue("theme", data.theme);
                    setValue("notifications", data.notifications);
                });
        }
    }, [session, setValue]);

    const handleSettingsChange = (newSettings: Settings) => {
        setSettings(newSettings);
        fetch('/api/update-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: session?.user?.email, settings: newSettings }),
        }).then(response => {
            if (response.ok) {
                console.log('User updated successfully');
            } else {
                console.error('Failed to update user');
            }
        });
    };

    const onSubmit = (data: Settings) => {
        handleSettingsChange(data);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit(onSubmit)}>
                <SettingsForm settings={settings} register={register} />
                <button type="submit">Save Settings</button>
            </form>
        </div>
    );
}
