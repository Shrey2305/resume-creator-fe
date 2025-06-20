import { useState } from "react";

export default function SecuritySettingsSection() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");

  const handleEnable2FA = () => {
    setIs2FAEnabled(true);
    // You could add backend logic here
  };


  const handleDelete = () => {
    // Implement your deletion logic here (API call etc.)
    alert("Account deleted!");
  };

  return (
    <div className="space-y-6 my-4">
      {/* Heading */}
      <div>
        <h2 className="text-4xl font-bold">Security</h2>
        <p className="text-gray-600 mt-1">
          In this section, you can change your password and enable/disable two-factor authentication.
        </p>
      </div>

      {/* Password Section */}
      <div>
        <h3 className="font-semibold text-lg mb-4">Password</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="Enter current password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="Enter new password"
            />
          </div>
        </div>
      </div>

      {/* 2FA Section */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Two-Factor Authentication</h3>
        {!is2FAEnabled ? (
          <div>
            <p className="text-sm text-gray-700">
              <strong>Two-factor authentication is currently disabled.</strong> You can enable it by adding an
              authenticator app to your account.
            </p>
            <button
              onClick={handleEnable2FA}
              className="mt-4 px-4 py-2 text-sm rounded border border-gray-300 hover:bg-gray-100 transition"
            >
              Enable 2FA
            </button>
          </div>
        ) : (
          <div>
            <p className="text-sm text-green-600">
              <strong>Two-factor authentication is enabled.</strong>
            </p>
          </div>
        )}
      </div>

      <div className="space-y-6">
      {/* Heading */}
      <div>
        <h2 className="text-2xl font-bold text-red-600">Danger Zone</h2>
        <p className="text-gray-700 mt-1">
          In this section, you can delete your account and all the data associated to your user, but please keep in mind
          that <strong>this action is irreversible.</strong>
        </p>
      </div>

      {/* Delete Confirmation */}
      <div>
        <label className="block text-sm font-medium mb-2">Delete Account</label>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <input
            type="text"
            placeholder="delete"
            value={confirmationText}
            onChange={(e) => setConfirmationText(e.target.value)}
            className="w-full sm:w-64 border border-gray-300 rounded px-3 py-2 text-sm"
          />
          <button
            onClick={handleDelete}
            disabled={confirmationText !== "delete"}
            className={`px-5 py-2 text-sm font-semibold rounded transition 
              ${
                confirmationText === "delete"
                  ? "bg-red-400 text-white hover:bg-red-500"
                  : "bg-red-200 text-white cursor-not-allowed"
              }`}
          >
            Delete Account
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Type <code className="font-semibold">delete</code> to confirm deleting your account.
        </p>
      </div>
    </div>
    </div>
  );
}
