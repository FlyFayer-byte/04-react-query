import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import './styles/index.css';

// React Query: клієнт і провайдер
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Toasts (для повідомлень про помилки)
import { Toaster } from 'react-hot-toast';

// Створюємо інстанс QueryClient — це "мозок" кешування
const queryClient = new QueryClient();

// Рендеримо React-додаток
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Надаємо React Query доступ до всього застосунку */}
    <QueryClientProvider client={queryClient}>
      <App />
      {/* Глобальний компонент для тостів */}
      <Toaster position="top-right" />
    </QueryClientProvider>
  </React.StrictMode>
);
