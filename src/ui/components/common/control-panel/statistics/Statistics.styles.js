const styles = ({ colors }) => ({
  bold: {
    fontWeight: 'bold',
    marginRight: '.5em',
  },
  gridWrap: {
    '& .MuiGrid-item': {
      paddingBottom: '4px',
    },
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: '"PT mono", monospace',
    fontSize: '1rem',
    marginBottom: '.55em',

    '& img': {
      margin: '0 .45rem',
    },
  },
  field: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: '"PT mono", monospace',
    fontSize: '1rem',
    marginBottom: '.55em',
    '&:not(:last-child)': {
      marginBottom: '1.25rem',
    },
  },
  timeLabel: {
    color: colors.PRIMARY,
  },
});

export const useStyles = makeStyles(styles, { name: 'Statistics' });
