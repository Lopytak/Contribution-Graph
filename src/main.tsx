import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Main from './pages/Main/Main'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Main />
        </QueryClientProvider>
    </React.StrictMode>,
)
