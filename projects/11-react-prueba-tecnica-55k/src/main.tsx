// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// import AppOld from './AppOld.tsx'
import './index.css'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <App />
    {/* <AppOld /> */}
  </QueryClientProvider>
)
