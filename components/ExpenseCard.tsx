import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Expense, Category } from '../types';
import { formatDate, formatTime } from '../utils/dateUtils';

interface ExpenseCardProps {
  expense: Expense;
  category: Category | undefined;
  onPress?: () => void;
  onDelete?: () => void;
}

export const ExpenseCard: React.FC<ExpenseCardProps> = ({ 
  expense, 
  category, 
  onPress, 
  onDelete 
}) => {
  const expenseDate = new Date(expense.date);
  
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.leftSection}>
        <View style={[styles.iconContainer, { backgroundColor: category?.color || '#FFEAA7' }]}>
          <Text style={styles.icon}>{category?.icon || '📌'}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.category}>{expense.category}</Text>
          {expense.note && (
            <Text style={styles.note} numberOfLines={1}>
              {expense.note}
            </Text>
          )}
          <Text style={styles.date}>
            {formatDate(expenseDate)} • {formatTime(expenseDate)}
          </Text>
        </View>
      </View>
      
      <View style={styles.rightSection}>
        <Text style={styles.amount}>${expense.amount.toFixed(2)}</Text>
        {onDelete && (
          <TouchableOpacity 
            style={styles.deleteButton} 
            onPress={onDelete}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.deleteIcon}>🗑️</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
  },
  details: {
    flex: 1,
  },
  category: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 2,
  },
  note: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#A0AEC0',
  },
  rightSection: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  amount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 4,
  },
  deleteButton: {
    padding: 4,
  },
  deleteIcon: {
    fontSize: 16,
  },
});
