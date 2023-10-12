import { Flex } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';

import { Compliance } from './compliance/compliance.jsx';
import { Dashboard } from './dashboard/dashboard.jsx';
import { Tutorial } from './tutorial/tutorial.jsx';
import { routes } from '../../config';
import { Footer } from '../common/footer/footer.jsx';
import { Header } from '../common/header/header.jsx';
import { NetworkNotifications } from '../common/network-notifications/network-notifications.jsx';

export const Main = () => {
  return (
    <Flex flexDir="column" minH="100vh">
      <Header />
      <Routes>
        <Route
          path={routes.root}
          element={
            <>
              <NetworkNotifications />
              <Dashboard />
            </>
          }
        />
        <Route path={routes.tutorial} element={<Tutorial />} />
        <Route path={routes.compliance} element={<Compliance />} />
      </Routes>

      <Footer />
    </Flex>
  );
};
