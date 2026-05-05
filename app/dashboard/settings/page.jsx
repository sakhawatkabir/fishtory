import SettingsPanel from "@/components/dashboard/settings/SettingsPanel";

export const metadata = {
  title: "Settings | Fish Tory Admin",
};

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your store, account, and notification preferences.
        </p>
      </div>
      <SettingsPanel />
    </div>
  );
}

export default SettingsPage