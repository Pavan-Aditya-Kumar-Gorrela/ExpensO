import AsyncStorage from '@react-native-async-storage/async-storage';
import { Expense, Category } from '../types';

const STORAGE_KEYS = {
  EXPENSES: 'expenses',
  CATEGORIES: 'categories',
};

// Default categories
export const DEFAULT_CATEGORIES: Category[] = [
  { id: '1', name: 'Food', icon: '🍕', color: '#FF6B6B' },
  { id: '2', name: 'Transport', icon: '🚗', color: '#4ECDC4' },
  { id: '3', name: 'Shopping', icon: '🛍️', color: '#45B7D1' },
  { id: '4', name: 'Bills', icon: '📄', color: '#96CEB4' },
  { id: '5', name: 'Other', icon: '📌', color: '#FFEAA7' },
];

// Initialize default categories if none exist
export const initializeDefaultCategories = async (): Promise<Category[]> => {
  try {
    const existingCategories = await getCategories();
    if (existingCategories.length === 0) {
      await AsyncStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
      return DEFAULT_CATEGORIES;
    }
    return existingCategories;
  } catch (error) {
    console.error('Error initializing default categories:', error);
    return DEFAULT_CATEGORIES;
  }
};

// Expense operations
export const saveExpense = async (expense: Expense): Promise<void> => {
  try {
    const expenses = await getExpenses();
    expenses.push(expense);
    await AsyncStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
  } catch (error) {
    console.error('Error saving expense:', error);
    throw error;
  }
};

export const getExpenses = async (): Promise<Expense[]> => {
  try {
    const expenses = await AsyncStorage.getItem(STORAGE_KEYS.EXPENSES);
    return expenses ? JSON.parse(expenses) : [];
  } catch (error) {
    console.error('Error getting expenses:', error);
    return [];
  }
};

export const deleteExpense = async (expenseId: string): Promise<void> => {
  try {
    const expenses = await getExpenses();
    const filteredExpenses = expenses.filter(expense => expense.id !== expenseId);
    await AsyncStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(filteredExpenses));
  } catch (error) {
    console.error('Error deleting expense:', error);
    throw error;
  }
};

export const clearAllExpenses = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.EXPENSES);
  } catch (error) {
    console.error('Error clearing expenses:', error);
    throw error;
  }
};

// Category operations
export const saveCategory = async (category: Category): Promise<void> => {
  try {
    const categories = await getCategories();
    const existingIndex = categories.findIndex(cat => cat.id === category.id);
    
    if (existingIndex >= 0) {
      categories[existingIndex] = category;
    } else {
      categories.push(category);
    }
    
    await AsyncStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  } catch (error) {
    console.error('Error saving category:', error);
    throw error;
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const categories = await AsyncStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return categories ? JSON.parse(categories) : [];
  } catch (error) {
    console.error('Error getting categories:', error);
    return [];
  }
};

export const deleteCategory = async (categoryId: string): Promise<void> => {
  try {
    const categories = await getCategories();
    const filteredCategories = categories.filter(category => category.id !== categoryId);
    await AsyncStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(filteredCategories));
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};

export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([STORAGE_KEYS.EXPENSES, STORAGE_KEYS.CATEGORIES]);
  } catch (error) {
    console.error('Error clearing all data:', error);
    throw error;
  }
};
