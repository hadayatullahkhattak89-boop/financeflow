import React, { useState } from 'react';
import { CategoryBudget, Transaction, CurrencyConfig, ExpenseCategory } from '../types/finance';

interface BudgetManagerProps {
  budgets: CategoryBudget[];
  transactions: Transaction[];
  currency: CurrencyConfig;
  onUpdateBudget: (category: ExpenseCategory, newLimit: number) => void;
}

export const BudgetManager: React.FC<BudgetManagerProps> = ({
  budgets,
  transactions,
  currency,
  onUpdateBudget,
}) => {
  const [editingCategory, setEditingCategory] = useState<ExpenseCategory | null>(null);
  const [tempLimit, setTempLimit] = useState('');

  // Calculate current month's expenses per category
  const currentMonthExpenses: Record<string, number> = {};
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      currentMonthExpenses[t.category] = (currentMonthExpenses[t.category] || 0) + t.amount;
    });

  const totalBudget = budgets.reduce((acc, b) => acc + b.limit, 0);
  const totalSpent = Object.values(currentMonthExpenses).reduce((acc, val) => acc + val, 0);

  const startEdit = (b: CategoryBudget) => {
    setEditingCategory(b.category);
    setTempLimit(b.limit.toString());
  };

  const saveEdit = (category: ExpenseCategory) => {
    const parsed = parseFloat(tempLimit);
    if (!isNaN(parsed) && parsed >= 0) {
      onUpdateBudget(category, parsed);
    }
    setEditingCategory(null);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Category Budget Limits
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Set financial thresholds to prevent lifestyle creep
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
          <span>Overall:</span>
          <span className={totalSpent > totalBudget ? 'text-rose-600 font-bold' : 'text-emerald-600 font-bold'}>
            {currency.symbol}{(totalSpent * currency.rateToUSD).toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </span>
          <span>/ {currency.symbol}{(totalBudget * currency.rateToUSD).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {budgets.map((b) => {
          const spent = currentMonthExpenses[b.category] || 0;
          const pct = Math.min(100, Math.round((spent / b.limit) * 100));
          const isOver = spent > b.limit;
          const convertedSpent = (spent * currency.rateToUSD).toLocaleString(undefined, { maximumFractionDigits: 0 });
          const convertedLimit = (b.limit * currency.rateToUSD).toLocaleString(undefined, { maximumFractionDigits: 0 });

          return (
            <div
              key={b.category}
              className={`p-4 rounded-2xl border transition-all ${
                isOver
                  ? 'border-rose-300 dark:border-rose-800 bg-rose-50/30 dark:bg-rose-950/20'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-slate-800 dark:text-slate-200">
                  {b.category}
                </span>

                {editingCategory === b.category ? (
                  <div className="flex items-center space-x-1">
                    <input
                      type="number"
                      value={tempLimit}
                      onChange={(e) => setTempLimit(e.target.value)}
                      className="w-20 px-2 py-0.5 rounded text-xs bg-white dark:bg-slate-900 border border-indigo-500 font-bold"
                    />
                    <button
                      onClick={() => saveEdit(b.category)}
                      className="text-xs px-2 py-0.5 rounded bg-indigo-600 text-white font-bold"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => startEdit(b)}
                    className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
                  >
                    Edit Limit
                  </button>
                )}
              </div>

              <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 mb-2">
                <span>
                  Spent: <b className="text-slate-800 dark:text-slate-200">{currency.symbol}{convertedSpent}</b>
                </span>
                <span>
                  Budget: <b className="text-slate-800 dark:text-slate-200">{currency.symbol}{convertedLimit}</b>
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isOver
                      ? 'bg-rose-500'
                      : pct > 80
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>

              <div className="mt-2 flex items-center justify-between text-[11px]">
                <span className={isOver ? 'text-rose-600 font-bold' : 'text-slate-400'}>
                  {pct}% of limit used
                </span>
                {isOver && (
                  <span className="font-bold text-rose-600 bg-rose-100 dark:bg-rose-950 px-2 py-0.5 rounded-md">
                    Over Budget by {currency.symbol}{((spent - b.limit) * currency.rateToUSD).toLocaleString()}!
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
