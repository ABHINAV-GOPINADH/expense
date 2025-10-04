"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { BellIcon, MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const { user, company, logout } = useAuth();
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);

  const switchRole = (email: string) => {
    // In a real app, this would make an API call to switch user context
    // For demo purposes, we'll just reload with the new user
    window.location.href = `/login?email=${email}`;
  };

  const demoUsers = [
    { email: "admin@company.com", name: "John Admin", role: "admin" },
    { email: "jane@company.com", name: "Jane Manager", role: "manager" },
    { email: "mike@company.com", name: "Mike Employee", role: "employee" },
    { email: "sarah@company.com", name: "Sarah Employee", role: "employee" },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-semibold text-gray-900">Welcome back, {user?.name}</h2>
          {company && (
            <span className="px-3 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded-full">
              {company.name} ({company.currency})
            </span>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-500">
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>

          <button className="p-2 text-gray-400 hover:text-gray-500 relative">
            <BellIcon className="h-5 w-5" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
          </button>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>

            {/* Role Switcher for Demo */}
            <div className="relative">
              <button
                onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
                className="p-2 text-gray-400 hover:text-gray-500"
                title="Switch Role (Demo)"
              >
                <UserCircleIcon className="h-5 w-5" />
              </button>

              {showRoleSwitcher && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                  <div className="py-1">
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b">
                      Switch Role (Demo)
                    </div>
                    {demoUsers.map((demoUser) => (
                      <button
                        key={demoUser.email}
                        onClick={() => switchRole(demoUser.email)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                          user?.email === demoUser.email ? "bg-indigo-50 text-indigo-700" : "text-gray-700"
                        }`}
                      >
                        <div className="font-medium">{demoUser.name}</div>
                        <div className="text-xs text-gray-500 capitalize">{demoUser.role}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

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
