import { Expense, Category, ExpenseSummary, CategoryBreakdown, FilterOptions } from '../types';
import { getTodayRange, getThisWeekRange, getThisMonthRange, isDateInRange } from './dateUtils';

export const calculateExpenseSummary = (expenses: Expense[], startDate: Date, endDate: Date): ExpenseSummary => {
  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return isDateInRange(expenseDate, startDate, endDate);
  });

  const total = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const count = filteredExpenses.length;

  return { total, count };
};

export const getExpenseSummaries = (expenses: Expense[]) => {
  const todayRange = getTodayRange();
  const weekRange = getThisWeekRange();
  const monthRange = getThisMonthRange();

  return {
    today: calculateExpenseSummary(expenses, todayRange.start, todayRange.end),
    thisWeek: calculateExpenseSummary(expenses, weekRange.start, weekRange.end),
    thisMonth: calculateExpenseSummary(expenses, monthRange.start, monthRange.end),
  };
};

export const getCategoryBreakdown = (expenses: Expense[], categories: Category[], startDate: Date, endDate: Date): CategoryBreakdown[] => {
  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return isDateInRange(expenseDate, startDate, endDate);
  });

  const totalSpent = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const breakdown: { [key: string]: number } = {};
  filteredExpenses.forEach(expense => {
    breakdown[expense.category] = (breakdown[expense.category] || 0) + expense.amount;
  });

  return Object.entries(breakdown).map(([categoryName, total]) => {
    const category = categories.find(cat => cat.name === categoryName);
    const percentage = totalSpent > 0 ? (total / totalSpent) * 100 : 0;
    
    return {
      category: categoryName,
      total,
      percentage: Math.round(percentage * 100) / 100,
      icon: category?.icon || '📌',
      color: category?.color || '#FFEAA7',
    };
  }).sort((a, b) => b.total - a.total);
};

export const filterAndSortExpenses = (expenses: Expense[], options: FilterOptions): Expense[] => {
  let filtered = [...expenses];

  // Filter by category
  if (options.category) {
    filtered = filtered.filter(expense => expense.category === options.category);
  }

  // Filter by search query
  if (options.searchQuery) {
    const query = options.searchQuery.toLowerCase();
    filtered = filtered.filter(expense => 
      expense.note?.toLowerCase().includes(query) || 
      expense.category.toLowerCase().includes(query)
    );
  }

  // Sort expenses
  filtered.sort((a, b) => {
    if (options.sortBy === 'date') {
      return options.sortOrder === 'asc' 
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return options.sortOrder === 'asc' 
        ? a.amount - b.amount
        : b.amount - a.amount;
    }
  });

  return filtered;
};

export const generateChartData = (expenses: Expense[], categories: Category[], startDate: Date, endDate: Date) => {
  const breakdown = getCategoryBreakdown(expenses, categories, startDate, endDate);
  
  return breakdown.map(item => ({
    name: item.category,
    amount: item.total,
    color: item.color,
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  }));
};
