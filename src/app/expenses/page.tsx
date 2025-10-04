'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import {
  PlusIcon,
} from '@heroicons/react/24/outline';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const db = getFirestore();

const statusColors = {
  approved: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  rejected: 'bg-red-100 text-red-800',
};

export default function ExpensesPage() {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchExpenses = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, 'expenses'), where('createdBy', '==', user.uid));
        const snapshot = await getDocs(q);
        const expensesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setExpenses(expensesData);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [user]);

  // Analytics
  const totalSubmitted = expenses.length;
  const waitingApproval = expenses.filter(e => e.status === 'pending').length;
  const approved = expenses.filter(e => e.status === 'approved').length;
  const totalAmount = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-black">My Expenses</h1>
            <p className="mt-1 text-sm text-black">
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
                    <dt className="text-sm font-medium text-black truncate">
                      Total Submitted
                    </dt>
                    <dd className="text-lg font-medium text-black">
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
                    <dt className="text-sm font-medium text-black truncate">
                      Waiting Approval
                    </dt>
                    <dd className="text-lg font-medium text-black">
                      {expenses.filter(e => e.status === 'pending').reduce((sum, e) => sum + (e.amount || 0), 0).toFixed(2)}
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
                    <dt className="text-sm font-medium text-black truncate">
                      Approved
                    </dt>
                    <dd className="text-lg font-medium text-black">
                      {expenses.filter(e => e.status === 'approved').reduce((sum, e) => sum + (e.amount || 0), 0).toFixed(2)}
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Employee Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Paid By</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Remarks</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-4 text-center text-black">Loading...</td>
                  </tr>
                ) : expenses.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-4 text-center text-black">No expenses found.</td>
                  </tr>
                ) : (
                  expenses.map((expense) => (
                    <tr key={expense.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-black">{user?.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">{expense.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">{new Date(expense.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">{expense.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">{expense.paidBy}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">{expense.remarks}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">{expense.amount} {expense.currency}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`${statusColors[expense.status] || 'bg-gray-100 text-gray-800'} px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}>
                          {expense.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
