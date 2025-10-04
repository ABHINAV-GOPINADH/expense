'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  UserIcon,
  UserGroupIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

// Mock data for users
const mockUsers = [
  {
    id: '1',
    name: 'John Admin',
    email: 'admin@company.com',
    role: 'admin',
    isManagerApprover: true,
    managerId: null,
    createdAt: '2024-01-01',
    lastLogin: '2024-01-15',
  },
  {
    id: '2',
    name: 'Jane Manager',
    email: 'jane@company.com',
    role: 'manager',
    isManagerApprover: true,
    managerId: '1',
    createdAt: '2024-01-02',
    lastLogin: '2024-01-14',
  },
  {
    id: '3',
    name: 'Mike Employee',
    email: 'mike@company.com',
    role: 'employee',
    isManagerApprover: false,
    managerId: '2',
    createdAt: '2024-01-03',
    lastLogin: '2024-01-13',
  },
  {
    id: '4',
    name: 'Sarah Employee',
    email: 'sarah@company.com',
    role: 'employee',
    isManagerApprover: false,
    managerId: '2',
    createdAt: '2024-01-04',
    lastLogin: '2024-01-12',
  },
  {
    id: '5',
    name: 'Bob Manager',
    email: 'bob@company.com',
    role: 'manager',
    isManagerApprover: true,
    managerId: '1',
    createdAt: '2024-01-05',
    lastLogin: '2024-01-11',
  },
];

const roleColors = {
  admin: 'bg-purple-100 text-purple-800',
  manager: 'bg-blue-100 text-blue-800',
  employee: 'bg-green-100 text-green-800',
};

