"use client";

<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
=======
import React, { useState } from "react";
import Layout from "@/components/Layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
>>>>>>> 058ebcc46b7efd9a9655f0ce1dfdae57ce7c6872
import {
  PlusIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  UserIcon,
  UserGroupIcon,
  ShieldCheckIcon,
<<<<<<< HEAD
} from '@heroicons/react/24/outline';
import { auth } from '@/firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, setDoc, doc, serverTimestamp, getDocs, deleteDoc, getFirestore } from 'firebase/firestore';

const db = getFirestore();
=======
} from "@heroicons/react/24/outline";

// Mock data for users
const mockUsers = [
  {
    id: "1",
    name: "John Admin",
    email: "admin@company.com",
    role: "admin",
    isManagerApprover: true,
    managerId: null,
    createdAt: "2024-01-01",
    lastLogin: "2024-01-15",
  },
  {
    id: "2",
    name: "Jane Manager",
    email: "jane@company.com",
    role: "manager",
    isManagerApprover: true,
    managerId: "1",
    createdAt: "2024-01-02",
    lastLogin: "2024-01-14",
  },
  {
    id: "3",
    name: "Mike Employee",
    email: "mike@company.com",
    role: "employee",
    isManagerApprover: false,
    managerId: "2",
    createdAt: "2024-01-03",
    lastLogin: "2024-01-13",
  },
  {
    id: "4",
    name: "Sarah Employee",
    email: "sarah@company.com",
    role: "employee",
    isManagerApprover: false,
    managerId: "2",
    createdAt: "2024-01-04",
    lastLogin: "2024-01-12",
  },
  {
    id: "5",
    name: "Bob Manager",
    email: "bob@company.com",
    role: "manager",
    isManagerApprover: true,
    managerId: "1",
    createdAt: "2024-01-05",
    lastLogin: "2024-01-11",
  },
];
>>>>>>> 058ebcc46b7efd9a9655f0ce1dfdae57ce7c6872

const roleColors = {
  admin: "bg-purple-100 text-purple-800",
  manager: "bg-blue-100 text-blue-800",
  employee: "bg-green-100 text-green-800",
};

export default function UsersPage() {
  const { user } = useAuth();
<<<<<<< HEAD
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
=======
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
>>>>>>> 058ebcc46b7efd9a9655f0ce1dfdae57ce7c6872
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "employee",
    isManagerApprover: false,
    managerId: "",
    password: "",
    sendEmailInvitation: true,
<<<<<<< HEAD
    approvalType: 'manager',
=======
    // Approval rules
    approvalType: "manager", // 'manager', 'percentage', 'specific', 'hybrid'
>>>>>>> 058ebcc46b7efd9a9655f0ce1dfdae57ce7c6872
    approvalPercentage: 60,
    specificApproverId: "",
    minimumApprovalPercentage: 50,
  });

<<<<<<< HEAD
  // Fetch users from Firestore
  const fetchUsers = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'users'));
      const userList: any[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(userList);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
=======
  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const managers = mockUsers.filter((u) => u.role === "manager" || u.role === "admin");
>>>>>>> 058ebcc46b7efd9a9655f0ce1dfdae57ce7c6872

  const managers = users.filter(u => u.role === 'manager' || u.role === 'admin');
  const generateRandomPassword = () => Math.random().toString(36).slice(-8);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Admin must be logged in to add users");
      return;
    }

    try {
      const randomPassword = generateRandomPassword();
<<<<<<< HEAD

      // 1️⃣ Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        randomPassword
      );

      // 2️⃣ Update display name in Auth
      await updateProfile(userCredential.user, { displayName: newUser.name });

      // 3️⃣ Save user in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        managerId: newUser.role === 'employee' ? newUser.managerId : null,
        isManagerApprover: newUser.isManagerApprover,
        createdBy: user.uid,
        createdAt: serverTimestamp(),
        approvalType: newUser.approvalType,
        approvalPercentage: newUser.approvalPercentage,
        specificApproverId: newUser.specificApproverId,
        minimumApprovalPercentage: newUser.minimumApprovalPercentage,
      });

      alert(`User created successfully! Password: ${randomPassword}`);

      // Reset form & close modal
