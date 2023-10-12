import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';

import { appConfig } from '../../../../../../app.config';
import { TextSelect } from '../../../text-select/text-select.jsx';

const tokenList = appConfig.tokens.map(({ token }) => ({
  id: uuid(),
  name: token,
}));

export const Token = ({ classNames }) => {
  const { t } = useTranslation();
  const selectedToken = useStoreState(state => state.common.tokenConfig.token);
  const changeToken = useStoreActions(action => action.common.onChangeToken);

  const handleTokenChange = event => {
    const tokenConfig = appConfig.tokens.find(({ token }) => token === event.target.value);

    if (tokenConfig) {
      changeToken(tokenConfig.networks[0].netId);
    }
  };

  return (
    <>
      <section className={classNames?.depositField}>
        <TextSelect
          label={t('token')}
          options={tokenList}
          onChange={handleTokenChange}
          value={selectedToken}
        />
      </section>
    </>
  );
};
