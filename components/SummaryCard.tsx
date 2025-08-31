import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ExpenseSummary } from '../types';

interface SummaryCardProps {
  title: string;
  summary: ExpenseSummary;
  color: string;
  icon: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ 
  title, 
  summary, 
  color, 
  icon 
}) => {
  return (
    <View style={[styles.container, { borderLeftColor: color }]}>
      <View style={styles.header}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={[styles.amount, { color }]}>
          ${summary.total.toFixed(2)}
        </Text>
        <Text style={styles.count}>
          {summary.count} {summary.count === 1 ? 'expense' : 'expenses'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 8,
    marginVertical: 8,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 120,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    fontSize: 20,
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#718096',
    flex: 1,
  },
  content: {
    alignItems: 'flex-start',
  },
  amount: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  count: {
    fontSize: 12,
    color: '#A0AEC0',
  },
});
