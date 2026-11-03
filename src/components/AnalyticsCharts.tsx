import React from 'react';
import { Transaction, CurrencyConfig } from '../types/finance';

interface AnalyticsChartsProps {
  transactions: Transaction[];
  currency: CurrencyConfig;
}

const CATEGORY_COLORS: Record<string, string> = {
  'Housing & Rent': '#6366f1', // indigo
  'Groceries & Food': '#10b981', // emerald
  'Transportation': '#f59e0b', // amber
  'Utilities & Bills': '#06b6d4', // cyan
  'Healthcare & Fitness': '#ec4899', // pink
  'Entertainment': '#8b5cf6', // purple
  'Shopping & Personal': '#f97316', // orange
  'Investment & Savings': '#14b8a6', // teal
  'Other': '#64748b', // slate
};

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ transactions, currency }) => {
  // 1. Calculate Expenses by Category
  const expenseByCategory: Record<string, number> = {};
  let totalExpenses = 0;

  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      expenseByCategory[t.category] = (expenseByCategory[t.category] || 0) + t.amount;
      totalExpenses += t.amount;
    });

  const sortedCategories = Object.entries(expenseByCategory)
    .sort((a, b) => b[1] - a[1]);

  // 2. Simulated Monthly Inflow vs Outflow (Past 6 Months)
  const monthlyData = [
    { month: 'Jun', income: 1400, expense: 950 },
    { month: 'Jul', income: 1650, expense: 1100 },
    { month: 'Aug', income: 1500, expense: 890 },
    { month: 'Sep', income: 1850, expense: 1200 },
    { month: 'Oct', income: 1980, expense: 830 },
    { month: 'Nov', income: 1800, expense: 765 },
  ];

  const maxVal = Math.max(...monthlyData.map(d => Math.max(d.income, d.expense)));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Category Breakdown Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              Expenses by Category
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Where your capital flows this period
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {currency.symbol}{(totalExpenses * currency.rateToUSD).toLocaleString(undefined, { maximumFractionDigits: 0 })} Total
          </span>
        </div>

        {sortedCategories.length === 0 ? (
          <div className="py-12 text-center text-slate-400 dark:text-slate-500 text-sm">
            No expenses recorded yet.
          </div>
        ) : (
          <div className="space-y-4">
            {sortedCategories.map(([category, amount]) => {
              const pct = totalExpenses > 0 ? Math.round((amount / totalExpenses) * 100) : 0;
              const color = CATEGORY_COLORS[category] || '#64748b';
              const converted = (amount * currency.rateToUSD).toLocaleString(undefined, { maximumFractionDigits: 0 });

              return (
                <div key={category}>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                    <span className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                      <span>{category}</span>
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {currency.symbol}{converted} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, backgroundColor: color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Cash Flow Trends (Income vs Expense) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              Cash Flow Velocity
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              6-Month Income vs Expense Trend
            </p>
          </div>
          <div className="flex items-center space-x-3 text-xs font-semibold">
            <span className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Income</span>
            </span>
            <span className="flex items-center space-x-1 text-rose-600 dark:text-rose-400">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span>Expenses</span>
            </span>
          </div>
        </div>

        {/* Responsive SVG Bar Chart */}
        <div className="h-64 flex items-end justify-between pt-8 pb-4 px-2 sm:px-4 border-b border-slate-100 dark:border-slate-800">
          {monthlyData.map((d) => {
            const incomeHeight = Math.round((d.income / maxVal) * 160);
            const expenseHeight = Math.round((d.expense / maxVal) * 160);

            return (
              <div key={d.month} className="flex flex-col items-center space-y-2 group">
                <div className="flex items-end space-x-1.5 sm:space-x-2 h-44">
                  {/* Income Bar */}
                  <div
                    title={`Income: ${currency.symbol}${(d.income * currency.rateToUSD).toLocaleString()}`}
                    style={{ height: `${incomeHeight}px` }}
                    className="w-3.5 sm:w-5 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-md transition-all group-hover:opacity-90"
                  />
                  {/* Expense Bar */}
                  <div
                    title={`Expense: ${currency.symbol}${(d.expense * currency.rateToUSD).toLocaleString()}`}
                    style={{ height: `${expenseHeight}px` }}
                    className="w-3.5 sm:w-5 bg-gradient-to-t from-rose-600 to-rose-400 rounded-t-md transition-all group-hover:opacity-90"
                  />
                </div>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {d.month}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Net Positive Savings: <b>+58.3%</b> average</span>
          <span>Targeting <b>65%</b> Goal</span>
        </div>
      </div>
    </div>
  );
};
