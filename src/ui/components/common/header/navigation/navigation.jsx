import { useStyles } from './Navigation.styles';
import { MenuBar } from './menu-bar/menu-bar.jsx';
import { Preferences } from './preferences/preferences.jsx';
import { Brand } from '../brand/brand.jsx';

export const Navigation = () => {
  const classes = useStyles();

  return (
    <div className={classes.navigation}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Brand />
          <MenuBar />
          <Preferences />
        </Toolbar>
      </AppBar>
    </div>
  );
};
