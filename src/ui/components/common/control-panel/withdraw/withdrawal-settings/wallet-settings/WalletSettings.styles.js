const styles = ({ colors }) => ({
  warning: {
    border: `1px solid ${colors.WARN}`,
    borderRadius: 4,
    padding: '.75rem 1rem',
    margin: '1rem 0',
  },
});

export const useStyles = makeStyles(styles, { name: 'WalletSettings' });
