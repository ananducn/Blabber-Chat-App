import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Settings, User, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { authUser, logout } = useAuthStore();

  return (
    <div className="navbar bg-base-300 shadow-md fixed top-0 left-0 w-full z-50 px-4 sm:px-6">
      {/* Left - Logo */}
      <div className="flex-1">
        <Link
          to="/"
          className="flex items-center gap-2 text-base-content hover:text-primary transition"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="text-xl font-bold tracking-wide">Blabber</span>
        </Link>
      </div>

      {/* Right - Icons */}
      <div className="flex-none gap-4">
        {/* Settings icon (always visible) */}
        <button className="btn btn-ghost btn-circle text-base-content hover:text-primary">
          <Link to="/settings">
            <Settings className="w-5 h-5" />
          </Link>
        </button>

        {/* Show only when user is logged in */}
        {authUser && (
          <>
            <Link
              to="/profile"
              className="btn btn-ghost btn-circle text-base-content hover:text-primary"
            >
              <User className="w-5 h-5" />
            </Link>
            <button
              onClick={logout}
              className="btn btn-primary btn-sm text-white gap-2 px-3"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
