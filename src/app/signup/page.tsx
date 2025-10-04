"use client";

<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { EyeIcon, EyeSlashIcon, BuildingOfficeIcon } from "@heroicons/react/24/outline";

type Country = {
  name: { common: string };
  cca2: string;
  currencies?: {
    [code: string]: {
      name: string;
      symbol?: string;
    };
  };
};
=======
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Country } from '@/types';
import { EyeIcon, EyeSlashIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
>>>>>>> 9bdf233 (updates frontend signup)

export default function SignupPage() {
  // Use a single state object to manage all form fields
  const [formData, setFormData] = useState({
<<<<<<< HEAD
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    currency: "",
=======
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '', // This will store the country's cca2 code
    currency: '',
>>>>>>> 9bdf233 (updates frontend signup)
  });

  const [countries, setCountries] = useState<Country[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
<<<<<<< HEAD
  const [error, setError] = useState("");

  const { signup } = useAuth();
  const router = useRouter();

=======
  const [error, setError] = useState('');
  
  // Assuming your AuthContext provides a 'signup' function
  const { signup } = useAuth(); 
  const router = useRouter();

  // Generic handler to update the formData state object
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Effect to fetch countries on component mount
>>>>>>> 9bdf233 (updates frontend signup)
  useEffect(() => {
    const loadCountries = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2,currencies");
        const data: Country[] = await res.json();
<<<<<<< HEAD
        const sorted = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        setCountries(sorted);
        if (sorted.length > 0) {
          const defaultCountry = sorted[0];
          const currencyCode = defaultCountry.currencies ? Object.keys(defaultCountry.currencies)[0] : "";
          setFormData((prev) => ({
            ...prev,
=======
        data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        setCountries(data);

        // Set a default country and currency on load
        if (data.length > 0) {
          const defaultCountry = data[0];
          const currencyCode = defaultCountry.currencies ? Object.keys(defaultCountry.currencies)[0] : '';
          setFormData(prevData => ({
            ...prevData,
>>>>>>> 9bdf233 (updates frontend signup)
            country: defaultCountry.cca2,
            currency: currencyCode,
          }));
        }
      } catch (err) {
        console.error("Failed to fetch countries", err);
        setError("Could not load country data.");
      }
    };
    loadCountries();
  }, []);

<<<<<<< HEAD
  useEffect(() => {
    const country = countries.find((c) => c.cca2 === formData.country);
    const code = country?.currencies ? Object.keys(country.currencies)[0] : "";
    setFormData((prev) => ({
      ...prev,
      currency: code,
    }));
  }, [formData.country, countries]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
=======
  // Effect to update the currency whenever the selected country changes
  useEffect(() => {
    if (formData.country) {
      const countryDetails = countries.find((c) => c.cca2 === formData.country);
      if (countryDetails?.currencies) {
        const currencyCode = Object.keys(countryDetails.currencies)[0] || "";
        setFormData(prevData => ({ ...prevData, currency: currencyCode }));
      }
    }
  }, [formData.country, countries]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

>>>>>>> 9bdf233 (updates frontend signup)
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setIsLoading(true);
    try {
<<<<<<< HEAD
      await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        country: formData.country,
        currency: formData.currency,
      });
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to sign up");
=======
      await signup(formData);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to sign up. Please try again.");
>>>>>>> 9bdf233 (updates frontend signup)
    } finally {
      setIsLoading(false);
    }
  };

<<<<<<< HEAD
  const selectedCountry = countries.find((c) => c.cca2 === formData.country);
  const availableCurrencies = selectedCountry?.currencies ? Object.keys(selectedCountry.currencies) : [];
=======
  // Find the currently selected country object to populate the currency dropdown
  const selectedCountryDetails = countries.find(c => c.cca2 === formData.country);
>>>>>>> 9bdf233 (updates frontend signup)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-indigo-100">
            <BuildingOfficeIcon className="h-6 w-6 text-indigo-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create Your Company Account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Set up your expense management system</p>
        </div>
<<<<<<< HEAD

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              >
                {countries.map((c) => (
                  <option key={c.cca2} value={c.cca2}>
                    {c.name.common}
=======
        
        {/* A single, correctly structured form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Admin Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="John Doe"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@company.com"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              placeholder="Minimum 6 characters"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.password}
              onChange={handleInputChange}
            />
            <button
              type="button"
              className="absolute right-3 top-8 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              required
              placeholder="Confirm your password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            <button
              type="button"
              className="absolute right-3 top-8 text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Country</label>
            <select
              name="country"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.country}
              onChange={handleInputChange}
            >
              {countries.map((country) => (
                <option key={country.cca2} value={country.cca2}>
                  {country.name.common}
                </option>
              ))}
            </select>
          </div>

          {/* Currency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Default Currency</label>
            <select
              name="currency"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.currency}
              onChange={handleInputChange}
              disabled={!selectedCountryDetails}
            >
              {selectedCountryDetails?.currencies &&
                Object.keys(selectedCountryDetails.currencies).map((code) => (
                  <option key={code} value={code}>
                    {code} — {selectedCountryDetails.currencies[code].name}
>>>>>>> 9bdf233 (updates frontend signup)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Currency</label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              >
                {availableCurrencies.map((code) => (
                  <option key={code} value={code}>
                    {code} — {selectedCountry?.currencies?.[code]?.name}
                  </option>
                ))}
              </select>
            </div>

            {error && <div className="text-red-600 text-center">{error}</div>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>
          </div>
<<<<<<< HEAD
=======

          {/* Error Message Display */}
          {error && <p className="text-sm text-center text-red-600">{error}</p>}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? "Signing up..." : "Create Account"}
            </button>
          </div>
>>>>>>> 9bdf233 (updates frontend signup)
        </form>
      </div>
    </div>
  );
}
