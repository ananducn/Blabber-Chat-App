import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isSigningUp, signUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return toast.error("Please enter a valid email address");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters long");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success) {
      signUp(formData);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen font-sans bg-base-200 text-base-content">
      {/* Left side - Registration form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md p-8 bg-base-100 rounded-xl shadow-lg">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-center">
            Create Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <input
                value={formData.fullName}
                type="text"
                placeholder="John Doe"
                className="input input-bordered w-full"
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                value={formData.email}
                type="email"
                placeholder="you@example.com"
                className="input input-bordered w-full"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <input
                  value={formData.password}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="input input-bordered w-full pr-12"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/60"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSigningUp}
            >
              {isSigningUp ? "Loading..." : "Register"}
            </button>

            {/* Redirect to Login */}
            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <Link to="/login" className="link link-success">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right side - Welcome message (only on large screens) */}
      <div className="hidden lg:flex w-1/2 items-center justify-center p-12">
        <div className="text-center max-w-md">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Welcome to Our Community
          </h1>
          <p className="text-lg opacity-80">
            Be a part of something amazing. Register now and get access to
            exclusive features.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
