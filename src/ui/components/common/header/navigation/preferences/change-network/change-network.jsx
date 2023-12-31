import { useAppStore } from '../../../../../../../stores/index.js';
import { RadioButtonList } from '../../../../radio-button-list/radio-button-list.jsx';

// const styles = {
//   network: {
//     display: 'flex',
//     alignItems: 'center',
//     '& img': {
//       width: 22,
//       marginRight: '.8em',
//     },
//   },
// };

export const NetworkChange = ({ onClose }) => {
  const networkId = useAppStore(state => state.common.user.network);
  const tokenConfig = useAppStore(state => state.common.tokenConfig);
  const setNetwork = useAppStore(action => action.common.setNetwork);
  const loadTxs = useAppStore(actions => actions.deposit.onGetTxs);

  const changeNetwork = chainId => {
    setNetwork(chainId);
    loadTxs();
    onClose();
  };

  const options = tokenConfig.networks.map(({ netId, name, icon }) => ({
    id: Number(netId),
    value: Number(netId),
    label: (
      <div className={classes.network}>
        <img src={icon} alt="" /> {name}
      </div>
    ),
  }));

  return <RadioButtonList options={options} value={Number(networkId)} onChange={changeNetwork} />;
};
