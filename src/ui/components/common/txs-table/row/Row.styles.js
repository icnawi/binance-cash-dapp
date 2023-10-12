import { makeStyles } from '@material-ui/core';

const styles = {
	row: {
		display: 'flex',
		marginLeft: '-.75rem',
		marginRight: '-.75rem',
		marginTop: '-.75rem',
		'&:last-child': {
			marginBottom: '-.75rem',
		},
	},
};

export const useStyles = makeStyles(styles, { name: 'Row' });
