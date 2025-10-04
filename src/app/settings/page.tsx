'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import {
  CogIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

// Mock data for approval rules
const mockApprovalRules = [
  {
    id: '1',
    name: 'Standard Approval Flow',
    type: 'percentage',
    percentage: 60,
    isActive: true,
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    name: 'CFO Approval Required',
    type: 'specific',
    specificApproverId: 'cfo-1',
    specificApproverName: 'John CFO',
    isActive: true,
    createdAt: '2024-01-02',
  },
  {
    id: '3',
    name: 'Hybrid Approval Rule',
    type: 'hybrid',
    percentage: 50,
    specificApproverId: 'director-1',
    specificApproverName: 'Jane Director',
    isActive: false,
    createdAt: '2024-01-03',
  },
];

const mockApprovalFlows = [
  {
    id: '1',
    name: 'Standard Multi-Level Approval',
    steps: [
      { id: '1', approverName: 'Direct Manager', order: 1, isRequired: true },
      { id: '2', approverName: 'Finance Team', order: 2, isRequired: true },
      { id: '3', approverName: 'Director', order: 3, isRequired: false },
    ],
    isActive: true,
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    name: 'High Value Approval',
    steps: [
      { id: '1', approverName: 'Manager', order: 1, isRequired: true },
      { id: '2', approverName: 'CFO', order: 2, isRequired: true },
      { id: '3', approverName: 'CEO', order: 3, isRequired: true },
    ],
    isActive: true,
    createdAt: '2024-01-02',
  },
];

