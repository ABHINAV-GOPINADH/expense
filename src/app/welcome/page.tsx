'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import {
  UserGroupIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  CogIcon,
  ChartBarIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

export default function WelcomePage() {
  const { user } = useAuth();
  const router = useRouter();

  const getRoleFeatures = (role: string) => {
    switch (role) {
      case 'admin':
        return [
          {
            icon: UserGroupIcon,
            title: 'User Management',
            description: 'Create and manage employees, managers, and their roles',
            action: 'Manage Users',
            href: '/users',
          },
          {
            icon: CogIcon,
            title: 'System Settings',
            description: 'Configure approval rules, flows, and company settings',
            action: 'Configure Settings',
            href: '/settings',
          },
          {
            icon: ChartBarIcon,
            title: 'Analytics & Reports',
            description: 'View comprehensive expense reports and analytics',
            action: 'View Reports',
            href: '/reports',
          },
          {
            icon: CheckCircleIcon,
            title: 'Override Approvals',
            description: 'Approve or reject any expense in the system',
            action: 'Review Approvals',
            href: '/approvals',
          },
        ];
      case 'manager':
        return [
          {
            icon: CheckCircleIcon,
            title: 'Approve Expenses',
            description: 'Review and approve expense claims from your team',
            action: 'Review Pending',
            href: '/approvals',
          },
          {
            icon: UserGroupIcon,
            title: 'Team Management',
            description: 'View and manage expenses from your team members',
            action: 'View Team',
            href: '/team-expenses',
          },
          {
            icon: DocumentTextIcon,
            title: 'Submit Expenses',
            description: 'Create and submit your own expense claims',
            action: 'Submit Expense',
            href: '/expenses/new',
          },
          {
            icon: ChartBarIcon,
            title: 'Team Reports',
            description: 'View reports and analytics for your team',
            action: 'View Reports',
            href: '/reports',
          },
        ];
      case 'employee':
        return [
          {
            icon: DocumentTextIcon,
            title: 'Submit Expenses',
            description: 'Create and submit expense claims with receipt upload',
            action: 'Submit Expense',
            href: '/expenses/new',
          },
          {
            icon: CheckCircleIcon,
            title: 'Track Status',
            description: 'Monitor the approval status of your submitted expenses',
            action: 'View My Expenses',
            href: '/expenses',
          },
          {
            icon: ChartBarIcon,
            title: 'View History',
            description: 'Access your complete expense history and reports',
            action: 'View History',
            href: '/expenses',
          },
        ];
      default:
        return [];
    }
  };

  const features = getRoleFeatures(user?.role || '');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Expense, {user?.name}!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            You're logged in as a <span className="font-semibold text-indigo-600 capitalize">{user?.role}</span>
          </p>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            Expense streamlines your expense reimbursement process with intelligent approval workflows, 
            OCR receipt scanning, and comprehensive reporting. Here's what you can do:
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-4">
                <feature.icon className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {feature.description}
              </p>
              <button
                onClick={() => router.push(feature.href)}
                className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
              >
                {feature.action}
                <ArrowRightIcon className="ml-1 h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Start Guide</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">For Employees</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Click "Submit Expense" to create a new expense claim</li>
                <li>Upload your receipt or use OCR scanning for automatic data extraction</li>
                <li>Fill in the expense details and submit for approval</li>
                <li>Track your expense status in "My Expenses"</li>
              </ol>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">For Managers</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Review pending approvals in "Pending Approvals"</li>
                <li>Approve or reject expenses with comments</li>
                <li>Monitor team expenses in "Team Expenses"</li>
                <li>Submit your own expenses as needed</li>
              </ol>
            </div>
          </div>

          {user?.role === 'admin' && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">For Administrators</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Create users and assign roles in "User Management"</li>
                <li>Configure approval rules and flows in "Settings"</li>
                <li>Set up company settings and currency preferences</li>
                <li>Monitor system-wide reports and analytics</li>
              </ol>
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => {
              localStorage.setItem('hasSeenWelcome', 'true');
              router.push('/dashboard');
            }}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Go to Dashboard
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </button>
        </div>

        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Demo Features</h3>
          <p className="text-blue-800 mb-4">
            This is a demo application. You can switch between different user roles using the role switcher 
            in the top-right corner to experience different user perspectives.
          </p>
          <div className="text-sm text-blue-700">
            <p><strong>Available Demo Users:</strong></p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>👑 Admin: admin@company.com</li>
              <li>👥 Manager: jane@company.com</li>
              <li>👤 Employee: mike@company.com</li>
              <li>👤 Employee: sarah@company.com</li>
            </ul>
            <p className="mt-2">All demo users use the password: <strong>password</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}
