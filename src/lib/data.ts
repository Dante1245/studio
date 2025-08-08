export const assets = [
  {
    name: 'Bitcoin',
    ticker: 'BTC',
    icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c258d5/svg/color/btc.svg',
    balance: 0,
    price: 68134.32,
    change24h: 1.5,
  },
  {
    name: 'Ethereum',
    ticker: 'ETH',
    icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c258d5/svg/color/eth.svg',
    balance: 0,
    price: 3557.8,
    change24h: -0.8,
  },
  {
    name: 'Tether',
    ticker: 'USDT',
    icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c258d5/svg/color/usdt.svg',
    balance: 200,
    price: 1.0,
    change24h: 0.01,
  },
  {
    name: 'Solana',
    ticker: 'SOL',
    icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c258d5/svg/color/sol.svg',
    balance: 0,
    price: 150.25,
    change24h: 3.2,
  },
  {
    name: 'Ripple',
    ticker: 'XRP',
    icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c258d5/svg/color/xrp.svg',
    balance: 0,
    price: 0.52,
    change24h: -2.1,
  },
  {
    name: 'Dogecoin',
    ticker: 'DOGE',
    icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c258d5/svg/color/doge.svg',
    balance: 0,
    price: 0.15,
    change24h: 5.5,
  },
  {
    name: 'Cardano',
    ticker: 'ADA',
    icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c258d5/svg/color/ada.svg',
    balance: 0,
    price: 0.45,
    change24h: -1.2,
  },
  {
    name: 'Avalanche',
    ticker: 'AVAX',
    icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c258d5/svg/color/avax.svg',
    balance: 0,
    price: 35.75,
    change24h: 2.8,
  },
  {
    name: 'Chainlink',
    ticker: 'LINK',
    icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c258d5/svg/color/link.svg',
    balance: 0,
    price: 18.5,
    change24h: 0.5,
  },
  {
    name: 'Polygon',
    ticker: 'MATIC',
    icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c258d5/svg/color/matic.svg',
    balance: 0,
    price: 0.75,
    change24h: -0.5,
  },
];

export type Transaction = {
  id: string;
  date: string;
  type: 'Bonus' | 'Withdrawal' | 'Deposit';
  asset: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Processing' | 'Failed';
};
