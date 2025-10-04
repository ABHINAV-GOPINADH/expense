"use client";

import React, { useState } from "react";
import Layout from "@/components/Layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

type ApprovalStatus = "pending" | "approved" | "rejected";

interface Expense {
  id: string;
  expenseId: string;
  employeeName: string;
  employeeEmail: string;
  description: string;
  amount: number;
  currency: string;
  category: string;
  date: string;
  submittedAt: string;
  receiptUrl: string;
  previousApprover: string | null;
  currentStep: number;
  totalSteps: number;
  status: ApprovalStatus;
  approverComment?: string;
  approvedBy?: string;
}

const initialMockPendingApprovals: Expense[] = [
  {
    id: "1",
    expenseId: "exp-1",
    employeeName: "John Doe",
    employeeEmail: "john@company.com",
    description: "Client Dinner",
    amount: 125.5,
    currency: "USD",
    category: "Meals & Entertainment",
    date: "2024-01-15",
    submittedAt: "2024-01-15T10:30:00Z",
    receiptUrl: "/receipts/receipt-1.jpg",
    previousApprover: null,
    currentStep: 1,
    totalSteps: 2,
    status: "pending",
  },
  {
    id: "2",
    expenseId: "exp-2",
    employeeName: "Jane Smith",
    employeeEmail: "jane@company.com",
    description: "Taxi to Airport",
    amount: 45.0,
    currency: "USD",
    category: "Transportation",
    date: "2024-01-14",
    submittedAt: "2024-01-14T15:45:00Z",
    receiptUrl: "/receipts/receipt-2.jpg",
    previousApprover: "Manager A",
    currentStep: 2,
    totalSteps: 3,
    status: "pending",
  },
  {
    id: "3",
    expenseId: "exp-3",
    employeeName: "Mike Johnson",
    employeeEmail: "mike@company.com",
    description: "Office Supplies",
    amount: 89.99,
    currency: "USD",
    category: "Office Supplies",
    date: "2024-01-13",
    submittedAt: "2024-01-13T09:15:00Z",
    receiptUrl: "/receipts/receipt-3.jpg",
    previousApprover: null,
    currentStep: 1,
    totalSteps: 1,
    status: "pending",
  },
];

export default function ApprovalsPage() {
  const { user } = useAuth();

  const [approvals, setApprovals] = useState<Expense[]>(initialMockPendingApprovals);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState<"approve" | "reject" | null>(null);
  const [comment, setComment] = useState("");

  const handleActionClick = (expenseId: string, type: "approve" | "reject") => {
    const expense = approvals.find((e) => e.id === expenseId);
    if (!expense) return;
    setSelectedExpense(expense);
    setAction(type);
    setIsModalOpen(true);
  };

  const handleSubmitAction = async () => {
    if (!selectedExpense || !action) return;

    try {
      console.log("Submitting action:", {
        expenseId: selectedExpense.id,
        action,
        comment,
        approverId: user?.uid,
      });

      // Simulate API call delay
      await new Promise((res) => setTimeout(res, 1000));

      setApprovals((prev) =>
        prev.map((e) =>
          e.id === selectedExpense.id
            ? {
                ...e,
                status: action === "approve" ? "approved" : "rejected", // Fix status here
                approverComment: comment.trim(),
                approvedBy: user?.email || "You",
              }
            : e
        )
      );

      setSelectedExpense(null);
      setAction(null);
      setComment("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Action error:", error);
    }
  };

  const getStatusColor = (status: ApprovalStatus) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getStatusLabel = (status: ApprovalStatus) => {
    switch (status) {
      case "approved":
        return "Approved";
      case "rejected":
        return "Rejected";
      default:
        return "Pending";
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Expense Approvals</h1>

        {/* Approvals List */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Expenses Awaiting or Processed</h3>

          {approvals.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-8">No expense claims available.</p>
          ) : (
            <div className="space-y-4">
              {approvals.map((expense) => (
                <div
                  key={expense.id}
                  className={`border rounded-lg p-4 ${expense.status !== "pending" ? "bg-gray-50 opacity-75" : ""}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="text-lg font-semibold text-gray-900">{expense.description}</h4>
                        <span
                          className={`px-2 py-0.5 text-xs rounded-full font-medium ${getStatusColor(expense.status)}`}
                        >
                          {getStatusLabel(expense.status)}
                        </span>
                      </div>

                      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500 font-medium">Employee</p>
                          <p className="text-gray-900">{expense.employeeName}</p>
                          <p className="text-gray-500 text-xs">{expense.employeeEmail}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 font-medium">Amount</p>
                          <p className="text-gray-900">
                            ${expense.amount.toFixed(2)} {expense.currency}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 font-medium">Category</p>
                          <p className="text-gray-900">{expense.category}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 font-medium">Date</p>
                          <p className="text-gray-900">{new Date(expense.date).toLocaleDateString()}</p>
                        </div>
                      </div>

                      {expense.status !== "pending" && (
                        <div className="mt-2 text-sm text-gray-600">
                          <p>
                            {getStatusLabel(expense.status)} by: <strong>{expense.approvedBy}</strong>
                          </p>
                          {expense.approverComment && (
                            <p>
                              <span className="text-gray-500">Comment:</span> {expense.approverComment}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Buttons */}
                    {expense.status === "pending" && (
                      <div className="ml-4 flex space-x-2">
                        <button
                          onClick={() => handleActionClick(expense.id, "approve")}
                          className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-md"
                        >
                          <CheckCircleIcon className="h-4 w-4 inline mr-1" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleActionClick(expense.id, "reject")}
                          className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md"
                        >
                          <XCircleIcon className="h-4 w-4 inline mr-1" />
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && selectedExpense && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-md shadow-lg w-full max-w-md p-6 text-black">
              <h2 className="text-lg font-semibold mb-4">{action === "approve" ? "Approve" : "Reject"} Expense</h2>
              <div className="mb-4 text-sm">
                <p>
                  <strong>Description:</strong> {selectedExpense.description}
                </p>
                <p>
                  <strong>Amount:</strong> ${selectedExpense.amount.toFixed(2)}
                </p>
                <p>
                  <strong>Employee:</strong> {selectedExpense.employeeName}
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Comment {action === "reject" && "(required)"}
                </label>
                <textarea
                  className="w-full border px-3 py-2 mt-1 rounded-md text-sm"
                  rows={3}
                  placeholder={
                    action === "approve" ? "Optional comment..." : "Please provide a reason for rejection..."
                  }
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required={action === "reject"}
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedExpense(null);
                    setAction(null);
                    setComment("");
                  }}
                  className="px-4 py-2 border text-sm rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitAction}
                  disabled={action === "reject" && !comment.trim()}
                  className={`px-4 py-2 text-sm text-white rounded-md ${
                    action === "approve" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {action === "approve" ? "Approve" : "Reject"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
