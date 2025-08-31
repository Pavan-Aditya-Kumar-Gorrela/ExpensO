# 💰 ExpensO - React Native App

A beautiful and feature-rich personal expense tracking application built with React Native and Expo. Track your spending habits, categorize expenses, and visualize your financial data with interactive charts. Features a stunning animated splash screen with the ExpensO branding.

## ✨ Features

### 📱 Core Functionality
- **Splash Screen**: Beautiful animated ExpensO branding screen
- **Add Expenses**: Track expenses with amount, category, and optional notes
- **Expense Management**: View, filter, and delete expenses
- **Data Persistence**: All data stored locally using AsyncStorage
- **Real-time Updates**: Instant updates across all screens

### 📊 Analytics & Insights
- **Summary Cards**: Daily, weekly, and monthly expense totals
- **Category Breakdown**: Visual representation of spending by category
- **Interactive Charts**: 
  - Pie chart for monthly spending by category
  - Bar chart for weekly spending trends
- **Percentage Analysis**: Category-based spending percentages

### 🔍 Search & Filtering
- **Smart Search**: Find expenses by notes or category names
- **Category Filtering**: Filter expenses by specific categories
- **Advanced Sorting**: Sort by date (latest/oldest first) or amount (highest/lowest first)

### 🏷️ Category Management
- **Predefined Categories**: Food 🍕, Transport 🚗, Shopping 🛍️, Bills 📄, Other 📌
- **Custom Categories**: Add your own categories with custom icons and colors
- **Icon Selection**: Choose from 12+ emoji icons for categories
- **Color Coding**: Automatic color assignment for visual distinction

### ⚙️ Settings & Data
- **Category Management**: Add, edit, and delete custom categories
- **Data Export**: Clear all data with confirmation modal
- **Default Restoration**: Automatic restoration of default categories

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS) or Android Emulator (for Android)
- Git (for cloning the repository)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd finance-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on device/simulator**
   ```bash
   # For iOS
   npm run ios
   
   # For Android
   npm run android
   
   # For web
   npm run web
   ```

## 🏗️ Project Structure

```
finance-tracker/
├── components/           # Reusable UI components
│   ├── ExpenseCard.tsx  # Individual expense display
│   ├── SummaryCard.tsx  # Summary statistics cards
│   └── SearchAndFilter.tsx # Search and filtering UI
├── screens/             # Main application screens
│   ├── SplashScreen.tsx # Animated splash screen with branding
│   ├── HomeScreen.tsx   # Overview and expense list
│   ├── AddExpenseScreen.tsx # Add new expenses
│   └── SettingsScreen.tsx   # Settings and categories
├── storage/             # Data persistence layer
│   └── asyncStorage.ts  # AsyncStorage operations
├── utils/               # Utility functions
│   ├── dateUtils.ts     # Date formatting and calculations
│   └── expenseUtils.ts  # Expense calculations and filtering
├── types.ts             # TypeScript type definitions
├── App.tsx              # Main application component
└── package.json         # Dependencies and scripts
```

## 🎨 UI/UX Features

### Design Principles
- **Modern & Clean**: Minimalist design with beautiful shadows and rounded corners
- **Responsive**: Optimized for various screen sizes
- **Accessible**: High contrast colors and clear typography
- **Intuitive**: Easy-to-use interface with clear visual feedback
- **Professional Branding**: Consistent ExpensO identity across all screens

### Color Scheme
- **Primary**: #4299E1 (Blue)
- **Success**: #48BB78 (Green)
- **Warning**: #F7DC6F (Yellow)
- **Danger**: #F56565 (Red)
- **Neutral**: #F7FAFC (Light Gray)

## 📱 Screens

### 1. Splash Screen
- **Animated ExpensO Logo**: Money bag emoji with smooth scale and fade animations
- **Brand Identity**: Large "ExpensO" text with "Smart Expense Tracking" tagline
- **Auto-navigation**: Automatically transitions to main app after 2.5 seconds
- **Beautiful Design**: Purple gradient background (#4F46E5) with white text
- **Smooth Transitions**: Uses React Native Animated API for professional feel

### 2. Home/Overview Screen
- Expense summary cards (Today, This Week, This Month)
- Interactive charts and analytics
- Search and filtering options
- Grouped expense list by date
- Pull-to-refresh functionality

### 3. Add Expense Screen
- Large, easy-to-use amount input
- Visual category selection with icons
- Optional note input
- Form validation and error handling
- Success feedback and navigation

### 4. Settings Screen
- Category management (add/edit/delete)
- Icon selection grid
- Data clearing with confirmation
- Default category restoration

## 🔧 Technical Details

### Dependencies
- **React Native**: Core framework
- **Expo**: Development platform
- **React Navigation**: Screen navigation with bottom tabs
- **AsyncStorage**: Local data persistence
- **React Native Chart Kit**: Data visualization (PieChart, BarChart)
- **Date-fns**: Date manipulation utilities
- **React Native UUID**: Unique ID generation
- **React Native Animated**: Smooth animations and transitions

### Data Structure
```typescript
interface Expense {
  id: string;
  amount: number;
  category: string;
  note?: string;
  date: string;
  timestamp: number;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}
```

### Storage Strategy
- **AsyncStorage**: Cross-platform local storage
- **Automatic Backup**: Data persists between app sessions
- **Default Categories**: Pre-loaded with common expense categories
- **Data Validation**: Input validation and error handling

## 🚀 Performance Features

- **Efficient Rendering**: Optimized list rendering with proper keys
- **Lazy Loading**: Components load only when needed
- **Memory Management**: Proper cleanup of event listeners
- **Smooth Animations**: Native animations for better performance
- **Splash Screen Optimization**: Fast loading with smooth transitions

## 📊 Data Visualization

### Charts Included
1. **Pie Chart**: Monthly spending by category
2. **Bar Chart**: Weekly spending trends
3. **Summary Cards**: Visual expense totals

### Chart Features
- Responsive design
- Custom colors for each category
- Interactive legends
- Smooth animations

## 🔒 Data Privacy

- **Local Storage**: All data stored on device
- **No Cloud Sync**: Complete privacy and offline functionality
- **Data Export**: Easy data clearing when needed
- **Secure Storage**: Uses React Native's secure storage APIs

## 🧪 Testing

### Manual Testing Checklist
- [ ] Splash screen animation and auto-navigation
- [ ] Add new expenses
- [ ] Edit existing expenses
- [ ] Delete expenses
- [ ] Filter by category
- [ ] Search expenses
- [ ] Sort expenses
- [ ] Add custom categories
- [ ] Clear all data
- [ ] Charts rendering
- [ ] Data persistence

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npm start --reset-cache
   ```

2. **iOS build issues**
   ```bash
   cd ios && pod install && cd ..
   ```

3. **Android build issues**
   ```bash
   cd android && ./gradlew clean && cd ..
   ```

### Performance Tips
- Use the latest React Native version
- Enable Hermes engine for better performance
- Use release builds for testing performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React Native community
- Expo team for the amazing development platform
- Chart.js for inspiration on data visualization
- All contributors and testers

## 📞 Support

If you encounter any issues or have questions:
- Create an issue in the GitHub repository
- Check the troubleshooting section above
- Review the Expo documentation

---

**Built with ❤️ using React Native, Expo, and beautiful animations**
