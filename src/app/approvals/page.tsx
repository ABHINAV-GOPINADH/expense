'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import {
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  ClockIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

// Mock data for pending approvals
const mockPendingApprovals = [
  {
    id: '1',
    expenseId: 'exp-1',
    employeeName: 'John Doe',
    employeeEmail: 'john@company.com',
    description: 'Client Dinner',
    amount: 125.50,
    currency: 'USD',
    category: 'Meals & Entertainment',
    date: '2024-01-15',
    submittedAt: '2024-01-15T10:30:00Z',
    receiptUrl: '/receipts/receipt-1.jpg',
    previousApprover: null,
    currentStep: 1,
    totalSteps: 2,
  },
  {
    id: '2',
    expenseId: 'exp-2',
    employeeName: 'Jane Smith',
    employeeEmail: 'jane@company.com',
    description: 'Taxi to Airport',
    amount: 45.00,
    currency: 'USD',
    category: 'Transportation',
    date: '2024-01-14',
    submittedAt: '2024-01-14T15:45:00Z',
    receiptUrl: '/receipts/receipt-2.jpg',
    previousApprover: 'Manager A',
    currentStep: 2,
    totalSteps: 3,
  },
  {
    id: '3',
    expenseId: 'exp-3',
    employeeName: 'Mike Johnson',
    employeeEmail: 'mike@company.com',
    description: 'Office Supplies',
    amount: 89.99,
    currency: 'USD',
    category: 'Office Supplies',
    date: '2024-01-13',
    submittedAt: '2024-01-13T09:15:00Z',
    receiptUrl: '/receipts/receipt-3.jpg',
    previousApprover: null,
    currentStep: 1,
    totalSteps: 1,
  },
];

export default function ApprovalsPage() {
  const { user } = useAuth();
  const [selectedExpense, setSelectedExpense] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState<'approve' | 'reject' | null>(null);
  const [comment, setComment] = useState('');

  const handleApprove = (expenseId: string) => {
    setSelectedExpense(mockPendingApprovals.find(e => e.id === expenseId));
    setAction('approve');
    setIsModalOpen(true);
  };

  const handleReject = (expenseId: string) => {
    setSelectedExpense(mockPendingApprovals.find(e => e.id === expenseId));
    setAction('reject');
    setIsModalOpen(true);
  };

  const handleSubmitAction = async () => {
    if (!selectedExpense || !action) return;

    try {
      // Mock API call - in real app, this would submit to your backend
      console.log('Submitting approval action:', {
        expenseId: selectedExpense.id,
        action,
        comment,
        approverId: user?.id,
      });

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Close modal and reset state
      setIsModalOpen(false);
      setSelectedExpense(null);
      setAction(null);
      setComment('');
    } catch (error) {
      console.error('Error submitting approval action:', error);
    }
  };

  const getStatusColor = (currentStep: number, totalSteps: number) => {
    if (currentStep === 1) return 'bg-blue-100 text-blue-800';
    if (currentStep < totalSteps) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getStatusText = (currentStep: number, totalSteps: number) => {
    if (currentStep === 1) return 'Awaiting First Approval';
    if (currentStep < totalSteps) return `Step ${currentStep} of ${totalSteps}`;
    return 'Final Approval';
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pending Approvals</h1>
          <p className="mt-1 text-sm text-gray-500">
            Review and approve expense claims from your team members.
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ClockIcon className="h-8 w-8 text-yellow-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Pending Reviews
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {mockPendingApprovals.length}
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
                    <span className="text-green-600 font-semibold text-sm">$</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Amount
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      ${mockPendingApprovals.reduce((sum, e) => sum + e.amount, 0).toFixed(2)}
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
                  <UserIcon className="h-8 w-8 text-blue-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Unique Employees
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {new Set(mockPendingApprovals.map(e => e.employeeName)).size}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Approvals List */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Expenses Awaiting Your Approval
            </h3>
            <div className="space-y-4">
              {mockPendingApprovals.map((approval) => (
                <div
                  key={approval.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="text-lg font-medium text-gray-900">
                          {approval.description}
                        </h4>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            approval.currentStep,
                            approval.totalSteps
                          )}`}
                        >
                          {getStatusText(approval.currentStep, approval.totalSteps)}
                        </span>
                      </div>
                      
                      <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Employee</p>
                          <p className="text-sm text-gray-900">{approval.employeeName}</p>
                          <p className="text-xs text-gray-500">{approval.employeeEmail}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-500">Amount</p>
                          <p className="text-sm text-gray-900">
                            ${approval.amount.toFixed(2)} {approval.currency}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-500">Category</p>
                          <p className="text-sm text-gray-900">{approval.category}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-500">Date</p>
                          <p className="text-sm text-gray-900">
                            {new Date(approval.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {approval.previousApprover && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Previously approved by: <span className="font-medium">{approval.previousApprover}</span>
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleApprove(approval.id)}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <CheckCircleIcon className="h-4 w-4 mr-1" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(approval.id)}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <XCircleIcon className="h-4 w-4 mr-1" />
                        Reject
                      </button>
                      <button className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <EyeIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {mockPendingApprovals.length === 0 && (
              <div className="text-center py-12">
                <ClockIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No pending approvals</h3>
                <p className="mt-1 text-sm text-gray-500">
                  All expense claims have been reviewed.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Approval Modal */}
        {isModalOpen && selectedExpense && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {action === 'approve' ? 'Approve Expense' : 'Reject Expense'}
                </h3>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    <strong>Description:</strong> {selectedExpense.description}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Amount:</strong> ${selectedExpense.amount.toFixed(2)} {selectedExpense.currency}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Employee:</strong> {selectedExpense.employeeName}
                  </p>
                </div>

                <div className="mb-4">
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                    Comment {action === 'reject' && '(required)'}
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    rows={3}
                    required={action === 'reject'}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder={action === 'approve' ? 'Optional comment...' : 'Please provide a reason for rejection...'}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setSelectedExpense(null);
                      setAction(null);
                      setComment('');
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitAction}
                    disabled={action === 'reject' && !comment.trim()}
                    className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                      action === 'approve'
                        ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                        : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                    }`}
                  >
                    {action === 'approve' ? 'Approve' : 'Reject'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
