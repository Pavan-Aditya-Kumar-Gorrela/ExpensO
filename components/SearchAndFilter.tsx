import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { FilterOptions, Category } from '../types';

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string | undefined;
  onCategoryChange: (category: string | undefined) => void;
  categories: Category[];
  sortBy: 'date' | 'amount';
  sortOrder: 'asc' | 'desc';
  onSortChange: (sortBy: 'date' | 'amount', sortOrder: 'asc' | 'desc') => void;
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  sortBy,
  sortOrder,
  onSortChange,
}) => {
  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search expenses..."
          value={searchQuery}
          onChangeText={onSearchChange}
          placeholderTextColor="#A0AEC0"
        />
      </View>

      {/* Category Filter */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter by:</Text>
        <View style={styles.categoryButtons}>
          <TouchableOpacity
            style={[
              styles.categoryButton,
              !selectedCategory && styles.categoryButtonActive
            ]}
            onPress={() => onCategoryChange(undefined)}
          >
            <Text style={[
              styles.categoryButtonText,
              !selectedCategory && styles.categoryButtonTextActive
            ]}>
              All
            </Text>
          </TouchableOpacity>
          
          {categories.map((c) => (
            <TouchableOpacity
              key={c.id}
              style={[
                styles.categoryButton,
                selectedCategory === c.name && styles.categoryButtonActive
              ]}
              onPress={() => onCategoryChange(c.name)}
            >
              <Text style={[
                styles.categoryButtonText,
                selectedCategory === c.name && styles.categoryButtonTextActive
              ]}>
                {c.icon} {c.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Sort Options */}
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <View style={styles.sortButtons}>
          <TouchableOpacity
            style={[
              styles.sortButton,
              sortBy === 'date' && styles.sortButtonActive
            ]}
            onPress={() => onSortChange('date', sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            <Text style={[
              styles.sortButtonText,
              sortBy === 'date' && styles.sortButtonTextActive
            ]}>
              Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.sortButton,
              sortBy === 'amount' && styles.sortButtonActive
            ]}
            onPress={() => onSortChange('amount', sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            <Text style={[
              styles.sortButtonText,
              sortBy === 'amount' && styles.sortButtonTextActive
            ]}>
              Amount {sortBy === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 12,
    color: '#A0AEC0',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2D3748',
  },
  filterContainer: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: 8,
  },
  categoryButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  categoryButtonActive: {
    backgroundColor: '#4299E1',
    borderColor: '#4299E1',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#4A5568',
  },
  categoryButtonTextActive: {
    color: '#FFFFFF',
  },
  sortContainer: {
    marginBottom: 8,
  },
  sortLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: 8,
  },
  sortButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  sortButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sortButtonActive: {
    backgroundColor: '#48BB78',
    borderColor: '#48BB78',
  },
  sortButtonText: {
    fontSize: 14,
    color: '#4A5568',
  },
  sortButtonTextActive: {
    color: '#FFFFFF',
  },
});
