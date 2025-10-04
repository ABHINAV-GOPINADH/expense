'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Company, AuthContextType } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const storedUser = localStorage.getItem('user');
    const storedCompany = localStorage.getItem('company');
    
    if (storedUser && storedCompany) {
      setUser(JSON.parse(storedUser));
      setCompany(JSON.parse(storedCompany));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock users database - in real app, this would come from your backend
      const mockUsers: User[] = [
        {
          id: '1',
          email: 'admin@company.com',
          name: 'John Admin',
          role: 'admin',
          companyId: '1',
          isManagerApprover: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          email: 'jane@company.com',
          name: 'Jane Manager',
          role: 'manager',
          companyId: '1',
          managerId: '1',
          isManagerApprover: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '3',
          email: 'mike@company.com',
          name: 'Mike Employee',
          role: 'employee',
          companyId: '1',
          managerId: '2',
          isManagerApprover: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '4',
          email: 'sarah@company.com',
          name: 'Sarah Employee',
          role: 'employee',
          companyId: '1',
          managerId: '2',
          isManagerApprover: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      const mockPasswords: Record<string, string> = {
        'admin@company.com': 'password',
        'jane@company.com': 'password',
        'mike@company.com': 'password',
        'sarah@company.com': 'password',
      };

      const foundUser = mockUsers.find(u => u.email === email);
      const correctPassword = mockPasswords[email];

      if (!foundUser || correctPassword !== password) {
        throw new Error('Invalid credentials');
      }

      const mockCompany: Company = {
        id: '1',
        name: 'Demo Company',
        country: 'United States',
        currency: 'USD',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setUser(foundUser);
      setCompany(mockCompany);
      
      localStorage.setItem('user', JSON.stringify(foundUser));
      localStorage.setItem('company', JSON.stringify(mockCompany));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setCompany(null);
    localStorage.removeItem('user');
    localStorage.removeItem('company');
  };

  return (
    <AuthContext.Provider value={{ user, company, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
