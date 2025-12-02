# React Native Template Project

A comprehensive, production-ready React Native template with TypeScript, atomic design architecture, Redux Toolkit, internationalization, and modern development tools.

## Features

### 🎨 Design System
- **Atomic Design Architecture**: Components organized as atoms, molecules, organisms, and templates
- **Comprehensive Design Tokens**: Colors, typography, spacing, and dimensions
- **Dark/Light Theme Support**: Seamless theme switching with persisted preferences
- **Cross-platform Shadows**: Consistent elevation system for iOS and Android

### 🔧 State Management
- **Redux Toolkit**: Modern Redux with simplified configuration
- **Redux Persist**: State persistence with AsyncStorage
- **TypeScript Integration**: Fully typed state with proper selectors
- **Async Thunks**: Proper handling of async operations

### 🌐 Internationalization (i18n)
- **Multi-language Support**: English and Urdu out of the box
- **RTL Support**: Right-to-left text support for Arabic/Urdu
- **Dynamic Language Switching**: Change language without app restart
- **Localized Formatting**: Numbers, dates, and currency formatting

### 🧭 Navigation
- **React Navigation 6**: Latest navigation with TypeScript
- **Type-safe Navigation**: Strongly typed navigation parameters
- **Tab Navigation**: Bottom tabs with stack navigation
- **Modal Support**: Full-screen and modal presentations

### 🔒 Development Tools
- **TypeScript Strict Mode**: Maximum type safety
- **ESLint + Prettier**: Code formatting and linting
- **Path Aliases**: Clean imports with @ alias
- **Git Hooks**: Pre-commit hooks for code quality

### 📱 React Native Features
- **Expo SDK**: Latest Expo features and tools
- **Cross-platform Compatibility**: iOS, Android, and Web support
- **Performance Optimized**: Efficient rendering and state updates
- **Accessibility**: Built-in accessibility support

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the template**
   ```bash
   git clone <repository-url>
   cd Template_Project
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

4. **Run on platform**
   ```bash
   # iOS
   npm run ios

   # Android
   npm run android

   # Web
   npm run web
   ```

## Project Structure

```
Template_Project/
├── src/
│   ├── components/          # UI Components (Atomic Design)
│   │   ├── atoms/          # Basic building blocks
│   │   ├── molecules/      # Simple combinations
│   │   ├── organisms/      # Complex compositions
│   │   └── templates/      # Page templates
│   ├── screens/            # Screen components
│   ├── navigation/         # Navigation setup
│   ├── store/              # Redux state management
│   │   └── slices/         # Redux slices
│   ├── constants/          # Design system & constants
│   │   └── design/         # Design tokens
│   ├── utils/              # Utility functions
│   ├── types/              # TypeScript definitions
│   ├── models/             # Data models
│   │   ├── enums/          # Enumerations
│   │   ├── interfaces/     # Interface definitions
│   │   └── props/          # Component props
│   ├── services/           # API and external services
│   └── assets/             # Static assets
│       ├── images/
│       ├── fonts/
│       └── i18n/           # Translation files
├── docs/                   # Documentation
├── scripts/                # Build scripts
└── App.tsx                 # Main app component
```

## Architecture

### Atomic Design

This template follows the Atomic Design methodology:

- **Atoms**: Basic building blocks (Button, Text, Card)
- **Molecules**: Simple combinations of atoms (FormField, SearchBar)
- **Organisms**: Complex UI components (Header, ProductList)
- **Templates**: Page layouts and structures

### State Management

Redux Toolkit is used for state management with the following structure:

- **Auth Slice**: User authentication and session management
- **App Slice**: Global app state (theme, language, settings)
- **Selectors**: Centralized state selectors for easy access
- **Persistence**: Automatic state persistence with blacklist/whitelist

### Type Safety

Full TypeScript integration with:

- Strict mode enabled
- Proper prop typing for all components
- Navigation parameter typing
- Redux state typing
- API response typing

## Development Guidelines

### Component Development

1. **Use Atomic Design**: Place components in appropriate atomic level
2. **TypeScript Props**: Always define proper prop interfaces
3. **Design System**: Use design tokens from constants
4. **Documentation**: Include JSDoc comments for all components

Example component structure:

```typescript
/**
 * Button Component (Atom)
 * 
 * Description of the component
 */
