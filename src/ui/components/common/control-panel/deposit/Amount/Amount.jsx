import { useTranslation } from 'react-i18next';

import { RadioButtonGroup } from '../../../radio-button-group/radio-button-group.jsx';

export const Amount = ({ classNames }) => {
  const { t } = useTranslation();
  const networkConfig = useStoreState(state => state.common.networkConfig);
  const token = useStoreState(state => state.common.tokenConfig.token);
  const depositAmount = useStoreState(state => state.deposit.depositAmount);
  const setDepositAmount = useStoreActions(actions => actions.deposit.setDepositAmount);
  const tokenAmountRanges = networkConfig.amounts.map(({ amount }) => {
    return {
      id: `${token}-${amount}`,
      value: Number(amount),
      label: token,
    };
  });

  return (
    <>
      <section className={cn(classNames?.depositField, 'amount')}>
        <RadioButtonGroup
          label={t('amount')}
          options={tokenAmountRanges}
          value={depositAmount}
          onChange={setDepositAmount}
          classNames={classNames}
          tooltipText={t('depositAmountTooltip')}
        />
      </section>
    </>
  );
};
