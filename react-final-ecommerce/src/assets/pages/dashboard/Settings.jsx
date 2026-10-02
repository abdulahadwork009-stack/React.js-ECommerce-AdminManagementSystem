import useLocalStorage from "../../hooks/useLocalStorage";
import { useTheme } from "../../context/ThemeContext";
import Card from "../../components/Card";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const [settings, setSettings] = useLocalStorage("settings", {
    notifications: true,
    emailUpdates: false,
    language: "en",
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  return (
    <div className="max-w-xl">
      <h1 className="mb-4 text-2xl font-bold">Settings</h1>
      <Card className="space-y-5">
        <label className="flex items-center justify-between">
          <span>Dark Mode</span>
          <input type="checkbox" checked={theme === "dark"} onChange={toggleTheme} className="h-5 w-5" />
        </label>

        <label className="flex items-center justify-between">
          <span>Notifications</span>
          <input type="checkbox" name="notifications" checked={settings.notifications} onChange={handleChange} className="h-5 w-5" />
        </label>

        <label className="flex items-center justify-between">
          <span>Email updates (account preference)</span>
          <input type="checkbox" name="emailUpdates" checked={settings.emailUpdates} onChange={handleChange} className="h-5 w-5" />
        </label>

        <label className="flex items-center justify-between">
          <span>Language</span>
          <select
            name="language"
            value={settings.language}
            onChange={handleChange}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
          >
            <option value="en">English</option>
            <option value="ur">Urdu</option>
            <option value="ar">Arabic</option>
          </select>
        </label>
      </Card>
    </div>
  );
}