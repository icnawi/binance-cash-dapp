import { useStyles } from './Header.styles';
import { Navigation } from './navigation/navigation.jsx';

export const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Navigation />
    </div>
  );
};
