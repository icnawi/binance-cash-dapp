import { Link } from 'react-router-dom';

import { routes } from '../../../../config';
import logo from '../../../../images/logo/logo-white.svg';

// const styles = {
// 	brand: {
// 		display: 'flex',
// 		alignItems: 'center',
// 		flexShrink: 0,
// 	},
// 	logo: {
// 		height: 75,
// 		maxHeight: '10rem',
// 	},
// 	link: {
// 		lineHeight: 1.5,
// 		padding: '.5rem .75rem',
// 		paddingLeft: 0,
// 		position: 'relative',
// 		flex: '0 0 0',
// 	},
// };

export const Brand = () => {
  return (
    <div className={classes.brand}>
      <Link to={routes.root} className={classes.link}>
        <img src={logo} alt="BinanceCash" className={classes.logo} />
      </Link>
    </div>
  );
};
