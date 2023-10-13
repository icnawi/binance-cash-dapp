import { MenuBar } from './menu-bar/menu-bar.jsx';
import { Preferences } from './preferences/preferences.jsx';
import { Brand } from '../brand/brand.jsx';

// const styles = ({ colors }) => ({
//   navigation: {
//     maxWidth: 960,
//     minHeight: '3.25rem',
//     width: '100%',
//     margin: '0 auto',
//     position: 'relative',
//   },
//   navItem: {
//     color: colors.DARK_WHITE,
//     display: 'block',
//     lineHeight: 1.5,
//     padding: '.5rem .75rem',
//     position: 'relative',
//   },
//   toolbar: {
//     padding: 0,
//   },
// });

export const Navigation = () => {
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