export default function SettingsPage() {
  const { user, company } = useAuth();
  const [activeTab, setActiveTab] = useState('approval-rules');
  const [isCreateRuleModalOpen, setIsCreateRuleModalOpen] = useState(false);
  const [isCreateFlowModalOpen, setIsCreateFlowModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<any>(null);
  const [editingFlow, setEditingFlow] = useState<any>(null);

  const [newRule, setNewRule] = useState({
    name: '',
    type: 'percentage',
    percentage: 60,
    specificApproverId: '',
    specificApproverName: '',
    hybridPercentage: 50,
    hybridSpecificApproverId: '',
    hybridSpecificApproverName: '',
  });

  const [newFlow, setNewFlow] = useState({
    name: '',
    steps: [{ approverName: '', isRequired: true }],
  });

  const handleCreateRule = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Mock API call
      console.log('Creating approval rule:', newRule);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setNewRule({
        name: '',
        type: 'percentage',
        percentage: 60,
        specificApproverId: '',
        specificApproverName: '',
        hybridPercentage: 50,
        hybridSpecificApproverId: '',
        hybridSpecificApproverName: '',
      });
      setIsCreateRuleModalOpen(false);
    } catch (error) {
      console.error('Error creating rule:', error);
    }
  };

  const handleCreateFlow = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Mock API call
      console.log('Creating approval flow:', newFlow);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setNewFlow({
        name: '',
        steps: [{ approverName: '', isRequired: true }],
      });
      setIsCreateFlowModalOpen(false);
    } catch (error) {
      console.error('Error creating flow:', error);
    }
  };

  const addFlowStep = () => {
    setNewFlow({
      ...newFlow,
      steps: [...newFlow.steps, { approverName: '', isRequired: true }],
    });
  };

  const removeFlowStep = (index: number) => {
    setNewFlow({
      ...newFlow,
      steps: newFlow.steps.filter((_, i) => i !== index),
    });
  };

  const updateFlowStep = (index: number, field: string, value: any) => {
    const updatedSteps = [...newFlow.steps];
    updatedSteps[index] = { ...updatedSteps[index], [field]: value };
    setNewFlow({ ...newFlow, steps: updatedSteps });
  };

  const tabs = [
    { id: 'approval-rules', name: 'Approval Rules', icon: CheckCircleIcon },
    { id: 'approval-flows', name: 'Approval Flows', icon: UserGroupIcon },
    { id: 'company-settings', name: 'Company Settings', icon: CogIcon },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Configure approval rules, flows, and company settings.
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Approval Rules Tab */}
        {activeTab === 'approval-rules' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Approval Rules</h2>
              <button
                onClick={() => setIsCreateRuleModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Rule
              </button>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Configuration
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockApprovalRules.map((rule) => (
                      <tr key={rule.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {rule.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                          {rule.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {rule.type === 'percentage' && `${rule.percentage}% approval required`}
                          {rule.type === 'specific' && `Requires ${rule.specificApproverName}`}
                          {rule.type === 'hybrid' && `${rule.percentage}% OR ${rule.specificApproverName}`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            rule.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {rule.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => setEditingRule(rule)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
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
          </div>
        )}

        {/* Approval Flows Tab */}
        {activeTab === 'approval-flows' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Approval Flows</h2>
              <button
                onClick={() => setIsCreateFlowModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Flow
              </button>
            </div>

            <div className="space-y-4">
              {mockApprovalFlows.map((flow) => (
                <div key={flow.id} className="bg-white shadow rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">{flow.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        flow.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {flow.isActive ? 'Active' : 'Inactive'}
                      </span>
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {flow.steps.map((step, index) => (
                      <div key={step.id} className="flex items-center space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-indigo-600">
                            {step.order}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {step.approverName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {step.isRequired ? 'Required' : 'Optional'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Company Settings Tab */}
        {activeTab === 'company-settings' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900">Company Settings</h2>
            
            <div className="bg-white shadow rounded-lg p-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    id="companyName"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    defaultValue={company?.name || ''}
                  />
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    defaultValue={company?.country || ''}
                  />
                </div>

                <div>
                  <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                    Default Currency
                  </label>
                  <select
                    name="currency"
                    id="currency"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    defaultValue={company?.currency || 'USD'}
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="JPY">JPY - Japanese Yen</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                    Timezone
                  </label>
                  <select
                    name="timezone"
                    id="timezone"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    defaultValue="America/New_York"
                  >
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="Europe/London">London (GMT)</option>
                    <option value="Europe/Paris">Paris (CET)</option>
                    <option value="Asia/Tokyo">Tokyo (JST)</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create Rule Modal */}
        {isCreateRuleModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Create Approval Rule</h3>
                <form onSubmit={handleCreateRule} className="space-y-4">
                  <div>
                    <label htmlFor="ruleName" className="block text-sm font-medium text-gray-700">
                      Rule Name
                    </label>
                    <input
                      type="text"
                      name="ruleName"
                      id="ruleName"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={newRule.name}
                      onChange={(e) => setNewRule({...newRule, name: e.target.value})}
                    />
                  </div>

                  <div>
                    <label htmlFor="ruleType" className="block text-sm font-medium text-gray-700">
                      Rule Type
                    </label>
                    <select
                      name="ruleType"
                      id="ruleType"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={newRule.type}
                      onChange={(e) => setNewRule({...newRule, type: e.target.value})}
                    >
                      <option value="percentage">Percentage Rule</option>
                      <option value="specific">Specific Approver Rule</option>
                      <option value="hybrid">Hybrid Rule</option>
                    </select>
                  </div>

                  {newRule.type === 'percentage' && (
                    <div>
                      <label htmlFor="percentage" className="block text-sm font-medium text-gray-700">
                        Approval Percentage
                      </label>
                      <input
                        type="number"
                        name="percentage"
                        id="percentage"
                        min="1"
                        max="100"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={newRule.percentage}
                        onChange={(e) => setNewRule({...newRule, percentage: parseInt(e.target.value)})}
                      />
                    </div>
                  )}

                  {newRule.type === 'specific' && (
                    <div>
                      <label htmlFor="specificApprover" className="block text-sm font-medium text-gray-700">
                        Specific Approver
                      </label>
                      <input
                        type="text"
                        name="specificApprover"
                        id="specificApprover"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={newRule.specificApproverName}
                        onChange={(e) => setNewRule({...newRule, specificApproverName: e.target.value})}
                      />
                    </div>
                  )}

                  {newRule.type === 'hybrid' && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="hybridPercentage" className="block text-sm font-medium text-gray-700">
                          Approval Percentage
                        </label>
                        <input
                          type="number"
                          name="hybridPercentage"
                          id="hybridPercentage"
                          min="1"
                          max="100"
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          value={newRule.hybridPercentage}
                          onChange={(e) => setNewRule({...newRule, hybridPercentage: parseInt(e.target.value)})}
                        />
                      </div>
                      <div>
                        <label htmlFor="hybridSpecificApprover" className="block text-sm font-medium text-gray-700">
                          OR Specific Approver
                        </label>
                        <input
                          type="text"
                          name="hybridSpecificApprover"
                          id="hybridSpecificApprover"
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          value={newRule.hybridSpecificApproverName}
                          onChange={(e) => setNewRule({...newRule, hybridSpecificApproverName: e.target.value})}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsCreateRuleModalOpen(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Create Rule
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Create Flow Modal */}
        {isCreateFlowModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Create Approval Flow</h3>
                <form onSubmit={handleCreateFlow} className="space-y-4">
                  <div>
                    <label htmlFor="flowName" className="block text-sm font-medium text-gray-700">
                      Flow Name
                    </label>
                    <input
                      type="text"
                      name="flowName"
                      id="flowName"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={newFlow.name}
                      onChange={(e) => setNewFlow({...newFlow, name: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Approval Steps
                    </label>
                    <div className="space-y-2">
                      {newFlow.steps.map((step, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-indigo-600">
                              {index + 1}
                            </span>
                          </div>
                          <input
                            type="text"
                            placeholder="Approver name"
                            className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={step.approverName}
                            onChange={(e) => updateFlowStep(index, 'approverName', e.target.value)}
                          />
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                              checked={step.isRequired}
                              onChange={(e) => updateFlowStep(index, 'isRequired', e.target.checked)}
                            />
                            <span className="ml-1 text-xs text-gray-600">Required</span>
                          </label>
                          {newFlow.steps.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeFlowStep(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <XCircleIcon className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={addFlowStep}
                      className="mt-2 text-sm text-indigo-600 hover:text-indigo-800"
                    >
                      + Add Step
                    </button>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsCreateFlowModalOpen(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Create Flow
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