=======
      // Simulate sending password (show in alert or toast)
      alert(`User created! Password sent: ${randomPassword}`);

      // Mock API call - in real app, this would submit to your backend
      console.log("Creating user:", newUser);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form and close modal
>>>>>>> 058ebcc46b7efd9a9655f0ce1dfdae57ce7c6872
      setNewUser({
        name: "",
        email: "",
        role: "employee",
        isManagerApprover: false,
        managerId: "",
        password: "",
        sendEmailInvitation: true,
        approvalType: "manager",
        approvalPercentage: 60,
        specificApproverId: "",
        minimumApprovalPercentage: 50,
      });
      setIsCreateModalOpen(false);
<<<<<<< HEAD
=======
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
>>>>>>> 058ebcc46b7efd9a9655f0ce1dfdae57ce7c6872

      // Refresh user list
      fetchUsers();
    } catch (error: any) {
      console.error("Error creating user:", error);
      alert(error.message || "Error creating user");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
<<<<<<< HEAD
        await deleteDoc(doc(db, 'users', userId));
        alert('User deleted successfully');
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Error deleting user');
=======
        // Mock API call - in real app, this would submit to your backend
        console.log("Deleting user:", userId);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error("Error deleting user:", error);
>>>>>>> 058ebcc46b7efd9a9655f0ce1dfdae57ce7c6872
      }
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <ShieldCheckIcon className="h-5 w-5 text-black" />;
      case 'manager':
        return <UserGroupIcon className="h-5 w-5 text-black" />;
      case 'employee':
        return <UserIcon className="h-5 w-5 text-black" />;
      default:
        return <UserIcon className="h-5 w-5 text-black" />;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-black">User Management</h1>
            <p className="mt-1 text-sm text-black">Manage users, roles, and permissions.</p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add User
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-black">Search Users</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-black" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-black"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-black">Filter by Role</label>
              <select
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-black"
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
                  <th className="px-6 py-3 text-left text-sm font-medium text-black">User</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-black">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-black">Manager</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-black">Manager Approver</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-black">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map(u => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-black">{u.name} ({u.email})</td>
                    <td className="px-6 py-4 flex items-center">
                      {getRoleIcon(u.role)}
                      <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${roleColors[u.role]}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-black">{u.managerId ? users.find(m => m.id === u.managerId)?.name || 'Unknown' : 'N/A'}</td>
                    <td className="px-6 py-4 text-black">{u.isManagerApprover ? 'Yes' : 'No'}</td>
                    <td className="px-6 py-4">
                      <button onClick={() => handleDeleteUser(u.id)} className="text-red-600 hover:text-red-900">
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create User Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-start pt-20 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-96 overflow-y-auto max-h-[90vh]">
              <h3 className="text-lg font-medium mb-4 text-black">Create New User</h3>
              <form onSubmit={handleCreateUser} className="space-y-4">
                <div>
                  <label className="text-black">Name</label>
                  <input type="text" required value={newUser.name} onChange={(e)=>setNewUser({...newUser, name:e.target.value})} className="border p-2 w-full rounded text-black"/>
                </div>
                <div>
                  <label className="text-black">Email</label>
                  <input type="email" required value={newUser.email} onChange={(e)=>setNewUser({...newUser, email:e.target.value})} className="border p-2 w-full rounded text-black"/>
                </div>
                <div>
                  <label className="text-black">Role</label>
                  <select value={newUser.role} onChange={(e)=>setNewUser({...newUser, role:e.target.value})} className="border p-2 w-full rounded text-black">
                    <option value="employee">Employee</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                {/* Employee-specific fields */}
                {newUser.role==='employee' && (
                  <>
                    <div>
                      <label className="text-black">Manager</label>
                      <select value={newUser.managerId} onChange={(e)=>setNewUser({...newUser, managerId:e.target.value})} className="border p-2 w-full rounded text-black">
                        <option value="">Select Manager</option>
                        {managers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                      </select>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" checked={newUser.isManagerApprover} onChange={(e)=>setNewUser({...newUser, isManagerApprover:e.target.checked})} className="h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                      <label className="ml-2 text-black">Is manager an approver?</label>
                    </div>

                    {/* Approval Type Section */}
                    <div className="border-t pt-4 space-y-2">
                      <label className="text-black font-medium">Approval Type</label>
                      <div className="space-y-1">
                        <label className="flex items-center">
                          <input type="radio" name="approvalType" value="manager" checked={newUser.approvalType==='manager'} onChange={e=>setNewUser({...newUser, approvalType:e.target.value})} className="h-4 w-4 text-indigo-600 border-gray-300"/>
                          <span className="ml-2 text-black">Manager Approval</span>
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="approvalType" value="percentage" checked={newUser.approvalType==='percentage'} onChange={e=>setNewUser({...newUser, approvalType:e.target.value})} className="h-4 w-4 text-indigo-600 border-gray-300"/>
                          <span className="ml-2 text-black">Percentage Approval</span>
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="approvalType" value="specific" checked={newUser.approvalType==='specific'} onChange={e=>setNewUser({...newUser, approvalType:e.target.value})} className="h-4 w-4 text-indigo-600 border-gray-300"/>
                          <span className="ml-2 text-black">Specific Approver</span>
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="approvalType" value="hybrid" checked={newUser.approvalType==='hybrid'} onChange={e=>setNewUser({...newUser, approvalType:e.target.value})} className="h-4 w-4 text-indigo-600 border-gray-300"/>
                          <span className="ml-2 text-black">Hybrid</span>
                        </label>
                      </div>

                      {/* Conditional Inputs */}
                      {newUser.approvalType==='percentage' && (
                        <div>
                          <label className="text-black">Approval Percentage</label>
                          <input type="number" min={1} max={100} value={newUser.approvalPercentage} onChange={e=>setNewUser({...newUser, approvalPercentage:parseInt(e.target.value)})} className="border p-2 w-full rounded text-black"/>
                        </div>
                      )}
                      {newUser.approvalType==='specific' && (
                        <div>
                          <label className="text-black">Specific Approver</label>
                          <select value={newUser.specificApproverId} onChange={e=>setNewUser({...newUser, specificApproverId:e.target.value})} className="border p-2 w-full rounded text-black">
                            <option value="">Select Approver</option>
                            {managers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                          </select>
                        </div>
                      )}
                      {newUser.approvalType==='hybrid' && (
                        <>
                          <div>
                            <label className="text-black">Approval Percentage</label>
                            <input type="number" min={1} max={100} value={newUser.approvalPercentage} onChange={e=>setNewUser({...newUser, approvalPercentage:parseInt(e.target.value)})} className="border p-2 w-full rounded text-black"/>
                          </div>
                          <div>
                            <label className="text-black">OR Specific Approver</label>
                            <select value={newUser.specificApproverId} onChange={e=>setNewUser({...newUser, specificApproverId:e.target.value})} className="border p-2 w-full rounded text-black">
                              <option value="">Select Approver</option>
                              {managers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                            </select>
                          </div>
                        </>
                      )}

                      {/* Minimum Approval */}
                      <div>
                        <label className="text-black">Minimum Approval Percentage</label>
                        <input type="number" min={1} max={100} value={newUser.minimumApprovalPercentage} onChange={e=>setNewUser({...newUser, minimumApprovalPercentage:parseInt(e.target.value)})} className="border p-2 w-full rounded text-black"/>
                      </div>
                    </div>
                  </>
                )}

                {/* Modal Buttons */}
                <div className="flex justify-end space-x-2">
                  <button type="button" onClick={()=>setIsCreateModalOpen(false)} className="px-4 py-2 border rounded text-black">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">Create</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
}
