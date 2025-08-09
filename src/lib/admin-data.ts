export type User = {
    id: string;
    name: string;
    email: string;
    avatar: string;
    joined: string;
    balance: number;
    status: 'Active' | 'Pending' | 'Blocked';
  };
  
  // This is now empty. The UsersView component will generate a live user instead.
  export const users: User[] = [];
  