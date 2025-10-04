'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { fetchCountries, fetchCurrencyRates, convertCurrency } from '@/utils/api';
import { Country, CurrencyRate } from '@/types';
import { CameraIcon, DocumentIcon } from '@heroicons/react/24/outline';
import ReceiptScanner from '@/components/OCR/ReceiptScanner';

const expenseCategories = [
  'Meals & Entertainment',
  'Travel',
  'Transportation',
  'Office Supplies',
  'Accommodation',
  'Communication',
  'Training & Development',
  'Other',
];

export default function NewExpensePage() {
  const router = useRouter();
  const { user, company } = useAuth();
  const [countries, setCountries] = useState<Country[]>([]);
  const [currencyRates, setCurrencyRates] = useState<CurrencyRate>({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const [formData, setFormData] = useState({
    description: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    paidBy: '',
    amount: '',
    currency: 'USD',
    remarks: '',
  });

  const [convertedAmount, setConvertedAmount] = useState<number>(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [countriesData, ratesData] = await Promise.all([
          fetchCountries(),
          fetchCurrencyRates(company?.currency || 'USD'),
        ]);
        setCountries(countriesData);
        setCurrencyRates(ratesData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, [company]);

  useEffect(() => {
    if (formData.amount && formData.currency && currencyRates) {
      const amount = parseFloat(formData.amount);
      if (!isNaN(amount)) {
        const converted = convertCurrency(
          amount,
          formData.currency,
          company?.currency || 'USD',
          currencyRates
        );
        setConvertedAmount(converted);
      }
    }
  }, [formData.amount, formData.currency, currencyRates, company?.currency]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleScanComplete = (data: any) => {
    setFormData(prev => ({
      ...prev,
      amount: data.amount.toString(),
      category: data.category,
      description: data.description,
      date: data.date,
    }));
    setIsScannerOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Mock API call - in real app, this would submit to your backend
      console.log('Submitting expense:', {
        ...formData,
        amount: parseFloat(formData.amount),
        convertedAmount,
        receipt: selectedFile,
      });

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      router.push('/expenses?success=true');
    } catch (error) {
      console.error('Error submitting expense:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedCountry = countries.find(c => c.name.common === formData.country);
  const availableCurrencies = selectedCountry ? Object.keys(selectedCountry.currencies) : ['USD'];

  return (
    <Layout>
        <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Submit New Expense</h1>
          <p className="mt-1 text-sm text-gray-500">
            Fill in the details below to submit your expense claim.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Expense Details</h3>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter expense description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Expense Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  name="category"
                  id="category"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="">Select a category</option>
                  {expenseCategories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="paidBy" className="block text-sm font-medium text-gray-700">
                  Paid By
                </label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    name="paidBy"
                    id="paidBy"
                    required
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Search and select user"
                    value={formData.paidBy}
                    onChange={handleInputChange}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500">Search and select the user who paid for this expense</p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                    Total Amount
                  </label>
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    step="0.01"
                    min="0"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                    Currency
                  </label>
                  <select
                    name="currency"
                    id="currency"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={formData.currency}
                    onChange={handleInputChange}
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="JPY">JPY - Japanese Yen</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                    <option value="AUD">AUD - Australian Dollar</option>
                    <option value="CHF">CHF - Swiss Franc</option>
                    <option value="CNY">CNY - Chinese Yuan</option>
                    <option value="INR">INR - Indian Rupee</option>
                    <option value="BRL">BRL - Brazilian Real</option>
                  </select>
                </div>
              </div>

              {convertedAmount > 0 && formData.currency !== company?.currency && (
                <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                  <p className="text-sm text-blue-800">
                    <strong>Converted to company currency:</strong> {company?.currency} {convertedAmount.toFixed(2)}
                  </p>
                </div>
              )}

              <div>
                <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">
                  Remarks
                </label>
                <textarea
                  name="remarks"
                  id="remarks"
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Additional notes or remarks..."
                  value={formData.remarks}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Receipt Upload (Optional)</h3>
            
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {previewUrl ? (
                  <div className="space-y-4">
                    <img
                      src={previewUrl}
                      alt="Receipt preview"
                      className="mx-auto h-32 w-auto object-contain"
                    />
                    <p className="text-sm text-gray-500">{selectedFile?.name}</p>
                    <div className="flex justify-center space-x-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFile(null);
                          setPreviewUrl('');
                        }}
                        className="text-sm text-red-600 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <CameraIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex flex-col space-y-2 text-sm text-gray-600">
                      <div className="flex justify-center">
                        <label
                          htmlFor="receipt"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="receipt"
                            name="receipt"
                            type="file"
                            accept="image/*,.pdf"
                            className="sr-only"
                            onChange={handleFileChange}
                          />
                        </label>
                        <span className="mx-2">or</span>
                        <button
                          type="button"
                          onClick={() => setIsScannerOpen(true)}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Scan with OCR
                        </button>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Submitting...' : 'Submit Expense'}
            </button>
          </div>
        </form>

        {/* OCR Scanner Modal */}
        {isScannerOpen && (
          <ReceiptScanner
            onScanComplete={handleScanComplete}
            onClose={() => setIsScannerOpen(false)}
          />
        )}
      </div>
    </Layout>
  );
}