export default function UsersPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'employee',
    isManagerApprover: false,
    managerId: '',
    password: '',
    sendEmailInvitation: true,
    // Approval rules
    approvalType: 'manager', // 'manager', 'percentage', 'specific', 'hybrid'
    approvalPercentage: 60,
    specificApproverId: '',
    minimumApprovalPercentage: 50,
  });

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  const managers = mockUsers.filter(u => u.role === 'manager' || u.role === 'admin');

  const generateRandomPassword = () => Math.random().toString(36).slice(-8);
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const randomPassword = generateRandomPassword();
      // Simulate sending password (show in alert or toast)
      alert(`User created! Password sent: ${randomPassword}`);
      
      // Mock API call - in real app, this would submit to your backend
      console.log('Creating user:', newUser);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form and close modal
      setNewUser({
        name: '',
        email: '',
        role: 'employee',
        isManagerApprover: false,
        managerId: '',
        password: '',
        sendEmailInvitation: true,
        approvalType: 'manager',
        approvalPercentage: 60,
        specificApproverId: '',
        minimumApprovalPercentage: 50,
      });
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        // Mock API call - in real app, this would submit to your backend
        console.log('Deleting user:', userId);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <ShieldCheckIcon className="h-5 w-5" />;
      case 'manager':
        return <UserGroupIcon className="h-5 w-5" />;
      case 'employee':
        return <UserIcon className="h-5 w-5" />;
      default:
        return <UserIcon className="h-5 w-5" />;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage users, roles, and permissions for your organization.
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add User
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <UserIcon className="h-8 w-8 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Users
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {mockUsers.length}
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
                  <ShieldCheckIcon className="h-8 w-8 text-purple-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Admins
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {mockUsers.filter(u => u.role === 'admin').length}
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
                  <UserGroupIcon className="h-8 w-8 text-blue-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Managers
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {mockUsers.filter(u => u.role === 'manager').length}
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
                  <UserIcon className="h-8 w-8 text-green-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Employees
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {mockUsers.filter(u => u.role === 'employee').length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                Search Users
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Filter by Role
              </label>
              <select
                name="role"
                id="role"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="employee">Employee</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Manager
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Manager Approver
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 mr-2">
                          {getRoleIcon(user.role)}
                        </div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleColors[user.role as keyof typeof roleColors]}`}
                        >
                          {user.role}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.managerId ? 
                        mockUsers.find(u => u.id === user.managerId)?.name || 'Unknown' : 
                        'N/A'
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.isManagerApprover ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.isManagerApprover ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.lastLogin).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create User Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Create New User</h3>
                <form onSubmit={handleCreateUser} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={newUser.name}
                      onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    />
                  </div>

                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                      Role
                    </label>
                    <select
                      name="role"
                      id="role"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={newUser.role}
                      onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                    >
                      <option value="employee">Employee</option>
                      <option value="manager">Manager</option>
                    </select>
                  </div>

                  {newUser.role === 'employee' && (
                    <div>
                      <label htmlFor="managerId" className="block text-sm font-medium text-gray-700">
                        Manager
                      </label>
                      <select
                        name="managerId"
                        id="managerId"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={newUser.managerId}
                        onChange={(e) => setNewUser({...newUser, managerId: e.target.value})}
                      >
                        <option value="">Select Manager</option>
                        {managers.map(manager => (
                          <option key={manager.id} value={manager.id}>
                            {manager.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {newUser.role === 'employee' && (
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="isManagerApprover"
                        id="isManagerApprover"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        checked={newUser.isManagerApprover}
                        onChange={(e) => setNewUser({...newUser, isManagerApprover: e.target.checked})}
                      />
                      <label htmlFor="isManagerApprover" className="ml-2 block text-sm text-gray-900">
                        Is manager an approver?
                      </label>
                    </div>
                  )}

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="sendEmailInvitation"
                      id="sendEmailInvitation"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      checked={newUser.sendEmailInvitation}
                      onChange={(e) => setNewUser({...newUser, sendEmailInvitation: e.target.checked})}
                    />
                    <label htmlFor="sendEmailInvitation" className="ml-2 block text-sm text-gray-900">
                      Send email invitation with login credentials
                    </label>
                  </div>

                  {/* Approval Rules Section */}
                  {newUser.role === 'employee' && (
                    <div className="border-t pt-6">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Approval Rules</h4>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Approval Type
                          </label>
                          <div className="space-y-2">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="approvalType"
                                value="manager"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                checked={newUser.approvalType === 'manager'}
                                onChange={(e) => setNewUser({...newUser, approvalType: e.target.value})}
                              />
                              <span className="ml-2 text-sm text-gray-900">Manager Approval (Default)</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="approvalType"
                                value="percentage"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                checked={newUser.approvalType === 'percentage'}
                                onChange={(e) => setNewUser({...newUser, approvalType: e.target.value})}
                              />
                              <span className="ml-2 text-sm text-gray-900">Percentage Approval</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="approvalType"
                                value="specific"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                checked={newUser.approvalType === 'specific'}
                                onChange={(e) => setNewUser({...newUser, approvalType: e.target.value})}
                              />
                              <span className="ml-2 text-sm text-gray-900">Specific Approver</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="approvalType"
                                value="hybrid"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                checked={newUser.approvalType === 'hybrid'}
                                onChange={(e) => setNewUser({...newUser, approvalType: e.target.value})}
                              />
                              <span className="ml-2 text-sm text-gray-900">Hybrid (Percentage + Specific)</span>
                            </label>
                          </div>
                        </div>

                        {newUser.approvalType === 'percentage' && (
                          <div>
                            <label htmlFor="approvalPercentage" className="block text-sm font-medium text-gray-700">
                              Approval Percentage Required
                            </label>
                            <input
                              type="number"
                              name="approvalPercentage"
                              id="approvalPercentage"
                              min="1"
                              max="100"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              value={newUser.approvalPercentage}
                              onChange={(e) => setNewUser({...newUser, approvalPercentage: parseInt(e.target.value)})}
                            />
                          </div>
                        )}

                        {newUser.approvalType === 'specific' && (
                          <div>
                            <label htmlFor="specificApproverId" className="block text-sm font-medium text-gray-700">
                              Specific Approver
                            </label>
                            <select
                              name="specificApproverId"
                              id="specificApproverId"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              value={newUser.specificApproverId}
                              onChange={(e) => setNewUser({...newUser, specificApproverId: e.target.value})}
                            >
                              <option value="">Select Approver</option>
                              {managers.map(manager => (
                                <option key={manager.id} value={manager.id}>
                                  {manager.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}

                        {newUser.approvalType === 'hybrid' && (
                          <div className="space-y-4">
                            <div>
                              <label htmlFor="approvalPercentage" className="block text-sm font-medium text-gray-700">
                                Approval Percentage Required
                              </label>
                              <input
                                type="number"
                                name="approvalPercentage"
                                id="approvalPercentage"
                                min="1"
                                max="100"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={newUser.approvalPercentage}
                                onChange={(e) => setNewUser({...newUser, approvalPercentage: parseInt(e.target.value)})}
                              />
                            </div>
                            <div>
                              <label htmlFor="specificApproverId" className="block text-sm font-medium text-gray-700">
                                OR Specific Approver
                              </label>
                              <select
                                name="specificApproverId"
                                id="specificApproverId"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={newUser.specificApproverId}
                                onChange={(e) => setNewUser({...newUser, specificApproverId: e.target.value})}
                              >
                                <option value="">Select Approver</option>
                                {managers.map(manager => (
                                  <option key={manager.id} value={manager.id}>
                                    {manager.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        )}

                        <div>
                          <label htmlFor="minimumApprovalPercentage" className="block text-sm font-medium text-gray-700">
                            Minimum Approval Percentage (for all types)
                          </label>
                          <input
                            type="number"
                            name="minimumApprovalPercentage"
                            id="minimumApprovalPercentage"
                            min="1"
                            max="100"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={newUser.minimumApprovalPercentage}
                            onChange={(e) => setNewUser({...newUser, minimumApprovalPercentage: parseInt(e.target.value)})}
                          />
                          <p className="mt-1 text-xs text-gray-500">
                            Minimum percentage of approvers that must approve for expense to be approved
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsCreateModalOpen(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Create User & Send Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
