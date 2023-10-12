import { thunk } from 'easy-peasy';

export const onGetUserIpInfo = thunk(async actions => {
  const ipInfo = await (await fetch('https://api64.ipify.org?format=json')).json();
  actions.setUserIpInfo(ipInfo);
});
