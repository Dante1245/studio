export type User = {
    id: string;
    name: string;
    email: string;
    avatar: string;
    joined: string;
    balance: number;
    status: 'Active' | 'Pending' | 'Blocked';
  };
  
  export const users: User[] = [
    {
      id: 'usr_001',
      name: 'Alice Johnson',
      email: 'alice.j@example.com',
      avatar: 'https://placehold.co/100x100.png',
      joined: '2023-01-15',
      balance: 1250.75,
      status: 'Active',
    },
    {
      id: 'usr_002',
      name: 'Bob Smith',
      email: 'bob.smith@example.com',
      avatar: 'https://placehold.co/100x100.png',
      joined: '2023-02-20',
      balance: 5320.00,
      status: 'Active',
    },
    {
      id: 'usr_003',
      name: 'Charlie Brown',
      email: 'charlie.b@example.com',
      avatar: 'https://placehold.co/100x100.png',
      joined: '2023-03-10',
      balance: 200.00,
      status: 'Blocked',
    },
    {
      id: 'usr_004',
      name: 'Diana Prince',
      email: 'diana.p@example.com',
      avatar: 'https://placehold.co/100x100.png',
      joined: '2023-04-05',
      balance: 10000.50,
      status: 'Active',
    },
    {
      id: 'usr_005',
      name: 'Ethan Hunt',
      email: 'ethan.h@example.com',
      avatar: 'https://placehold.co/100x100.png',
      joined: '2023-05-21',
      balance: 750.00,
      status: 'Pending',
    },
     {
      id: 'usr_006',
      name: 'Fiona Glenanne',
      email: 'fiona.g@example.com',
      avatar: 'https://placehold.co/100x100.png',
      joined: '2023-06-11',
      balance: 8900.25,
      status: 'Active',
    },
    {
      id: 'usr_007',
      name: 'George Costanza',
      email: 'george.c@example.com',
      avatar: 'https://placehold.co/100x100.png',
      joined: '2023-07-01',
      balance: 15.60,
      status: 'Active',
    },
    {
      id: 'usr_008',
      name: 'Hannah Montana',
      email: 'hannah.m@example.com',
      avatar: 'https://placehold.co/100x100.png',
      joined: '2023-08-18',
      balance: 12345.67,
      status: 'Blocked',
    },
  ];
  