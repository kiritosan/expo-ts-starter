# Expo TypeScript Starter

A modern, scalable React Native application built with Expo and TypeScript.

## Features

- 🚀 Expo Managed Workflow
- 💪 TypeScript
- 🎨 Styled Components
- 📱 Safe Area handling
- 🔄 React Query for data fetching
- ✨ React Native Reanimated for animations
- 🌍 Internationalization support
- ✅ Type checking and linting
- 🧪 Jest setup for testing

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Run on specific platforms:
   - iOS: `npm run ios`
   - Android: `npm run android`
   - Web: `npm run web`

## Project Structure

```
src/
├── components/     # Reusable components
├── hooks/         # Custom hooks
├── navigation/    # Navigation configuration
├── screens/       # Screen components
├── services/      # API and external services
├── styles/        # Theme and styling
└── utils/         # Utility functions
```

## Development Guidelines

- Use functional components with TypeScript interfaces
- Follow the established folder structure
- Write tests for critical functionality
- Use proper error handling with Zod
- Implement proper type safety
- Follow accessibility guidelines

## Scripts

- `npm start`: Start the Expo development server
- `npm test`: Run tests
- `npm run lint`: Run ESLint
- `npm run type-check`: Run TypeScript type checking
