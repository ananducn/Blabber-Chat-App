import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, CalendarDays, ShieldCheck } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageupload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();

    reader.onload = () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);

      updateProfile({ profilePic: base64Image });
    };

    reader.readAsDataURL(file);

    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="w-full max-w-lg bg-base-100 rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-base-content">
          Your Profile Information
        </h1>

        {/* Profile Photo Section */}
        <div className="text-center">
          <div className="relative w-28 h-28 mx-auto">
            <img
              src={
                authUser?.profilePic?.url ||
                authUser?.profilePic ||
                "/avatar.png"
              }
              alt="Profile"
              onError={(e) => (e.target.src = "/avatar.png")}
              className="w-full h-full object-cover rounded-full border-4 border-primary"
            />
            <label className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1 cursor-pointer hover:scale-105 transition">
              <Camera size={16} />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageupload}
              />
            </label>
          </div>
          <p className="text-sm mt-2 text-neutral-content">
            {isUpdatingProfile
              ? "Updating profile photo..."
              : "Click the camera icon to change profile photo"}
          </p>
        </div>

        {/* Profile Form (Read-only) */}
        <form className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              value={(authUser?.fullName || "").toUpperCase()}
              className="input input-bordered w-full"
              readOnly
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              value={authUser?.email || ""}
              type="text"
              className="input input-bordered w-full"
              readOnly
            />
          </div>
        </form>

        {/* Info Stats */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-sm text-neutral-content gap-2">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-primary" />
            <span>
              Joined on{" "}
              <span className="font-semibold text-base-content">
                {new Date(authUser?.createdAt).toLocaleDateString()}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            <span>
              Account status:{" "}
              <span
                className={`font-semibold ${
                  authUser ? "text-green-500" : "text-gray-400"
                }`}
              >
                {authUser ? "Active" : "Inactive"}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
