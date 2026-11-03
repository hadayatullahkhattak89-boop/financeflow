export type TransactionType = 'income' | 'expense';

export type ExpenseCategory = 
  | 'Housing & Rent'
  | 'Groceries & Food'
  | 'Transportation'
  | 'Utilities & Bills'
  | 'Healthcare & Fitness'
  | 'Entertainment'
  | 'Shopping & Personal'
  | 'Investment & Savings'
  | 'Other';

export type IncomeCategory =
  | 'Salary & Wages'
  | 'Freelance & Agency'
  | 'Investments & Dividends'
  | 'Business'
  | 'Gifts & Grants'
  | 'Other';

export type TransactionCategory = ExpenseCategory | IncomeCategory;

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  date: string; // YYYY-MM-DD
  notes?: string;
  paymentMethod?: 'Card' | 'Cash' | 'Bank Transfer' | 'Crypto' | 'Other';
}

export interface CategoryBudget {
  category: ExpenseCategory;
  limit: number;
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  color: string;
}

export type CurrencyCode = 'USD' | 'PKR' | 'EUR' | 'GBP' | 'AED' | 'SAR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rateToUSD: number; // For live converter display
  label: string;
}
