import { createBrowserRouter } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute.jsx';
import Signin from '../pages/auth/signin/Login';
import Signup from '../pages/auth/signup/Register';
import Forget from '../pages/auth/reset/Forget';
import Dashboard from '../pages/dashboard/Dashboard.jsx';
import ErrorPage from '../components/DefaultPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <ProtectedRoute />,
	},
	{
		path: '/login',
		element: <Signin />,
	},
	{
		path: '/register',
		element: <Signup />,
	},
	{
		path: '/forget-password',
		element: <Forget />,
	},
	{
		path: '/dashboard',
		element: (
			<ProtectedRoute>
				<Dashboard />
			</ProtectedRoute>
		),
	},
	{
		path: '*',
		element: <ErrorPage />,
	},
]);

export default router;
