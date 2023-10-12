const styles = ({ colors }) => ({
  row: {
    fontFamily: '"PT mono", monospace',
    fontSize: '.82rem',
    backgroundColor: '#171717',
    padding: '.375rem .25rem .375rem .625rem',

    '&:nth-child(2n)': {
      backgroundColor: colors.BACKGROUND,
    },
  },
});

export const useStyles = makeStyles(styles, { name: 'Grid' });