import React from 'react';
import { ButtonProps } from '@/models/props';

const Button: React.FC<ButtonProps> = ({ variant, size, children, ...props }) => {
  // Implementation
};

export default Button;
```

### State Management

1. **Use Redux Toolkit**: Create slices with proper TypeScript
2. **Async Actions**: Use createAsyncThunk for API calls
3. **Selectors**: Create reusable selectors for state access
4. **Immutable Updates**: Use Immer-powered reducers

### Styling

1. **Design Tokens**: Use constants from design system
2. **Responsive Design**: Consider different screen sizes
3. **Platform Differences**: Handle iOS/Android differences
4. **Accessibility**: Include accessibility props

### Internationalization

1. **No Hardcoded Strings**: Always use translation keys
2. **RTL Support**: Consider RTL layouts for Arabic/Urdu
3. **Localized Formatting**: Use locale-aware formatting
4. **Context**: Provide context in translation keys

## Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript checks
- `npm run clean` - Clear Expo cache

## Configuration

### Environment Variables

Create `.env` files for different environments:

```bash
# .env
API_BASE_URL=https://api.example.com
ENABLE_FLIPPER=true
```

### Theme Customization

Modify design tokens in `src/constants/design/`:

```typescript
// BaseColors.ts
export const PRIMARY_COLORS = {
  BLUE_500: '#3B82F6', // Change primary color
  // ...
};
```

### Adding Languages

1. Add translation file: `src/assets/i18n/supportedLanguages/[language]/app.json`
2. Import in `src/utils/i18n.ts`
3. Add to enum: `src/models/enums/Language.ts`

## API Integration

The template includes a configured API service:

```typescript
import { apiService } from '@/services';

// GET request
const response = await apiService.get<User[]>('/users');

// POST request
const result = await apiService.post<User>('/users', userData);
```

## Testing

(Add testing setup and examples here)

## Deployment

### Building for Production

```bash
# Build for production
npm run build

# Generate native projects
npx expo prebuild

# Build for specific platform
npx expo run:ios --configuration Release
npx expo run:android --variant release
```

### Environment Setup

1. Configure app.json for production
2. Set up environment-specific configurations
3. Configure code signing (iOS) / signing keys (Android)
4. Set up CI/CD pipeline

## Contributing

1. Follow the established code style
2. Write TypeScript with proper typing
3. Include JSDoc documentation
4. Add appropriate tests
5. Update documentation as needed

## Best Practices

### Performance

- Use React.memo for expensive components
- Implement lazy loading for large screens
- Optimize image sizes and formats
- Use FlatList for large lists

### Security

- Store sensitive data in secure storage
- Validate all user inputs
- Use HTTPS for API calls
- Implement proper authentication

### Accessibility

- Add accessibility labels and hints
- Support screen readers
- Ensure proper color contrast
- Test with accessibility tools

## Troubleshooting

### Common Issues

1. **Metro bundler cache**: Run `npm run clean`
2. **Node modules**: Delete `node_modules` and run `npm install`
3. **iOS build issues**: Clean Xcode build folder
4. **Android build issues**: Clean gradle cache

### Platform-specific Issues

- **iOS**: Check provisioning profiles and certificates
- **Android**: Verify signing configuration
- **Web**: Check browser compatibility

## Support

For questions and support:

- Check the documentation in `/docs`
- Review existing issues
- Create detailed issue reports
- Follow coding guidelines

## License

This template is available under the MIT License. See LICENSE file for details.

---

**Built with ❤️ using React Native, TypeScript, and modern development practices.**