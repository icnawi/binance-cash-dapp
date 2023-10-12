import { useStyles } from './NotFound.styles';

export const NotFound = () => {
	const classes = useStyles();
	return <div className={classes.container}>404: Page not found</div>;
};
