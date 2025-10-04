"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const { userProfile, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-semibold text-gray-900">Welcome back, {userProfile?.name || "User"}</h2>
          {userProfile && (
            <span className="px-3 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded-full">
              {userProfile.country} ({userProfile.currency})
            </span>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{userProfile?.name || "User"}</p>
              <p className="text-xs text-gray-500 capitalize">{userProfile?.role || "role"}</p>
            </div>

            <UserCircleIcon className="h-8 w-8 text-gray-400" />

            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
