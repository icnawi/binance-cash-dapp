import { ChakraProvider, theme } from '@chakra-ui/react';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Main } from './main/main.jsx';
import { NotFound } from './not-found/not-found.jsx';
import { useAppStore } from '../../stores/index.js';
import { getTheme, routes } from '../config';

export const App = () => {
  const colors = useStoreState(state => state.common.tokenConfig.styles.colors);
  const initWeb3 = useAppStore(actions => actions.common.onConnectToMetamask);

  React.useEffect(() => {
    initWeb3();
  }, [initWeb3]);

  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route index path={[routes.root, routes.tutorial, routes.compliance]} component={Main} />
        <Route path="*" component={NotFound} />
      </Routes>
    </ChakraProvider>
  );
};
