import './App.css'
import AppRoutes from './routes/AppRoutes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import  ErrorBoundary from "./components/ErrorBoundary"

function App() {
const queryClient = new QueryClient();

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
    </QueryClientProvider>  
    </>
  )
}

export default App
