import React, { useState } from 'react';
import { SavingsGoal, CurrencyConfig } from '../types/finance';

interface GoalsTrackerProps {
  goals: SavingsGoal[];
  currency: CurrencyConfig;
  onAddFunds: (goalId: string, amount: number) => void;
  onNewGoal: (goal: Omit<SavingsGoal, 'id'>) => void;
}

export const GoalsTracker: React.FC<GoalsTrackerProps> = ({
  goals,
  currency,
  onAddFunds,
  onNewGoal,
}) => {
  const [activeGoalId, setActiveGoalId] = useState<string | null>(null);
  const [depositAmount, setDepositAmount] = useState('');
  const [showNewGoalModal, setShowNewGoalModal] = useState(false);

  // New goal state
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [targetDate, setTargetDate] = useState('2027-01-01');
  const [color, setColor] = useState('#6366f1');

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(depositAmount);
    if (!activeGoalId || isNaN(val) || val <= 0) return;
    onAddFunds(activeGoalId, val);
    setDepositAmount('');
    setActiveGoalId(null);
  };

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const target = parseFloat(targetAmount);
    const curr = parseFloat(currentAmount) || 0;
    if (!name.trim() || isNaN(target) || target <= 0) return;

    onNewGoal({
      name: name.trim(),
      targetAmount: target,
      currentAmount: curr,
      targetDate,
      color,
    });

    setName('');
    setTargetAmount('');
    setCurrentAmount('');
    setShowNewGoalModal(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Savings & Milestones
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Track capital allocation for future assets and emergency reserves
          </p>
        </div>

        <button
          onClick={() => setShowNewGoalModal(true)}
          className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          <span>Create New Goal</span>
        </button>
      </div>

      {/* Goals Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {goals.map((goal) => {
          const pct = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
          const convertedCurrent = (goal.currentAmount * currency.rateToUSD).toLocaleString(undefined, { maximumFractionDigits: 0 });
          const convertedTarget = (goal.targetAmount * currency.rateToUSD).toLocaleString(undefined, { maximumFractionDigits: 0 });

          return (
            <div
              key={goal.id}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 hover:border-indigo-400 transition"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: goal.color }} />
                <span className="text-[11px] font-semibold text-slate-400">
                  Target: {goal.targetDate}
                </span>
              </div>

              <h4 className="font-extrabold text-base text-slate-900 dark:text-white mb-2">
                {goal.name}
              </h4>

              <div className="flex justify-between items-baseline mb-3">
                <span className="text-2xl font-black text-slate-900 dark:text-white">
                  {currency.symbol}{convertedCurrent}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  / {currency.symbol}{convertedTarget}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden mb-2">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, backgroundColor: goal.color }}
                />
              </div>

              <div className="flex items-center justify-between text-xs mb-4">
                <span className="font-bold text-slate-700 dark:text-slate-300">{pct}% Complete</span>
                <span className="text-slate-400">
                  {currency.symbol}{((goal.targetAmount - goal.currentAmount) * currency.rateToUSD).toLocaleString(undefined, { maximumFractionDigits: 0 })} left
                </span>
              </div>

              <button
                onClick={() => setActiveGoalId(goal.id)}
                className="w-full py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold transition"
              >
                + Add Deposit
              </button>
            </div>
          );
        })}
      </div>

      {/* Deposit Modal */}
      {activeGoalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Add Funds to Goal
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              Enter amount to allocate into this reserve.
            </p>
            <form onSubmit={handleDeposit} className="space-y-4">
              <input
                type="number"
                step="0.01"
                min="0.01"
                required
                placeholder={`Amount in ${currency.symbol}`}
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold focus:ring-2 focus:ring-indigo-500"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setActiveGoalId(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Deposit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create New Goal Modal */}
      {showNewGoalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              Create New Savings Goal
            </h4>
            <form onSubmit={handleCreateGoal} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Goal Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. New Electric Vehicle Fund"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Target ({currency.symbol})</label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="3000"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Current Saved</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="500"
                    value={currentAmount}
                    onChange={(e) => setCurrentAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Target Date</label>
                <input
                  type="date"
                  required
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowNewGoalModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Create Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
