import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dayjs from 'dayjs';
var isToday = require('dayjs/plugin/isToday');

dayjs.extend(isToday);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      enabled: false,
      retry: false,
    },
  },
});

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    <ToastContainer />
  </React.StrictMode>
);
