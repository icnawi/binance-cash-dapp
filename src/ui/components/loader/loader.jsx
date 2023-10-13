import { Box, CircularProgress, Flex, Icon } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export const Loader = ({ type = 'default', children }) => {
  const { t } = useTranslation();

  if (type === 'tornado') {
    return (
      <Flex
        h="100vh"
        w="100vw"
        justify="center"
        align="center"
        position="fixed"
        t={0}
        l={0}
        textAlign="center"
        zIndex={100}
        bg="rgba(0,0,0,.85)">
        <Box>
          <Icon
            viewBox="0 0 39.9 39.9"
            w="60px"
            animation="$spin 2s linear infinite"
            sx={{
              '& path': {
                fill: 'primary.100',
              },
              '@keyframes spin': {
                from: {
                  transform: 'rotate(0deg)',
                },
                to: {
                  transform: 'rotate(-360deg)',
                },
              },
            }}>
            <path d="M40,19.4A17.3,17.3,0,0,0,22.8,2.8,17.1,17.1,0,0,0,8.6,10.4,11.3,11.3,0,0,1,19.3,0,17.1,17.1,0,0,0,2.8,17.1a16.8,16.8,0,0,0,7.7,14.2A11.3,11.3,0,0,1,0,20.6a17.1,17.1,0,0,0,31.3,9A11.4,11.4,0,0,1,20.6,39.9,17.1,17.1,0,0,0,37.1,22.8,17.3,17.3,0,0,0,29.5,8.6,11.8,11.8,0,0,1,40,19.4ZM20,27.2a7.4,7.4,0,0,1-5.2-2.1,7.1,7.1,0,0,1-2-5.1A7.2,7.2,0,1,1,20,27.2Z" />
          </Icon>
          <Box color="primary.100" fontSize="1em" pt=".5rem">
            {children || t('loading')}
          </Box>
        </Box>
      </Flex>
    );
  }

  return (
    <Flex
      h="100vh"
      w="100vw"
      justify="center"
      align="center"
      position="fixed"
      t={0}
      l={0}
      textAlign="center"
      zIndex={100}
      bg="rgba(0,0,0,.85)">
      <CircularProgress size={72} />
    </Flex>
  );
};
