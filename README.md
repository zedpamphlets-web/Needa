# NeedA - Expo SDK57 Firebase Connected App

A mobile application built with Expo SDK57 and Firebase integration.

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI: `npm install -g expo-cli`
- Firebase project setup

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd needa
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
# Edit .env with your Firebase credentials
```

4. Start the development server
```bash
npm start
```

5. Run on specific platform
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
.
├── app/               # Expo Router app directory
│   ├── _layout.tsx    # Root layout
│   ├── (tabs)/        # Tabbed navigation
│   └── ...
├── src/               # Source components and utilities
│   ├── components/    # Reusable components
│   └── ...
├── assets/            # Static assets (images, fonts)
├── package.json       # Dependencies and scripts
├── app.json           # Expo configuration
├── eas.json           # EAS Build configuration
└── tsconfig.json      # TypeScript configuration
```

## Building for Production

### Build with EAS
```bash
# iOS
npm run build:ios

# Android
npm run build:android
```

### Submit to App Stores
```bash
# iOS App Store
npm run submit:ios

# Google Play Store
npm run submit:android
```

## Firebase Integration

This project includes Firebase integration for:
- Authentication
- Realtime Database
- Cloud Storage
- Cloud Functions

Make sure to configure your Firebase project credentials in the `.env` file.

## License

MIT
