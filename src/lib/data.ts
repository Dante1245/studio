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
];

export type Transaction = {
  id: string;
  date: string;
  type: 'Bonus' | 'Withdrawal' | 'Deposit';
  asset: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Processing' | 'Failed';
};
