import { Expense, Category } from '../types';

export const DEMO_CATEGORIES: Category[] = [
  { id: '1', name: 'Food', icon: '🍕', color: '#FF6B6B' },
  { id: '2', name: 'Transport', icon: '🚗', color: '#4ECDC4' },
  { id: '3', name: 'Shopping', icon: '🛍️', color: '#45B7D1' },
  { id: '4', name: 'Bills', icon: '📄', color: '#96CEB4' },
  { id: '5', name: 'Entertainment', icon: '🎬', color: '#FFEAA7' },
  { id: '6', name: 'Healthcare', icon: '💊', color: '#DDA0DD' },
];

export const DEMO_EXPENSES: Expense[] = [
  {
    id: '1',
    amount: 25.50,
    category: 'Food',
    note: 'Lunch at Subway',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
  },
  {
    id: '2',
    amount: 45.00,
    category: 'Transport',
    note: 'Gas station',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000,
  },
  {
    id: '3',
    amount: 120.00,
    category: 'Shopping',
    note: 'New clothes from H&M',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000,
  },
  {
    id: '4',
    amount: 85.00,
    category: 'Bills',
    note: 'Electricity bill',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000,
  },
  {
    id: '5',
    amount: 15.00,
    category: 'Food',
    note: 'Coffee and pastry',
    date: new Date().toISOString(),
    timestamp: Date.now(),
  },
  {
    id: '6',
    amount: 65.00,
    category: 'Entertainment',
    note: 'Movie tickets',
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000,
  },
  {
    id: '7',
    amount: 30.00,
    category: 'Healthcare',
    note: 'Pharmacy',
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    timestamp: Date.now() - 6 * 24 * 60 * 60 * 1000,
  },
  {
    id: '8',
    amount: 18.50,
    category: 'Food',
    note: 'Dinner at McDonald\'s',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000,
  },
];

// Function to populate demo data
export const populateDemoData = async (storage: any) => {
  try {
    // Add demo categories
    for (const category of DEMO_CATEGORIES) {
      await storage.saveCategory(category);
    }
    
    // Add demo expenses
    for (const expense of DEMO_EXPENSES) {
      await storage.saveExpense(expense);
    }
    
    console.log('Demo data populated successfully!');
  } catch (error) {
    console.error('Error populating demo data:', error);
  }
};
