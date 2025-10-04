export type UserRole = 'admin' | 'manager' | 'employee';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  companyId: string;
  managerId?: string;
  isManagerApprover: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Company {
  id: string;
  name: string;
  country: string;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Expense {
  id: string;
  employeeId: string;
  amount: number;
  currency: string;
  category: string;
  description: string;
  date: Date;
  status: 'pending' | 'approved' | 'rejected';
  receiptUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  approvalHistory: ApprovalHistory[];
}

export interface ApprovalHistory {
  id: string;
  expenseId: string;
  approverId: string;
  status: 'pending' | 'approved' | 'rejected';
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApprovalRule {
  id: string;
  companyId: string;
  name: string;
  type: 'percentage' | 'specific' | 'hybrid';
  percentage?: number;
  specificApproverId?: string;
  hybridRules?: {
    percentage: number;
    specificApproverId: string;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApprovalFlow {
  id: string;
  companyId: string;
  name: string;
  steps: ApprovalStep[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApprovalStep {
  id: string;
  approverId: string;
  order: number;
  isRequired: boolean;
}

export interface Country {
  name: {
    common: string;
    official: string;
  };
  currencies: Record<string, {
    name: string;
    symbol: string;
  }>;
}

export interface CurrencyRate {
  [currency: string]: number;
}

export interface AuthContextType {
  user: User | null;
  company: Company | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export interface ExpenseFormData {
  amount: number;
  currency: string;
  category: string;
  description: string;
  date: string;
  receipt?: File;
}

export interface ApprovalFormData {
  status: 'approved' | 'rejected';
  comment: string;
}
