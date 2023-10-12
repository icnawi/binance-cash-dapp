import { Image } from '@chakra-ui/react';

import infoIcon from '../../../images/icons/info-icon.svg';

export const Tooltip = ({ children, width, mode, placement = 'top', ...rest }) => {
  return (
    <Tooltip
      {...rest}
      placement={placement}
      hasArrow
      arrowShadowColor={mode === 'dark' ? '#313131' : 'primary.100'}
      backgroundColor={mode === 'dark' ? '#313131' : 'primary.100'}
      borderRadius="6px"
      color={mode === 'dark' ? '#6B6B6B' : 'bg'}
      fontFamily="reg"
      fontSize=".85rem"
      p="8px 12px"
      textAlign="center"
      mb={placement === 'top' ? '8px' : undefined}
      mt={placement === 'bottom' ? '8px' : undefined}
      mr={placement === 'left' ? '8px' : undefined}
      ml={placement === 'right' ? '8px' : undefined}
      width={width}>
      {children || (
        <Image
          src={infoIcon}
          alt="i"
          backgroundColor="primary.100"
          borderRadius="4px"
          m="0 .45rem"
          h="16px"
          w="16px"
          sx={{
            '&:hover': {
              backgroundColor: 'primary.200',
            },
          }}
        />
      )}
    </Tooltip>
  );
};
