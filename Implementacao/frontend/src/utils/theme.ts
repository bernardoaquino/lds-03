import { getGridSize } from "./grid"

const FONT_SIZES = {
  12: getGridSize(1.5),
  14: getGridSize(1.75),
  16: getGridSize(2),
  24: getGridSize(3),
  48: getGridSize(6)
};

const FONT_WEIGHTS = {
  light: 300,
  normal: 400,
  regular: 500,
  bold: 600
};

const BREAKPOINTS = {
  sm: '768px',
};

const COLORS = {
  primary: {
    pure: '#D62828',
    medium: '#F84B40',
    light: '#FF6B5A'
  },
  secondary: {
    pure: '#003049',
    medium: '#315571',
    light: '#5B7D9B'
  },
  tertiary: {
    pure: '#F77F00',
    medium: '#FF8E53',
    light: '#FFA48B',
  },
  neutral: {
    0: '#fff',
    50: '#e9e9e9',
    75: '#ccc',
    100: '#000'
  }
};

export const themeConfig = {
  grid: getGridSize,
  typography: {
    fontSize: FONT_SIZES,
    fontWeight: FONT_WEIGHTS,
  },
  color: COLORS,
  breakpoints: BREAKPOINTS
};
