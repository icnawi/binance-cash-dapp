import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { appConfig } from '../../../../../../app.config';
import { LinkTypes, routes } from '../../../../../config';

const [menuItem] = [
  {
    id: uuid(),
    name: 'info',
    options: [
      { id: uuid(), name: 'tutorial', to: routes.tutorial, type: 'ROUTE' },
      { id: uuid(), name: 'about', to: appConfig.urls.aboutPage, type: 'HREF' },
      {
        id: uuid(),
        name: 'privacyTips',
        to: appConfig.urls.privacyTipsPage,
        type: 'HREF',
      },
      {
        id: uuid(),
        name: 'freeGETH',
        to: appConfig.urls.faucet,
        type: 'HREF',
      },
    ],
  },
];
// const styles = ({ colors }) => ({
//   navMenu: {
//     marginTop: '3rem',
//     '& .MuiPaper-root': {
//       color: colors.DARK_WHITE,
//       backgroundColor: colors.BACKGROUND,
//       fontSize: '1rem',
//       boxShadow: `0 0 0 1px ${colors.PRIMARY}, 0 6px 12px rgb(0 0 0 / 30%)`,
//     },
//   },
//   menuNavItem: {
//     color: colors.DARK_WHITE,
//     fontSize: '0.9rem',
//     marginRight: 8,
//     '&:hover': {
//       color: colors.PRIMARY,
//     },
//     '&.active': {
//       color: colors.PRIMARY,
//     },
//   },
//   navLink: {
//     color: colors.DARK_WHITE,
//     width: '100%',
//     padding: '.375rem 1rem',
//     paddingRight: '3rem',
//     '&.active': {
//       backgroundColor: colors.PRIMARY,
//       color: colors.BACKGROUND,
//     },
//     '&:.active:hover': {
//       color: colors.BACKGROUND,
//     },
//   },
//   optionItem: {
//     fontFamily: '"PT mono", monospace',
//     fontSize: '.875rem',
//     padding: 0,
//   },
// });

export const MenuBar = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenuOpen = event => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const renderMenuItems = menuItems =>
    menuItems.map((option, idx) => (
      <MenuItem
        key={option.id}
        className={classes.optionItem}
        disableRipple
        disableTouchRipple
        selected={option.name === menuItems[idx]}>
        {option.type === LinkTypes.ROUTE ? (
          <NavLink exact to={option.to} className={classes.navLink} onClick={handleMenuClose}>
            {t(option.name)}
          </NavLink>
        ) : (
          <Link href={option.to} target="_blank" underline="none" className={classes.navLink}>
            {t(option.name)}
          </Link>
        )}
      </MenuItem>
    ));

  return (
    <ClickAwayListener
      onClickAway={handleMenuClose}
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart">
      <>
        <Button
          aria-label="info about th project"
          aria-controls="menu-appbar"
          className={classes.menuNavItem}
          onClick={handleMenuOpen}
          color="secondary"
          variant="text">
          Info
          {open ? <ExpandLess /> : <ExpandMore />}
        </Button>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          className={classes.navMenu}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          MenuListProps={{ disablePadding: true }}
          open={open}
          onClose={handleMenuClose}>
          {renderMenuItems(menuItem.options)}
        </Menu>
        <NavLink exact to={routes.compliance} className={classes.menuNavItem}>
          {t('compliance')}
        </NavLink>
      </>
    </ClickAwayListener>
  );
};
