"use client";

import { User, Building2, Bell, Shield, CreditCard } from "lucide-react";

const settingsSections = [
  {
    icon: User,
    title: "Profile",
    description: "Personal information and preferences",
  },
  {
    icon: Building2,
    title: "Business Details",
    description: "Company information and registration",
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Email and push notification settings",
  },
  {
    icon: Shield,
    title: "Security",
    description: "Password and two-factor authentication",
  },
  {
    icon: CreditCard,
    title: "Subscription",
    description: "Manage your plan and billing",
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-ink">Settings</h1>
        <p className="text-muted text-sm mt-1">
          Manage your account and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {settingsSections.map((section, index) => (
          <button
            key={section.title}
            className="flex items-center gap-4 p-5 bg-surface rounded-xl border border-slate-dark hover:border-teal/30 hover:shadow-md transition-all duration-200 text-left"
          >
            <div className="w-12 h-12 bg-slate rounded-xl flex items-center justify-center">
              <section.icon className="w-6 h-6 text-ink" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-sm text-ink">
                {section.title}
              </h3>
              <p className="text-xs text-muted mt-0.5">{section.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
