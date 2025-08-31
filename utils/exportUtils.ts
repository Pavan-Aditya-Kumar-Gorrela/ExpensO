import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Expense, Category } from '../types';
import { format } from 'date-fns';

export interface ExportData {
  month: string;
  year: number;
  totalExpenses: number;
  totalAmount: number;
  expenses: Expense[];
  categories: Category[];
}

export const exportExpensesToExcel = async (
  expenses: Expense[],
  categories: Category[],
  month: Date
): Promise<void> => {
  try {
    // Filter expenses for the specified month
    const monthStart = new Date(month.getFullYear(), month.getMonth(), 1);
    const monthEnd = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    
    const monthExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= monthStart && expenseDate <= monthEnd;
    });

    // Calculate totals
    const totalAmount = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const totalExpenses = monthExpenses.length;

    // Create CSV content (Excel can open CSV files)
    const csvContent = generateCSVContent(monthExpenses, categories, month, totalAmount, totalExpenses);

    // Generate filename
    const monthName = format(month, 'MMMM yyyy');
    const filename = `ExpensO_${monthName.replace(' ', '_')}.csv`;

    // Save file to app's documents directory
    const fileUri = `${FileSystem.documentDirectory}${filename}`;
    await FileSystem.writeAsStringAsync(fileUri, csvContent, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    // Share the file
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri, {
        mimeType: 'text/csv',
        dialogTitle: `Export ${monthName} Expenses`,
        UTI: 'public.comma-separated-values-text',
      });
    } else {
      throw new Error('Sharing is not available on this device');
    }
  } catch (error) {
    console.error('Error exporting expenses:', error);
    throw new Error('Failed to export expenses');
  }
};

const generateCSVContent = (
  expenses: Expense[],
  categories: Category[],
  month: Date,
  totalAmount: number,
  totalExpenses: number
): string => {
  const monthName = format(month, 'MMMM yyyy');
  
  // CSV header
  let csv = `ExpensO - ${monthName} Expense Report\n`;
  csv += `Generated on: ${format(new Date(), 'MMMM dd, yyyy HH:mm')}\n`;
  csv += `Total Expenses: ${totalExpenses}\n`;
  csv += `Total Amount: $${totalAmount.toFixed(2)}\n\n`;
  
  // Column headers
  csv += 'Date,Category,Amount,Note,Timestamp\n';
  
  // Expense data
  expenses.forEach(expense => {
    const category = categories.find(cat => cat.name === expense.category);
    const categoryIcon = category ? category.icon : '';
    const date = format(new Date(expense.date), 'MM/dd/yyyy');
    const amount = expense.amount.toFixed(2);
    const note = expense.note ? `"${expense.note.replace(/"/g, '""')}"` : '';
    const timestamp = format(new Date(expense.timestamp), 'MM/dd/yyyy HH:mm');
    
    csv += `${date},${categoryIcon} ${expense.category},$${amount},${note},${timestamp}\n`;
  });
  
  // Summary by category
  csv += '\nCategory Breakdown:\n';
  csv += 'Category,Total Amount,Count,Percentage\n';
  
  const categoryBreakdown = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = { total: 0, count: 0 };
    }
    acc[expense.category].total += expense.amount;
    acc[expense.category].count += 1;
    return acc;
  }, {} as Record<string, { total: number; count: number }>);

  Object.entries(categoryBreakdown).forEach(([category, data]) => {
    const percentage = ((data.total / totalAmount) * 100).toFixed(1);
    csv += `${category},$${data.total.toFixed(2)},${data.count},${percentage}%\n`;
  });

  return csv;
};

export const getExportData = (
  expenses: Expense[],
  categories: Category[],
  month: Date
): ExportData => {
  const monthStart = new Date(month.getFullYear(), month.getMonth(), 1);
  const monthEnd = new Date(month.getFullYear(), month.getMonth() + 1, 0);
  
  const monthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= monthStart && expenseDate <= monthEnd;
  });

  const totalAmount = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalExpenses = monthExpenses.length;

  return {
    month: format(month, 'MMMM yyyy'),
    year: month.getFullYear(),
    totalExpenses,
    totalAmount,
    expenses: monthExpenses,
    categories,
  };
};
