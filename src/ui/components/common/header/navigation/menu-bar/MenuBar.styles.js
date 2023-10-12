const styles = ({ colors }) => ({
  navMenu: {
    marginTop: '3rem',
    '& .MuiPaper-root': {
      color: colors.DARK_WHITE,
      backgroundColor: colors.BACKGROUND,
      fontSize: '1rem',
      boxShadow: `0 0 0 1px ${colors.PRIMARY}, 0 6px 12px rgb(0 0 0 / 30%)`,
    },
  },
  menuNavItem: {
    color: colors.DARK_WHITE,
    fontSize: '0.9rem',
    marginRight: 8,
    '&:hover': {
      color: colors.PRIMARY,
    },
    '&.active': {
      color: colors.PRIMARY,
    },
  },
  navLink: {
    color: colors.DARK_WHITE,
    width: '100%',
    padding: '.375rem 1rem',
    paddingRight: '3rem',
    '&.active': {
      backgroundColor: colors.PRIMARY,
      color: colors.BACKGROUND,
    },
    '&:.active:hover': {
      color: colors.BACKGROUND,
    },
  },
  optionItem: {
    fontFamily: '"PT mono", monospace',
    fontSize: '.875rem',
    padding: 0,
  },
});

export const useStyles = makeStyles(styles, { name: 'MenuBar' });
