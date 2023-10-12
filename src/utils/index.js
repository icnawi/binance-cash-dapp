import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';

import { appConfig } from '../app.config';
import { LocalStorageKeys } from '../ui/config';

dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);

export const formatTokenAmount = amount =>
  Math.abs(amount) > 999
    ? `${Math.sign(amount) * (Math.abs(amount) / 1000).toFixed(1)}k`
    : Math.sign(amount) * Math.abs(amount);

export const isChrome = () =>
  /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

export const saveFile = (content, fileName, type = 'text') => {
  const file = new Blob([content], { type });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  document.body.appendChild(a);
  a.click();

  setTimeout(() => {
    document.body.removeChild(a);
  }, 0);
};

export const createDataRow = (id, timePassed, amount, subseqDepo, txHash, status, rewards) => ({
  id,
  timePassed,
  amount,
  subseqDepo,
  txHash,
  status,
  rewards,
});
export const formatDateDiff = date => dayjs.duration(dayjs().diff(dayjs(date))).humanize();
export const formatDateUTC = date => dayjs(date).utc().format('MMM D, YYYY h:mm A +UTC');

// ============ LOCAL STORAGE UTILS =================
export const getFromLS = (k, d = {}) => {
  const v = localStorage.getItem(k);
  if (typeof d !== 'object') {
    return v || d;
  }
  try {
    return JSON.parse(v || JSON.stringify(d));
  } catch (e) {
    return v || d;
  }
};
export const setToLS = (k, v) =>
  localStorage.setItem(k, typeof v === 'string' ? v : JSON.stringify(v));
export const removeFromLS = k => localStorage.removeItem(k);
// =========== END OF UTILS ================

export const formatSubsequentDeposits = subsequentDeposits => {
  if (subsequentDeposits <= 0) {
    return 'no deposits';
  }

  if (subsequentDeposits === 1) {
    return 'only 1 deposit';
  }

  if (subsequentDeposits < 5) {
    return `only ${subsequentDeposits} deposits`;
  }

  return `${subsequentDeposits} deposits`;
};

export const fromDecimals = (value, decimals = 18) => {
  const amount = value.toString();
  let ether = amount.toString();
  const base = new BN('10').pow(new BN(decimals));
  const baseLength = base.toString(10).length - 1 || 1;

  const negative = ether.substring(0, 1) === '-';
  if (negative) {
    ether = ether.substring(1);
  }

  if (ether === '.') {
    return null;
  }

  // Split it into a whole and fractional part
  const comps = ether.split('.');
  if (comps.length > 2) {
    return null;
  }

  let whole = comps[0];
  let fraction = comps[1];

  if (!whole) {
    whole = '0';
  }
  if (!fraction) {
    fraction = '0';
  }
  if (fraction.length > baseLength) {
    return null;
  }

  while (fraction.length < baseLength) {
    fraction += '0';
  }

  whole = new BN(whole);
  fraction = new BN(fraction);
  let wei = whole.mul(base).add(fraction);

  if (negative) {
    wei = wei.mul(negative);
  }

  return new BN(wei.toString(10), 10);
};

export const toDecimals = (value, decimals, fixed) => {
  const zero = new BN(0);
  const negative1 = new BN(-1);
  decimals = decimals || 18;
  fixed = fixed || 7;

  value = new BN(value);
  const negative = value.lt(zero);
  const base = new BN('10').pow(new BN(decimals));
  const baseLength = base.toString(10).length - 1 || 1;

  if (negative) {
    value = value.mul(negative1);
  }

  let fraction = value.mod(base).toString(10);
  while (fraction.length < baseLength) {
    fraction = `0${fraction}`;
  }
  [, fraction] = fraction.match(/^([0-9]*[1-9]|0)(0*)/);

  const whole = value.div(base).toString(10);
  value = `${whole}${fraction === '0' ? '' : `.${fraction}`}`;

  if (negative) {
    value = `-${value}`;
  }

  if (fixed) {
    value = value.slice(0, fixed);
  }

  return value;
};

export const getTokenConfig = (currentNetId = getFromLS(LocalStorageKeys.NETWORK)) => {
  return (
    appConfig.tokens.find(({ networks }) =>
      networks.some(({ netId }) => Number(netId) === Number(currentNetId)),
    ) || appConfig.tokens[0]
  );
};

export const getNetworkConfig = (currentNetId = getFromLS(LocalStorageKeys.NETWORK)) => {
  const tokenConfig = getTokenConfig(currentNetId);
  return (
    tokenConfig.networks.find(({ netId }) => Number(netId) === Number(currentNetId)) ||
    tokenConfig.networks[0]
  );
};

export const insertAt = (str, sub, pos) => `${str.slice(0, pos)}${sub}${str.slice(pos)}`;

export function indexToKey(prefix, level, index) {
  return `${prefix}_tree_${level}_${index}`;
}
