import { Link } from 'react-router-dom';
import { useStyles } from './Brand.styles';
import { routes } from '../../../../config';
import logo from '../../../../images/logo/logo-white.svg';

export const Brand = () => {
	const classes = useStyles();

	return (
		<div className={classes.brand}>
			<Link to={routes.root} className={classes.link}>
				<img src={logo} alt="BinanceCash" className={classes.logo} />
			</Link>
		</div>
	);
};
