export interface Expense {
  id: string;
  amount: number;
  category: string;
  note?: string;
  date: string;
  timestamp: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface ExpenseSummary {
  total: number;
  count: number;
}

export interface CategoryBreakdown {
  category: string;
  total: number;
  percentage: number;
  icon: string;
  color: string;
}

export interface DateRange {
  start: Date;
  end: Date;
}

export interface FilterOptions {
  category?: string;
  searchQuery?: string;
  sortBy: 'date' | 'amount';
  sortOrder: 'asc' | 'desc';
}