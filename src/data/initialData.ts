import { Transaction, CategoryBudget, SavingsGoal, CurrencyConfig } from '../types/finance';

export const CURRENCIES: CurrencyConfig[] = [
  { code: 'USD', symbol: '$', rateToUSD: 1, label: 'US Dollar ($)' },
  { code: 'PKR', symbol: '₨', rateToUSD: 280, label: 'Pakistani Rupee (₨)' },
  { code: 'GBP', symbol: '£', rateToUSD: 0.79, label: 'British Pound (£)' },
  { code: 'EUR', symbol: '€', rateToUSD: 0.92, label: 'Euro (€)' },
  { code: 'AED', symbol: 'AED', rateToUSD: 3.67, label: 'UAE Dirham (AED)' },
  { code: 'SAR', symbol: 'SAR', rateToUSD: 3.75, label: 'Saudi Riyal (SAR)' },
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    title: 'Client Web Development Milestone',
    amount: 1450,
    type: 'income',
    category: 'Freelance & Agency',
    date: '2026-11-01',
    notes: 'NextPOS SaaS custom deployment milestone 1',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: 'tx-2',
    title: 'Cloud VPS & Domain Renewal',
    amount: 45,
    type: 'expense',
    category: 'Utilities & Bills',
    date: '2026-11-02',
    notes: 'Hosting and DNS server renewals',
    paymentMethod: 'Card'
  },
  {
    id: 'tx-3',
    title: 'Monthly Apartment Rent',
    amount: 600,
    type: 'expense',
    category: 'Housing & Rent',
    date: '2026-11-01',
    notes: 'Studio rent for November',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: 'tx-4',
    title: 'Supermarket Groceries',
    amount: 120,
    type: 'expense',
    category: 'Groceries & Food',
    date: '2026-11-02',
    notes: 'Weekly pantry & fresh produce',
    paymentMethod: 'Card'
  },
  {
    id: 'tx-5',
    title: 'Fiverr Client Web Project',
    amount: 350,
    type: 'income',
    category: 'Freelance & Agency',
    date: '2026-10-29',
    notes: 'E-commerce redesign delivery',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: 'tx-6',
    title: 'Fiber Internet Subscription',
    amount: 35,
    type: 'expense',
    category: 'Utilities & Bills',
    date: '2026-10-28',
    notes: 'High-speed gigabit fiber line',
    paymentMethod: 'Card'
  },
  {
    id: 'tx-7',
    title: 'Gym & Fitness Membership',
    amount: 50,
    type: 'expense',
    category: 'Healthcare & Fitness',
    date: '2026-10-26',
    notes: 'Monthly wellness pass',
    paymentMethod: 'Card'
  },
  {
    id: 'tx-8',
    title: 'Dividend Payout',
    amount: 180,
    type: 'income',
    category: 'Investments & Dividends',
    date: '2026-10-25',
    notes: 'Quarterly index fund distribution',
    paymentMethod: 'Bank Transfer'
  }
];

export const INITIAL_BUDGETS: CategoryBudget[] = [
  { category: 'Housing & Rent', limit: 700 },
  { category: 'Groceries & Food', limit: 350 },
  { category: 'Utilities & Bills', limit: 120 },
  { category: 'Transportation', limit: 150 },
  { category: 'Healthcare & Fitness', limit: 100 },
  { category: 'Entertainment', limit: 100 },
  { category: 'Shopping & Personal', limit: 200 }
];

export const INITIAL_GOALS: SavingsGoal[] = [
  {
    id: 'goal-1',
    name: 'Emergency Fund (6 Months)',
    targetAmount: 5000,
    currentAmount: 3200,
    targetDate: '2026-12-31',
    color: '#10b981' // emerald
  },
  {
    id: 'goal-2',
    name: 'Next-Gen Workstation Setup',
    targetAmount: 1800,
    currentAmount: 1100,
    targetDate: '2027-02-15',
    color: '#6366f1' // indigo
  },
  {
    id: 'goal-3',
    name: 'Annual SaaS Development Cloud Fund',
    targetAmount: 1200,
    currentAmount: 850,
    targetDate: '2027-04-01',
    color: '#f59e0b' // amber
  }
];
