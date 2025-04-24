import { SocketContext } from '@/contexts/socket-context';
import { use } from 'react';

export const useSocketContext = () => {
  const context = use(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
