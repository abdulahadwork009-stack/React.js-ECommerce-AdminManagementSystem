import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { validateEmail } from "../../utils/helpers";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({ name: user.name, email: user.email, bio: user.bio || "" });
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = "Name is required.";
    if (!validateEmail(form.email)) err.email = "Enter a valid email.";
    setErrors(err);
    if (Object.keys(err).length) return;
    updateProfile(form);
    setSaved(true);
  };

  const inputClass = "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-700";

  return (
    <div className="max-w-xl">
      <h1 className="mb-4 text-2xl font-bold">Profile</h1>
      <Card>
        {saved && <p className="mb-4 rounded-lg bg-green-100 p-3 text-green-700">Profile updated successfully.</p>}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="mb-1 block text-sm">Name</label>
            <input name="name" value={form.name} onChange={handleChange} className={inputClass} />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm">Email</label>
            <input name="email" value={form.email} onChange={handleChange} className={inputClass} />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm">Role</label>
            <input value={user.role} disabled className={`${inputClass} opacity-60`} />
          </div>
          <div>
            <label className="mb-1 block text-sm">Profile Information</label>
            <textarea name="bio" rows="3" value={form.bio} onChange={handleChange} className={inputClass} />
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
      </Card>
    </div>
  );
}