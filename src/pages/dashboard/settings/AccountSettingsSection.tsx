// components/AccountSettingsSection.tsx
import { useState } from "react";

export default function AccountSettingsSection() {
  const [profileImage, setProfileImage] = useState(
    "https://lh3.googleusercontent.com/a/ACg8ocJKll0l8mixK_QikSN8oqCct_UhFGn0y_yNuRV3MS"
  );
  const [name, setName] = useState("The Messenger");
  const [username, setUsername] = useState("themsg001");
  const [email, setEmail] = useState("themsg001@gmail.com");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold">Settings</h1>
        <h2 className="text-xl font-semibold mt-4">Account</h2>
        <p className="text-gray-600">Here, you can update your account information such as your profile picture, name and username.</p>
      </div>

      {/* Picture */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold text-xl">
          {name[0]}
        </div>
        <input
          type="text"
          value={profileImage}
          onChange={(e) => setProfileImage(e.target.value)}
          className="w-full border rounded px-3 py-2 text-sm"
          placeholder="Profile image URL"
        />
      </div>

      {/* Name & Username */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={email}
          disabled
          className="w-full border rounded px-3 py-2 text-sm bg-gray-100"
        />
        <p className="text-green-500 text-sm mt-1">✓ Verified</p>
      </div>
    </div>
  );
}
