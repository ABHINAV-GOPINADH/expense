"use client";

import React, { useEffect } from "react";
import { format } from "date-fns";
import Layout from "@/components/Layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import {
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  CurrencyDollarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const stats = [
  {
    name: "Total Expenses",
    value: "$12,345",
    change: "+12%",
    changeType: "positive",
    icon: DocumentTextIcon,
  },
  {
    name: "Pending Approvals",
    value: "8",
    change: "+2",
    changeType: "neutral",
    icon: ClockIcon,
  },
  {
    name: "Approved This Month",
    value: "$8,234",
    change: "+18%",
    changeType: "positive",
    icon: CheckCircleIcon,
  },
  {
    name: "Rejected This Month",
    value: "3",
    change: "-1",
    changeType: "negative",
    icon: XCircleIcon,
  },
];

const recentExpenses = [
  {
    id: "1",
    description: "Client Dinner",
    amount: 125.5,
    currency: "USD",
    status: "approved",
    date: "2024-01-15",
  },
  {
    id: "2",
    description: "Taxi to Airport",
    amount: 45.0,
    currency: "USD",
    status: "pending",
    date: "2024-01-14",
  },
  {
    id: "3",
    description: "Office Supplies",
    amount: 89.99,
    currency: "USD",
    status: "rejected",
    date: "2024-01-13",
  },
];

export default function DashboardPage() {
  const { userProfile } = useAuth(); // <-- use userProfile here
  const router = useRouter();

  useEffect(() => {
    if (!userProfile) return; // wait for userProfile to load

    if (userProfile.role === "manager") router.replace("/approvals");
    if (userProfile.role === "employee") router.replace("/expenses");
  }, [userProfile, router]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Welcome back! Here's what's happening with your expenses.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
            >
              <dt>
                <div className="absolute bg-indigo-500 rounded-md p-3">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <p className="ml-16 text-sm font-medium text-gray-500 truncate">{stat.name}</p>
              </dt>
              <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                <p
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : stat.changeType === "negative"
                      ? "text-red-600"
                      : "text-gray-500"
                  }`}
                >
                  {stat.change}
                </p>
              </dd>
            </div>
          ))}
        </div>

        {/* Recent Expenses */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Expenses</h3>
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {recentExpenses.map((expense) => (
                  <li key={expense.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <CurrencyDollarIcon className="h-8 w-8 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{expense.description}</p>
                        <p className="text-sm text-gray-500">{format(new Date(expense.date), "dd/MM/yyyy")}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">${expense.amount}</span>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            expense.status
                          )}`}
                        >
                          {expense.status}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
