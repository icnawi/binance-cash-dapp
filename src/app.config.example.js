// This is the example file
// TODO: Refactor this file

import bnbIcon from './ui/images/icons/bnb.svg';
import bnbTestnetIcon from './ui/images/icons/bnb-testnet.svg';
import maticIcon from './ui/images/icons/polygon-matic.svg';

/**
 * Application config example.
 * Fill all config properties and rename it to "app.config.js".
 * This config contains list of tokens. Each token has list of networks.
 * There always should be at least one network under each token. First network is default network for the token.
 * All config properties are required except "scanApiKey", but it is nice to have scanApiKey on Mainnet to improve loading performance.
 * */
export const appConfig = {
  urls: {
    metamask: 'https://metamask.io',
    metamaskChrome:
      'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
    aboutPage:
      'https://tornado-cash.medium.com/introducing-private-transactions-on-ethereum-now-42ee915babe0',
    privacyTipsPage:
      'https://tornado-cash.medium.com/how-to-stay-anonymous-with-tornado-cash-and-similar-solutions-efdecdbd7d37',
    faucet:
      'https://www.reddit.com/r/ethdev/comments/ftnfqc/the_new_new_new_if_you_need_some_g%C3%B6rli_testnet/',
    yourIP: 'https://www.torproject.org/',
  },
  tokens: [
    {
      token: 'BNB',
      decimals: 18,
      styles: {
        colors: {
          DARK_WHITE: '#eee',
          PRIMARY: '#f8d12f',
          ACTIVE_PRIMARY: '#f0b90b',
          SEMI_DARK_PRIMARY: '#40421e',
          DARK_PRIMARY: '#1f1e0e',
          BACKGROUND: '#000403',
          DARK_GREEN: '#0d1f16',
          GREY: '#393939',
          WARN: '#ff8a00',
          ERROR: '#ff0658',
        },
      },
      networks: [
        {
          netId: '56',
          name: 'BSC Mainnet',
          merkleTreeHeight: '20',
          protocolFeePercent: '0',
          scanUrl: 'https://bscscan.com',
          scanApi: 'https://api.bscscan.com/api',
          scanApiKey: 'IM9QJHFI6A1J7YKSK6ER9SPEC796QU9EM3',
          icon: bnbIcon,
          donationAddress: '0x11225B27DC1aC3376fe8be1f99fBf1895201508A',
          proxyContract: '0x671CCaa352db9C2830dBf05c456509a7b21c3e3C',
          amounts: [
            {
              amount: '0.1',
              instanceContract: '0x94006DfE7661b2831366C38201895d10a4E65a6D',
            },
            {
              amount: '1',
              instanceContract: '0xa94894d0c544B2ab7960f616c4c16E7B9481C62d',
            },
            {
              amount: '10',
              instanceContract: '0x2F3f7CC71695bC100e43E8c5E55ea62778e361A9',
            },
            {
              amount: '100',
              instanceContract: '0x88facb216fC65366ef24cdf42a9fDe24d8A7584F',
            },
            {
              amount: '1000',
              instanceContract: '0x337fC3945362a03D6b257A4924075BA0C818b0aB',
            },
          ],
          relayerApis: [
            {
              name: 'BinanceCash - 0.05%',
              url: 'https://relayer.binancecash.io',
            },
          ],
          rpcEndpoints: [
            {
              name: 'BSC Public RPC 1',
              url: 'https://bsc-dataseed.binance.org',
            },
          ],
        },
        {
          netId: '5',
          name: 'ETH Goerli',
          merkleTreeHeight: '20',
          protocolFeePercent: '0',
          scanUrl: 'https://goerli.etherscan.io',
          scanApi: 'https://api-goerli.etherscan.io/api',
          scanApiKey: 'EX5AD92M8NGSQQDM7QEQ6PKAP77ET9QBIV',
          icon: bnbTestnetIcon,
          donationAddress: '0x11225B27DC1aC3376fe8be1f99fBf1895201508A',
          proxyContract: '0x454d870a72e29d5E5697f635128D18077BD04C60',
          amounts: [
            {
              amount: '0.1',
              instanceContract: '0x6Bf694a291DF3FeC1f7e69701E3ab6c592435Ae7',
            },
            {
              amount: '1',
              instanceContract: '0x3aac1cC67c2ec5Db4eA850957b967Ba153aD6279',
            },
            {
              amount: '10',
              instanceContract: '0x723B78e67497E85279CB204544566F4dC5d2acA0',
            },
            {
              amount: '100',
              instanceContract: '0x0E3A09dDA6B20aFbB34aC7cD4A6881493f3E7bf7',
            },
          ],
          relayerApis: [
            {
              name: 'BinanceCash - 0.05%',
              url: 'https://goerli-v2.reloch.net',
            },
          ],
          rpcEndpoints: [
            {
              name: 'Infura',
              url: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
            },
          ],
        },
        {
          netId: '97',
          name: 'BSC Testnet',
          merkleTreeHeight: '20',
          protocolFeePercent: '0',
          scanUrl: 'https://testnet.bscscan.com',
          scanApi: 'https://api-testnet.bscscan.com/api',
          scanApiKey: 'IM9QJHFI6A1J7YKSK6ER9SPEC796QU9EM3',
          icon: bnbTestnetIcon,
          donationAddress: '0x11225B27DC1aC3376fe8be1f99fBf1895201508A',
          proxyContract: '0x6e1461886A907ed0A1fF680edA9A65aD8ABdC844',
          amounts: [
            {
              amount: '0.1',
              instanceContract: '0x51e211b523E3D07A6EcDaC640af0D478299520AA',
            },
            {
              amount: '1',
              instanceContract: '0x3D998a0EeCE8d0A70C5B1e826b3cF39FDea01a3D',
            },
            {
              amount: '10',
              instanceContract: '0x648E4a1f4069E24a514C3561B1C8EaB68a81bbeB',
            },
            {
              amount: '100',
              instanceContract: '0x9C01592B75f73ffe451327508DF77f005e82C8f8',
            },
            {
              amount: '1000',
              instanceContract: '0x2B7f05f59E7C517fa284CD53919984055b5577d5',
            },
          ],
          relayerApis: [
            {
              name: 'BinanceCash - 0.05%',
              url: 'http://localhost:8090',
            },
          ],
          rpcEndpoints: [
            {
              name: 'BSC Public RPC 1',
              url: 'https://data-seed-prebsc-2-s1.binance.org:8545',
            },
          ],
        },
      ],
    },
    {
      token: 'MATIC',
      decimals: 18,
      styles: {
        colors: {
          DARK_WHITE: '#eee',
          PRIMARY: '#2891f9',
          ACTIVE_PRIMARY: '#2b6def',
          SEMI_DARK_PRIMARY: '#1e2942',
          DARK_PRIMARY: '#0f111f',
          BACKGROUND: '#000403',
          DARK_GREEN: '#0d1f16',
          GREY: '#393939',
          WARN: '#ff8a00',
          ERROR: '#ff0658',
        },
      },
      networks: [
        {
          netId: '80001',
          name: 'MATIC Mumbai Testnet',
          merkleTreeHeight: '20',
          protocolFeePercent: '0',
          scanUrl: 'https://mumbai.polygonscan.com',
          scanApi: 'https://api-testnet.polygonscan.com/api',
          scanApiKey: 'Z21RY5N15K79JS97GK9TH9I76KCRJ9HY65',
          icon: maticIcon,
          donationAddress: '0x11225B27DC1aC3376fe8be1f99fBf1895201508A',
          proxyContract: '0xF0728f2141f77caBA3ECdFe44Fe69B235d60b9Fb',
          amounts: [
            {
              amount: '1',
              instanceContract: '0x94006DfE7661b2831366C38201895d10a4E65a6D',
            },
            {
              amount: '10',
              instanceContract: '0xa94894d0c544B2ab7960f616c4c16E7B9481C62d',
            },
            {
              amount: '100',
              instanceContract: '0x2F3f7CC71695bC100e43E8c5E55ea62778e361A9',
            },
            {
              amount: '1000',
              instanceContract: '0x88facb216fC65366ef24cdf42a9fDe24d8A7584F',
            },
          ],
          relayerApis: [
            {
              name: 'BinanceCash - 0.05%',
              url: 'http://localhost:8090',
            },
          ],
          rpcEndpoints: [
            {
              name: 'Matic Mumbai',
              url: 'https://matic-mumbai.chainstacklabs.com',
            },
          ],
        },
      ],
    },
  ],
};
