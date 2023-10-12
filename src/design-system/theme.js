import { theme as base, extendTheme } from '@chakra-ui/react';

import { alertTheme } from './components/index.js';

const DefaultColors = {
  DARK_WHITE: '#eee',
  PRIMARY: '#f8d12f',
  ACTIVE_PRIMARY: '#f0b90b',
  SEMI_DARK_PRIMARY: '#40421e',
  DARK_PRIMARY: '#1f1e0e',
  BACKGROUND: '#000403',
  DARK_GREEN: '#0d1f16',
  GREY: '#393939',
  WARN: '#ff8a00',
  ERROR: '#ff0658',
};

const ThemeColors = {
  darkWhite: DefaultColors.DARK_WHITE,
  darkGreen: DefaultColors.DARK_GREEN,
  bg: DefaultColors.BACKGROUND,
  primary: {
    100: DefaultColors.PRIMARY,
    200: DefaultColors.ACTIVE_PRIMARY,
    700: DefaultColors.SEMI_DARK_PRIMARY,
    900: DefaultColors.DARK_PRIMARY,
  },
  grey: DefaultColors.GREY,
  warn: DefaultColors.WARN,
  error: DefaultColors.ERROR,
};

const Colors = { ...ThemeColors };

export const theme = extendTheme({
  config: {
    cssPrefix: 'bcdapp',
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
  colors: { ...Colors },
  components: {
    Button: {},
    Progress: {},
    Alert: alertTheme,
  },
  fonts: {
    ...base.fonts,
    regular: 'PT Mono, monospace',
    bold: '"PT Mono Bold", monospace',
  },
  semanticTokens: {
    fonts: {
      reg: 'regular',
      bold: 'bold',
    },
    colors: {
      darkWhite: 'darkWhite',
      darkGreen: 'darkGreen',
    },
  },
});

export const getTheme = ({ colors = {} }) => {
  const Colors = { ...DefaultColors, ...colors };

  return createMuiTheme({
    palette: {
      primary: {
        main: Colors.PRIMARY,
      },
    },
    colors: { ...Colors },
    overrides: {
      MuiButton: {
        root: {
          fontFamily: '"PT mono", monospace',
          textTransform: 0,
        },
        containedPrimary: {
          backgroundColor: Colors.PRIMARY,
          color: DefaultColors.BACKGROUND,
          padding: 'calc(.5em - 1px) 1em',
          borderRadius: 4,
          borderColor: 'transparent',
          fontWeight: 700,
          '&:hover': {
            backgroundColor: Colors.ACTIVE_PRIMARY,
          },
          '&.Mui-disabled': {
            backgroundColor: Colors.PRIMARY,
            color: DefaultColors.BACKGROUND,
            opacity: 0.5,
          },
        },
        outlinedPrimary: {
          backgroundColor: Colors.DARK_PRIMARY,
          color: Colors.PRIMARY,
          padding: 'calc(.5em - 1px) 1em',
          borderRadius: 4,
          borderColor: Colors.PRIMARY,
          fontWeight: 700,
          '&:hover': {
            backgroundColor: Colors.PRIMARY,
            border: `1px solid ${Colors.PRIMARY}`,
            color: DefaultColors.BACKGROUND,
          },
        },
        outlinedSecondary: {
          '&:hover': {
            color: Colors.PRIMARY,
          },
        },
      },
      MuiIconButton: {
        colorPrimary: {
          color: '#6b6b6b',
        },
      },
      MuiTypography: {
        body1: {
          fontFamily: '"PT mono", monospace',
          color: Colors.DARK_WHITE,
          textTransform: 'none',
        },

        body2: {
          fontFamily: '"PT mono", monospace',
          color: Colors.DARK_WHITE,
          textTransform: 'none',
        },
        colorTextSecondary: {
          color: Colors.DARK_WHITE,
          '&:hover': {
            color: Colors.PRIMARY,
          },
        },
        colorPrimary: {
          color: Colors.PRIMARY,
        },
      },
      MuiAppBar: {
        colorPrimary: {
          backgroundColor: 'transparent',
          color: Colors.DARK_WHITE,
        },
      },
      MuiAlert: {
        outlinedInfo: {
          color: Colors.DARK_WHITE,
        },
      },
      MuiOutlinedInput: {
        root: {
          color: Colors.DARK_WHITE,
          fontFamily: '"PT mono", monospace',
          fontSize: '1rem',
          width: '100%',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: Colors.DARK_WHITE,
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: Colors.WARN,
          },
        },
        input: {
          lineHeight: '28px',
          padding: 'calc(.429em - 1px) calc(1.25em - 1px)',
          width: '100%',
        },
        notchedOutline: {
          borderColor: Colors.GREY,
        },
      },
      MuiFormHelperText: {
        root: {
          fontFamily: '"PT mono", monospace',
          position: 'relative',
          top: '.1rem',
          '&.Mui-error': {
            color: Colors.WARN,
          },
        },
      },
      MuiSelect: {
        icon: {
          color: Colors.PRIMARY,
        },
        iconOpen: {
          transform: 'none',
        },
      },
      MuiMenu: {
        list: {
          backgroundColor: Colors.BACKGROUND,
          border: `1px solid ${Colors.PRIMARY}`,
          borderRadius: 4,
          color: Colors.DARK_WHITE,
          padding: 0,
        },
      },
      MuiMenuItem: {
        root: {
          fontFamily: '"PT mono", monospace',
          fontSize: '1rem',
          paddingTop: '10px',
          paddingBottom: '10px',
          paddingLeft: '18px',
          paddingRight: '18px',
          color: Colors.DARK_WHITE,
          '&:hover > .MuiLink-root': {
            backgroundColor: Colors.DARK_PRIMARY,
            color: Colors.PRIMARY,
          },
          '&:hover': {
            backgroundColor: Colors.DARK_PRIMARY,
            color: Colors.PRIMARY,
          },
          '&.Mui-selected, &.Mui-selected:hover': {
            color: Colors.BACKGROUND,
            backgroundColor: Colors.PRIMARY,
          },
        },
      },
      MuiTabs: {
        flexContainer: {
          justifyContent: 'space-between',
        },
      },

      MuiTab: {
        root: {
          borderWidth: '1px 1px 0',
          border: `solid ${Colors.PRIMARY}`,
          backgroundColor: Colors.DARK_PRIMARY,
          color: Colors.PRIMARY,

          '&$selected': {
            borderWidth: '1px 1px 0',
            border: `solid ${Colors.PRIMARY}`,
            backgroundColor: Colors.PRIMARY,
            color: Colors.BACKGROUND,
          },
        },
        textColorSecondary: {
          borderWidth: '1px 1px 0',
          border: `solid ${Colors.GREY}`,
          backgroundColor: Colors.BACKGROUND,
          color: Colors.DARK_WHITE,
        },
      },
      MuiDivider: {
        root: {
          backgroundColor: Colors.GREY,
        },
      },
      MuiChip: {
        root: {
          color: Colors.PRIMARY,
          backgroundColor: Colors.DARK_GREEN,
          border: `1px solid ${Colors.PRIMARY}`,
          borderRadius: '4px',
          fontFamily: '"PT mono", monospace',
          fontWeight: 300,
          fontSize: '.75rem',
          height: '24px',
          padding: '3px 8px',
        },
        label: {
          paddingLeft: 0,
          paddingRight: 0,
        },
      },
      MuiSkeleton: {
        root: {
          backgroundColor: '#282828',
        },
        pulse: {
          transform: 'scale(1, 0.72)',
          height: '26px',
        },
      },
      MuiLink: {
        root: {
          color: Colors.DARK_WHITE,
          '&:hover': {
            color: Colors.PRIMARY,
          },
        },
      },
    },
  });
};
