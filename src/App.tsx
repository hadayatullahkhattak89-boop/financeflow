import React, { useState, useEffect } from 'react';
import { Transaction, CategoryBudget, SavingsGoal, CurrencyConfig, ExpenseCategory } from './types/finance';
import { CURRENCIES, INITIAL_TRANSACTIONS, INITIAL_BUDGETS, INITIAL_GOALS } from './data/initialData';
import { Navbar } from './components/Navbar';
import { StatCard } from './components/StatCard';
import { AnalyticsCharts } from './components/AnalyticsCharts';
import { TransactionModal } from './components/TransactionModal';
import { TransactionList } from './components/TransactionList';
import { BudgetManager } from './components/BudgetManager';
import { GoalsTracker } from './components/GoalsTracker';

export const App: React.FC = () => {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('ff_theme') === 'dark' ||
      (!('ff_theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Active Tab state
  const [currentTab, setCurrentTab] = useState<'overview' | 'transactions' | 'budgets' | 'goals'>('overview');

  // Currency state
  const [currency, setCurrency] = useState<CurrencyConfig>(() => {
    const saved = localStorage.getItem('ff_currency');
    return saved ? JSON.parse(saved) : CURRENCIES[0];
  });

  // Transactions state
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('ff_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  // Budgets state
  const [budgets, setBudgets] = useState<CategoryBudget[]>(() => {
    const saved = localStorage.getItem('ff_budgets');
    return saved ? JSON.parse(saved) : INITIAL_BUDGETS;
  });

  // Goals state
  const [goals, setGoals] = useState<SavingsGoal[]>(() => {
    const saved = localStorage.getItem('ff_goals');
    return saved ? JSON.parse(saved) : INITIAL_GOALS;
  });

  // Add Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Sync theme with HTML class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('ff_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('ff_theme', 'light');
    }
  }, [darkMode]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('ff_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('ff_budgets', JSON.stringify(budgets));
  }, [budgets]);

  useEffect(() => {
    localStorage.setItem('ff_goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('ff_currency', JSON.stringify(currency));
  }, [currency]);

  // Financial KPI calculations
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const netBalance = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? Math.round(((totalIncome - totalExpense) / totalIncome) * 100) : 0;

  // Handlers
  const handleAddTransaction = (newTx: Omit<Transaction, 'id'>) => {
    const created: Transaction = {
      ...newTx,
      id: `tx-${Date.now()}`
    };
    setTransactions([created, ...transactions]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const handleUpdateBudget = (category: ExpenseCategory, newLimit: number) => {
    setBudgets(budgets.map(b => b.category === category ? { ...b, limit: newLimit } : b));
  };

  const handleAddGoalFunds = (goalId: string, amount: number) => {
    setGoals(goals.map(g => g.id === goalId ? { ...g, currentAmount: g.currentAmount + amount } : g));
  };

  const handleNewGoal = (goal: Omit<SavingsGoal, 'id'>) => {
    const created: SavingsGoal = {
      ...goal,
      id: `goal-${Date.now()}`
    };
    setGoals([...goals, created]);
  };

  // Reset demo data helper
  const handleResetData = () => {
    if (window.confirm('Reset all demo financial data to initial state?')) {
      setTransactions(INITIAL_TRANSACTIONS);
      setBudgets(INITIAL_BUDGETS);
      setGoals(INITIAL_GOALS);
      setCurrency(CURRENCIES[0]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        currency={currency}
        setCurrency={setCurrency}
        currencies={CURRENCIES}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenAddModal={() => setIsAddModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* KPI Summary Cards Bar */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatCard
            title="Net Cash Position"
            amount={`${currency.symbol}${(netBalance * currency.rateToUSD).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            subtitle="Current Liquid Reserves"
            trend={{ value: '+14.2% MoM', isPositive: true }}
            iconType="balance"
          />
          <StatCard
            title="Total Inflow"
            amount={`${currency.symbol}${(totalIncome * currency.rateToUSD).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            subtitle="Revenue & Client Retainers"
            trend={{ value: '+8.5%', isPositive: true }}
            iconType="income"
          />
          <StatCard
            title="Total Outflow"
            amount={`${currency.symbol}${(totalExpense * currency.rateToUSD).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            subtitle="Operating & Living Costs"
            trend={{ value: '-3.1% Controlled', isPositive: true }}
            iconType="expense"
          />
          <StatCard
            title="Net Savings Rate"
            amount={`${savingsRate}%`}
            subtitle="Allocated to Growth & Assets"
            trend={{ value: savingsRate >= 40 ? 'Healthy' : 'Below Target', isPositive: savingsRate >= 40 }}
            iconType="savings"
          />
        </section>

        {/* Tab 1: Overview */}
        {currentTab === 'overview' && (
          <div className="space-y-8">
            {/* Visual Analytics */}
            <AnalyticsCharts
              transactions={transactions}
              currency={currency}
            />

            {/* Recent Transactions & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <TransactionList
                  transactions={transactions.slice(0, 5)}
                  onDelete={handleDeleteTransaction}
                  currency={currency}
                  onOpenAddModal={() => setIsAddModalOpen(true)}
                />
              </div>

              {/* Quick Summary Aside */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    Quick Financial Health
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                    Real-time liquidity and reserve telemetry.
                  </p>

                  <div className="space-y-4 text-xs font-semibold">
                    <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                      <span className="text-slate-500">Active Currency</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{currency.label}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                      <span className="text-slate-500">Savings Goals Total</span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">
                        {currency.symbol}{(goals.reduce((acc, g) => acc + g.currentAmount, 0) * currency.rateToUSD).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                      <span className="text-slate-500">Operating Budget Cap</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {currency.symbol}{(budgets.reduce((acc, b) => acc + b.limit, 0) * currency.rateToUSD).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={handleResetData}
                    className="text-xs text-slate-400 hover:text-rose-500 transition font-medium"
                  >
                    Reset Demo Data
                  </button>
                  <button
                    onClick={() => setCurrentTab('transactions')}
                    className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                  >
                    View All Transactions →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: All Transactions */}
        {currentTab === 'transactions' && (
          <TransactionList
            transactions={transactions}
            onDelete={handleDeleteTransaction}
            currency={currency}
            onOpenAddModal={() => setIsAddModalOpen(true)}
          />
        )}

        {/* Tab 3: Budget Limits */}
        {currentTab === 'budgets' && (
          <BudgetManager
            budgets={budgets}
            transactions={transactions}
            currency={currency}
            onUpdateBudget={handleUpdateBudget}
          />
        )}

        {/* Tab 4: Savings Goals */}
        {currentTab === 'goals' && (
          <GoalsTracker
            goals={goals}
            currency={currency}
            onAddFunds={handleAddGoalFunds}
            onNewGoal={handleNewGoal}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-center text-xs text-slate-500 transition-colors">
        <p className="font-medium">
          Built with precision by{' '}
          <a
            href="https://github.com/hadayatullahkhattak89-boop"
            target="_blank"
            rel="noreferrer"
            className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Hadayat Ullah
          </a>{' '}
          • React 18, TypeScript & Tailwind CSS • Powered by ApexCraft Studio
        </p>
      </footer>

      {/* Add Transaction Modal */}
      <TransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddTransaction}
        currencySymbol={currency.symbol}
      />
    </div>
  );
};
