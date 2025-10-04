"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  HomeIcon,
  DocumentTextIcon,
  UserGroupIcon,
  CogIcon,
  ChartBarIcon,
  ReceiptRefundIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Approvals", href: "/approvals", icon: CheckCircleIcon },
  { name: "Users", href: "/users", icon: UserGroupIcon },
];

const employeeNavigation = [
  { name: "My Expenses", href: "/expenses", icon: DocumentTextIcon },
  { name: "Submit Expense", href: "/expenses/new", icon: ReceiptRefundIcon },
];

const managerNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Pending Approvals", href: "/approvals", icon: CheckCircleIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { userProfile } = useAuth();

  const getNavigationItems = () => {
    if (!userProfile) return [];

    switch (userProfile.role) {
      case "admin":
        return navigation;
      case "manager":
        return managerNavigation;
      case "employee":
        return employeeNavigation;
      default:
        return [];
    }
  };

  const navItems = getNavigationItems();

  return (
    <div className="flex flex-col w-64 bg-gray-900 text-white">
      <div className="flex items-center h-16 px-4 bg-gray-800">
        <h1 className="text-xl font-bold">Expense</h1>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center">
              <span className="text-sm font-medium">{userProfile?.name?.charAt(0).toUpperCase()}</span>
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">{userProfile?.name}</p>
            <p className="text-xs text-gray-400 capitalize">{userProfile?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
