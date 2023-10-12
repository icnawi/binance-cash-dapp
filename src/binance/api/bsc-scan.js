import { getNetworkConfig } from '../../utils';

export const BscScanAPI = {
  request: async (networkConfig, url) => {
    const request = await fetch(`${url}&apikey=${networkConfig.scanApiKey}`);
    const { status, result, message } = await request.json();

    // if failed, retry after 5 sec due to API limitations
    if (status === '0' && message.includes('NOTOK')) {
      await new Promise(resolve => setTimeout(resolve, 6000));
      const retryRequest = await fetch(`${url}&apikey=${networkConfig.scanApiKey}`);
      const { result: retryResult } = await retryRequest.json();
      return retryResult;
    }

    return result;
  },

  getLogs: async (netId, address, topic0, fromBlockNumber = 0, toBlockNumber = 'latest') => {
    const networkConfig = getNetworkConfig(netId);
    let fromBlock = fromBlockNumber > 0 ? fromBlockNumber : 0;
    let result = [];
    let logs;

    // Load logs in loop in case there is more than 1000 items
    while (!logs || fromBlock) {
      logs = await BscScanAPI.request(
        networkConfig,
        `${networkConfig.scanApi}?module=logs&action=getLogs&fromBlock=${fromBlock}&toBlock=${toBlockNumber}&address=${address}&topic0=${topic0}`,
      );

      if (Array.isArray(logs)) {
        result = result.concat(logs);
      }

      if (logs.length === 1000) {
        fromBlock = Number(logs[logs.length - 1].blockNumber);
      } else {
        fromBlock = null;
      }
    }

    return result.filter(
      ({ transactionHash }, index) =>
        result.findIndex(log => transactionHash === log.transactionHash) === index,
    );
  },
};
