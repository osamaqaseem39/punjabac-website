// Color scheme constants for Punjab AC
// Update these values to match your logo colors exactly

export const colors = {
  // Primary Brand Colors (from your logo)
  primary: {
    50: 'bg-indigo-50',
    100: 'bg-indigo-100',
    200: 'bg-indigo-200',
    300: 'bg-indigo-300',
    400: 'bg-indigo-400',
    500: 'bg-indigo-500',
    600: 'bg-indigo-600',
    700: 'bg-indigo-700',
    800: 'bg-indigo-800',
    900: 'bg-indigo-900',
    // Custom brand color #001a33
    brand: 'bg-punjabac-brand',
  },
  
  // Primary Text Colors
  primaryText: {
    50: 'text-indigo-50',
    100: 'text-indigo-100',
    200: 'text-indigo-200',
    300: 'text-indigo-300',
    400: 'text-indigo-400',
    500: 'text-indigo-500',
    600: 'text-indigo-600',
    700: 'text-indigo-700',
    800: 'text-indigo-800',
    900: 'text-indigo-900',
    white: 'text-white',
    // Custom brand color #001a33
    brand: 'text-punjabac-brand',
  },

  // Primary Border Colors
  primaryBorder: {
    50: 'border-indigo-50',
    100: 'border-indigo-100',
    200: 'border-indigo-200',
    300: 'border-indigo-300',
    400: 'border-indigo-400',
    500: 'border-indigo-500',
    600: 'border-indigo-600',
    700: 'border-indigo-700',
    800: 'border-indigo-800',
    900: 'border-indigo-900',
    // Custom brand color #001a33
    brand: 'border-punjabac-brand',
  },

  // Primary Ring Colors (for focus states)
  primaryRing: {
    50: 'ring-indigo-50',
    100: 'ring-indigo-100',
    200: 'ring-indigo-200',
    300: 'ring-indigo-300',
    400: 'ring-indigo-400',
    500: 'ring-indigo-500',
    600: 'ring-indigo-600',
    700: 'ring-indigo-700',
    800: 'ring-indigo-800',
    900: 'ring-indigo-900',
    // Custom brand color #001a33
    brand: 'ring-punjabac-brand',
  },

  // Secondary Colors
  secondary: {
    green: {
      100: 'bg-green-100',
      600: 'bg-green-600',
    },
    greenText: {
      100: 'text-green-100',
      600: 'text-green-600',
    },
    yellow: {
      100: 'bg-yellow-100',
      600: 'bg-yellow-600',
    },
    yellowText: {
      100: 'text-yellow-100',
      600: 'text-yellow-600',
    },
    purple: {
      100: 'bg-purple-100',
      600: 'bg-purple-600',
    },
    purpleText: {
      100: 'text-purple-100',
      600: 'text-purple-600',
    },
  },

  // Neutral Colors
  neutral: {
    white: 'bg-white',
    gray: {
      50: 'bg-gray-50',
      100: 'bg-gray-100',
      200: 'bg-gray-200',
      300: 'bg-gray-300',
      400: 'bg-gray-400',
      500: 'bg-gray-500',
      600: 'bg-gray-600',
      700: 'bg-gray-700',
      800: 'bg-gray-800',
      900: 'bg-gray-900',
    },
    grayText: {
      50: 'text-gray-50',
      100: 'text-gray-100',
      200: 'text-gray-200',
      300: 'text-gray-300',
      400: 'text-gray-400',
      500: 'text-gray-500',
      600: 'text-gray-600',
      700: 'text-gray-700',
      800: 'text-gray-800',
      900: 'text-gray-900',
    },
  },

  // Gradients
  gradients: {
    primary: 'bg-gradient-to-r from-indigo-600 to-indigo-800',
    primaryLight: 'bg-gradient-to-br from-gray-50 to-indigo-50',
    primaryCard: 'bg-gradient-to-br from-indigo-50 to-indigo-100',
    primaryHover: 'bg-gradient-to-r from-indigo-700 to-indigo-900',
  },

  // Status Colors
  status: {
    success: {
      bg: 'bg-green-100',
      text: 'text-green-600',
      border: 'border-green-200',
    },
    warning: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-600',
      border: 'border-yellow-200',
    },
    error: {
      bg: 'bg-red-100',
      text: 'text-red-600',
      border: 'border-red-200',
    },
    info: {
      bg: 'bg-indigo-100',
      text: 'text-indigo-600',
      border: 'border-indigo-200',
    },
  },
};

// Common color combinations for components
export const colorSchemes = {
  // Button schemes
  button: {
    primary: `${colors.primary.brand} ${colors.primaryText.white} hover:bg-punjabac-brand-light transition-colors`,
    secondary: `${colors.neutral.white} ${colors.primaryText.brand} border-2 ${colors.primaryBorder.brand} hover:${colors.primary[50]} transition-colors`,
    outline: `${colors.neutral.white} ${colors.neutral.grayText[600]} border ${colors.neutral.gray[300]} hover:${colors.primaryText.brand} hover:${colors.primaryBorder.brand} transition-colors`,
  },

  // Card schemes
  card: {
    default: `${colors.neutral.white} shadow-lg hover:shadow-xl transition-shadow`,
    primary: `${colors.neutral.white} shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`,
    accent: `${colors.primary[50]} shadow-md hover:shadow-lg transition-shadow`,
  },

  // Badge schemes
  badge: {
    primary: `${colors.primary.brand} ${colors.primaryText.white} px-3 py-1 rounded-full text-xs font-medium`,
    secondary: `${colors.primary[100]} ${colors.primaryText.brand} px-3 py-1 rounded-full text-xs font-medium`,
  },

  // Input schemes
  input: {
    default: `border ${colors.neutral.gray[300]} focus:${colors.primaryRing[500]} focus:border-transparent`,
    error: `border ${colors.status.error.border} focus:${colors.primaryRing[500]} focus:border-transparent`,
  },
};

export default colors; 