import { format, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isToday, isThisWeek, isThisMonth } from 'date-fns';

export const formatDate = (date: Date): string => {
  return format(date, 'MMM dd, yyyy');
};

export const formatTime = (date: Date): string => {
  return format(date, 'HH:mm');
};

export const getTodayRange = (): { start: Date; end: Date } => {
  const now = new Date();
  return {
    start: startOfDay(now),
    end: endOfDay(now),
  };
};

export const getThisWeekRange = (): { start: Date; end: Date } => {
  const now = new Date();
  return {
    start: startOfWeek(now, { weekStartsOn: 1 }),
    end: endOfWeek(now, { weekStartsOn: 1 }),
  };
};

export const getThisMonthRange = (): { start: Date; end: Date } => {
  const now = new Date();
  return {
    start: startOfMonth(now),
    end: endOfMonth(now),
  };
};

export const isDateInRange = (date: Date, start: Date, end: Date): boolean => {
  return date >= start && date <= end;
};

export const groupExpensesByDate = (expenses: any[]) => {
  const grouped: { [key: string]: any[] } = {};
  
  expenses.forEach(expense => {
    const date = format(new Date(expense.date), 'yyyy-MM-dd');
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(expense);
  });
  
  return grouped;
};

export const getRelativeDateLabel = (date: Date): string => {
  if (isToday(date)) return 'Today';
  if (isThisWeek(date)) return 'This Week';
  if (isThisMonth(date)) return 'This Month';
  return formatDate(date);
};
