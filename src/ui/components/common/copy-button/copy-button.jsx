import { Textarea } from '@chakra-ui/react';
import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Tooltip } from '../tooltip/tooltip.jsx';

export const CopyButton = ({
  className,
  textToCopy,
  title,
  placement,
  children,
  inline,
  ...rest
}) => {
  const { t } = useTranslation();
  const [isCopied, setCopied] = useState(false);

  const copy = useMemo(async () => {
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
    } else {
      document.execCommand('copy', true, textToCopy);
      setCopied(true);
    }
  }, [textToCopy]);
  const resetCopyState = () => setCopied(false);

  return (
    <>
      <Tooltip
        title={isCopied ? t('copied') : title || t('clickToCopy')}
        leaveDelay={200}
        placement={placement}>
        {inline ? (
          <span
            role="button"
            onClick={copy}
            onKeyDown={copy}
            onMouseEnter={resetCopyState}
            tabIndex={0}
            className={className}
            {...rest}>
            {children}
          </span>
        ) : (
          <Button
            variant="contained"
            color="primary"
            className={className}
            onClick={copy}
            onMouseEnter={resetCopyState}
            {...rest}>
            {children}
          </Button>
        )}
      </Tooltip>
      <Textarea
        value={textToCopy}
        position="absolute"
        opacity="0"
        pointerEvents="none"
        w={0}
        h={0}
      />
    </>
  );
};
