import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Alert,
  Dimensions,
} from 'react-native';
import { PieChart, BarChart } from 'react-native-chart-kit';
import { ExpenseCard } from '../components/ExpenseCard';
import { SummaryCard } from '../components/SummaryCard';
import { SearchAndFilter } from '../components/SearchAndFilter';
import { Expense, Category, FilterOptions } from '../types';
import { getExpenses, getCategories, deleteExpense, initializeDefaultCategories } from '../storage/asyncStorage';
import { getExpenseSummaries, getCategoryBreakdown, filterAndSortExpenses, generateChartData } from '../utils/expenseUtils';
import { groupExpensesByDate, formatDate } from '../utils/dateUtils';

const { width } = Dimensions.get('window');

export const HomeScreen: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    searchQuery: '',
    category: undefined,
    sortBy: 'date',
    sortOrder: 'desc',
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const filtered = filterAndSortExpenses(expenses, filterOptions);
    setFilteredExpenses(filtered);
  }, [expenses, filterOptions]);

  const loadData = async () => {
    try {
      const [expensesData, categoriesData] = await Promise.all([
        getExpenses(),
        getCategories(),
      ]);
      
      if (categoriesData.length === 0) {
        const defaultCategories = await initializeDefaultCategories();
        setCategories(defaultCategories);
      } else {
        setCategories(categoriesData);
      }
      
      setExpenses(expensesData);
    } catch (error) {
      console.error('Error loading data:', error);
      Alert.alert('Error', 'Failed to load data');
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleDeleteExpense = async (expenseId: string) => {
    Alert.alert(
      'Delete Expense',
      'Are you sure you want to delete this expense?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteExpense(expenseId);
              await loadData();
            } catch (error) {
              console.error('Error deleting expense:', error);
              Alert.alert('Error', 'Failed to delete expense');
            }
          },
        },
      ]
    );
  };

  const handleSearchChange = (query: string) => {
    setFilterOptions(prev => ({ ...prev, searchQuery: query }));
  };

  const handleCategoryChange = (category: string | undefined) => {
    setFilterOptions(prev => ({ ...prev, category }));
  };

  const handleSortChange = (sortBy: 'date' | 'amount', sortOrder: 'asc' | 'desc') => {
    setFilterOptions(prev => ({ ...prev, sortBy, sortOrder }));
  };

  const summaries = getExpenseSummaries(expenses);
  const monthlyBreakdown = getCategoryBreakdown(expenses, categories, new Date(new Date().getFullYear(), new Date().getMonth(), 1), new Date());
  const weeklyBreakdown = getCategoryBreakdown(expenses, categories, new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date());
  
  const pieChartData = generateChartData(expenses, categories, new Date(new Date().getFullYear(), new Date().getMonth(), 1), new Date());
  const barChartData = weeklyBreakdown.map((itemb, idx) => ({
    value: itemb.total,
    label: `${itemb.category}-${idx}`, // ✅ unique label
    frontColor: itemb.color,
  }));

  const groupedExpenses = groupExpensesByDate(filteredExpenses);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>ExpenseO</Text>
        <Text style={styles.subtitle}>Track your spending habits</Text>
      </View>

      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <SummaryCard
            key="today"
            title="Today"
            summary={summaries.today}
            color="#FF6B6B"
            icon="📅"
          />
          <SummaryCard
            key="week"
            title="This Week"
            summary={summaries.thisWeek}
            color="#4ECDC4"
            icon="📊"
          />
          <SummaryCard
            key="month"
            title="This Month"
            summary={summaries.thisMonth}
            color="#45B7D1"
            icon="📈"
          />
        </ScrollView>
      </View>

      {/* Search and Filter */}
      <SearchAndFilter
        searchQuery={filterOptions.searchQuery || ''}
        onSearchChange={handleSearchChange}
        selectedCategory={filterOptions.category}
        onCategoryChange={handleCategoryChange}
        categories={categories}
        sortBy={filterOptions.sortBy}
        sortOrder={filterOptions.sortOrder}
        onSortChange={handleSortChange}
      />

      {/* Charts Section */}
      {expenses.length > 0 && (
        <View style={styles.chartsContainer}>
          <Text style={styles.sectionTitle}>Monthly Spending by Category</Text>
          {pieChartData.length > 0 && (
            <PieChart
              data={pieChartData}
              width={width - 32}
              height={200}
              chartConfig={{
                backgroundColor: '#FFFFFF',
                backgroundGradientFrom: '#FFFFFF',
                backgroundGradientTo: '#FFFFFF',
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="amount"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          )}

          <Text style={styles.sectionTitle}>Weekly Spending</Text>
          {barChartData.length > 0 && (
            <BarChart
              data={{
                labels: barChartData.map(item => item.label),
                datasets: [{ data: barChartData.map(item => item.value) }],
              }}
              width={width - 32}
              height={200}
              yAxisLabel=""
              yAxisSuffix=""
              chartConfig={{
                backgroundColor: '#FFFFFF',
                backgroundGradientFrom: '#FFFFFF',
                backgroundGradientTo: '#FFFFFF',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                barPercentage: 0.7,
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          )}
        </View>
      )}

      {/* Expenses List */}
      <View style={styles.expensesContainer}>
        <Text style={styles.sectionTitle}>Recent Expenses</Text>
        {Object.keys(groupedExpenses).length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>💰</Text>
            <Text style={styles.emptyTitle}>No expenses yet</Text>
            <Text style={styles.emptySubtitle}>Start tracking your expenses to see them here</Text>
          </View>
        ) : (
          Object.entries(groupedExpenses).map(([date, dateExpenses]) => (
            <View key={String(date)} style={styles.dateGroup}>
              <Text style={styles.dateHeader}>{formatDate(new Date(date))}</Text>
              {dateExpenses.map((expense, idx) => {
                const category = categories.find(cat => cat.name === expense.category);
                return (
                  <ExpenseCard
                    key={expense.id || `${date}-${idx}`} // ✅ always unique
                    expense={expense}
                    category={category}
                    onDelete={() => handleDeleteExpense(expense.id)}
                  />
                );
              })}
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
  },
  summaryContainer: {
    paddingVertical: 16,
  },
  chartsContainer: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 16,
    textAlign: 'center',
  },
  expensesContainer: {
    paddingBottom: 20,
  },
  dateGroup: {
    marginBottom: 16,
  },
  dateHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A5568',
    marginHorizontal: 16,
    marginBottom: 8,
    marginTop: 8,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    marginHorizontal: 16,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 24,
  },
});
