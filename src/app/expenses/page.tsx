'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';

// Mock data - in real app, this would come from your backend
const mockExpenses = [
  {
    id: '1',
    description: 'Client Dinner',
    amount: 125.50,
    currency: 'USD',
    category: 'Meals & Entertainment',
    status: 'approved',
    date: '2024-01-15',
    approver: 'John Manager',
    comment: 'Approved for client meeting',
    employeeId: '1', // Assuming user 1 is the employee
  },
  {
    id: '2',
    description: 'Taxi to Airport',
    amount: 45.00,
    currency: 'USD',
    category: 'Transportation',
    status: 'pending',
    date: '2024-01-14',
    approver: 'Jane Manager',
    comment: '',
    employeeId: '2', // Assuming user 2 is the employee
  },
  {
    id: '3',
    description: 'Office Supplies',
    amount: 89.99,
    currency: 'USD',
    category: 'Office Supplies',
    status: 'rejected',
    date: '2024-01-13',
    approver: 'John Manager',
    comment: 'Not within budget guidelines',
    employeeId: '1', // Assuming user 1 is the employee
  },
  {
    id: '4',
    description: 'Hotel Stay',
    amount: 250.00,
    currency: 'USD',
    category: 'Accommodation',
    status: 'approved',
    date: '2024-01-12',
    approver: 'Jane Manager',
    comment: 'Business trip approved',
    employeeId: '2', // Assuming user 2 is the employee
  },
  {
    id: '5',
    description: 'Team Lunch',
    amount: 75.30,
    currency: 'USD',
    category: 'Meals & Entertainment',
    status: 'pending',
    date: '2024-01-11',
    approver: 'John Manager',
    comment: '',
    employeeId: '1', // Assuming user 1 is the employee
  },
];

const statusColors = {
  approved: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  rejected: 'bg-red-100 text-red-800',
};

export default function ExpensesPage() {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState(mockExpenses.filter(e => e.employeeId === user?.id));

  // Analytics
  const totalSubmitted = expenses.length;
  const waitingApproval = expenses.filter(e => e.status === 'pending').length;
  const approved = expenses.filter(e => e.status === 'approved').length;
  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Expenses</h1>
            <p className="mt-1 text-sm text-gray-500">
              Track your submitted expenses and their status.
            </p>
          </div>
          <Link
            href="/expenses/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            New Expense
          </Link>
        </div>

        {/* Analytics */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">{totalSubmitted}</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Submitted
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {totalAmount.toFixed(2)}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                    <span className="text-yellow-600 font-semibold text-sm">{waitingApproval}</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Waiting Approval
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {expenses.filter(e => e.status === 'pending').reduce((sum, e) => sum + e.amount, 0).toFixed(2)}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                    <span className="text-green-600 font-semibold text-sm">{approved}</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Approved
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {expenses.filter(e => e.status === 'approved').reduce((sum, e) => sum + e.amount, 0).toFixed(2)}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expenses Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid By</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {expenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{user?.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{expense.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(expense.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{expense.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{expense.paidBy}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{expense.remarks}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{expense.amount} {expense.currency}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{expense.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
