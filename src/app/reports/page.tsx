'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  UserGroupIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';

// Mock data for reports
const mockExpenseData = [
  { month: 'Jan', amount: 2400, count: 12 },
  { month: 'Feb', amount: 1398, count: 8 },
  { month: 'Mar', amount: 9800, count: 25 },
  { month: 'Apr', amount: 3908, count: 18 },
  { month: 'May', amount: 4800, count: 22 },
  { month: 'Jun', amount: 3800, count: 16 },
];

const mockCategoryData = [
  { category: 'Meals & Entertainment', amount: 4500, percentage: 35 },
  { category: 'Travel', amount: 3200, percentage: 25 },
  { category: 'Transportation', amount: 1900, percentage: 15 },
  { category: 'Office Supplies', amount: 1600, percentage: 12 },
  { category: 'Accommodation', amount: 1200, percentage: 9 },
  { category: 'Other', amount: 400, percentage: 4 },
];

const mockTopEmployees = [
  { name: 'John Doe', amount: 2500, count: 8 },
  { name: 'Jane Smith', amount: 1800, count: 6 },
  { name: 'Mike Johnson', amount: 1200, count: 4 },
  { name: 'Sarah Wilson', amount: 900, count: 3 },
  { name: 'Bob Brown', amount: 600, count: 2 },
];

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('amount');

  const totalAmount = mockExpenseData.reduce((sum, item) => sum + item.amount, 0);
  const totalCount = mockExpenseData.reduce((sum, item) => sum + item.count, 0);
  const averageAmount = totalAmount / totalCount;

  const getStatusColor = (value: number, isPositive: boolean) => {
    if (isPositive) {
      return value > 0 ? 'text-green-600' : 'text-red-600';
    }
    return value > 0 ? 'text-red-600' : 'text-green-600';
  };

  const getStatusIcon = (value: number, isPositive: boolean) => {
    if (isPositive) {
      return value > 0 ? ArrowUpIcon : ArrowDownIcon;
    }
    return value > 0 ? ArrowDownIcon : ArrowUpIcon;
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="mt-1 text-sm text-gray-500">
              Insights into your expense patterns and trends.
            </p>
          </div>
          
          <div className="flex space-x-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="1month">Last Month</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
            </select>
            
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="amount">Amount</option>
              <option value="count">Count</option>
            </select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CurrencyDollarIcon className="h-8 w-8 text-green-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Expenses
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      ${totalAmount.toLocaleString()}
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
                  <ChartBarIcon className="h-8 w-8 text-blue-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Claims
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {totalCount}
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
                  <CalendarIcon className="h-8 w-8 text-purple-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Average per Claim
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      ${averageAmount.toFixed(2)}
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
                  <UserGroupIcon className="h-8 w-8 text-orange-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Active Employees
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {mockTopEmployees.length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Monthly Trend Chart */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Monthly Expense Trend
            </h3>
            <div className="space-y-4">
              {mockExpenseData.map((item, index) => {
                const maxAmount = Math.max(...mockExpenseData.map(d => d.amount));
                const percentage = (item.amount / maxAmount) * 100;
                const isIncrease = index > 0 && item.amount > mockExpenseData[index - 1].amount;
                const change = index > 0 ? item.amount - mockExpenseData[index - 1].amount : 0;
                const ChangeIcon = getStatusIcon(change, true);
                
                return (
                  <div key={item.month} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">{item.month}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">
                          ${item.amount.toLocaleString()}
                        </span>
                        {index > 0 && (
                          <div className={`flex items-center text-xs ${getStatusColor(change, true)}`}>
                            <ChangeIcon className="h-3 w-3 mr-1" />
                            {Math.abs(change).toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Expenses by Category
            </h3>
            <div className="space-y-4">
              {mockCategoryData.map((item) => (
                <div key={item.category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      {item.category}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">
                        ${item.amount.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-500">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Employees */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Top Employees by Expense Amount
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Number of Claims
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Average per Claim
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockTopEmployees.map((employee, index) => (
                  <tr key={employee.name} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-indigo-600">
                              {index + 1}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {employee.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${employee.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.count}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${(employee.amount / employee.count).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Approval Statistics */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Approval Status
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Approved</span>
                <span className="text-sm font-medium text-green-600">75%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Pending</span>
                <span className="text-sm font-medium text-yellow-600">20%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Rejected</span>
                <span className="text-sm font-medium text-red-600">5%</span>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Average Processing Time
            </h3>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">2.3</div>
              <div className="text-sm text-gray-500">days</div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Cost Savings
            </h3>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">$1,250</div>
              <div className="text-sm text-gray-500">this month</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
