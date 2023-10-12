import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useStyles } from './CopyButton.styles';
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
  const classes = useStyles();
  const textArea = useRef();
  const [isCopied, setCopied] = useState(false);

  const copy = async () => {
    textArea.current.select();
    document.execCommand('copy');
    setCopied(true);
  };
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
      <textarea ref={textArea} value={textToCopy} className={classes.textarea} />
    </>
  );
};
