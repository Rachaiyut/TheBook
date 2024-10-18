import { Suspense } from 'react';

// React-Router-Dom
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from "./routes/AppRoutes"

// React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// import { ToastContainer } from 'react-toastify';

// ui
import Loader from './ui/Loader';

const queryClient = new QueryClient({
	defaultOptions: {
		staleTime: 1000
	}
})

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />

			<Suspense fallback={<Loader />}>
				<Router>
					<AppRoutes />
				</Router>
			</Suspense>

			{/* <ToastContainer /> */}
		</QueryClientProvider>
	)
}

export default App
