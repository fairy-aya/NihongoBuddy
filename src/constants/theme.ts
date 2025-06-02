import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1A5276', // 深い藍色
    accent: '#E74C3C', // 暖かい朱色
    background: '#F5F5F5',
    surface: '#FFFFFF',
    text: '#333333',
    placeholder: '#888888',
    sakura: '#FADBD8', // 柔らかい桜色
    success: '#27AE60', // 成功
    warning: '#F39C12', // 警告
    error: '#C0392B', // エラー
    info: '#3498DB', // 情報
  },
  fonts: {
    ...DefaultTheme.fonts,
  },
  roundness: 8,
};

export const spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  headingLarge: {
    fontFamily: 'System',
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 34,
  },
  headingMedium: {
    fontFamily: 'System',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 30,
  },
  headingSmall: {
    fontFamily: 'System',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 26,
  },
  bodyLarge: {
    fontFamily: 'System',
    fontSize: 18,
    lineHeight: 24,
  },
  bodyMedium: {
    fontFamily: 'System',
    fontSize: 16,
    lineHeight: 22,
  },
  bodySmall: {
    fontFamily: 'System',
    fontSize: 14,
    lineHeight: 20,
  },
  caption: {
    fontFamily: 'System',
    fontSize: 12,
    lineHeight: 16,
  },
};
