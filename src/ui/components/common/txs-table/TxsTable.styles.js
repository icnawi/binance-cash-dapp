import { makeStyles } from '@material-ui/core';

const styles = {
	tableContainer: {
		padding: '1.5rem 1.429rem 1.5rem 2.143rem',
	},
	row: {
		display: 'flex',
	},
};

export const useStyles = makeStyles(styles, { name: 'TxsTable' });
