import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { useStyles } from './MenuBar.styles';
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

export const MenuBar = () => {
  const { t } = useTranslation();
  const classes = useStyles();
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
