import { createBrowserRouter } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute.jsx';
import Signin from '../pages/auth/signin/Login';
import Signup from '../pages/auth/signup/Register';
import Forget from '../pages/auth/reset/Forget';
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
				<h1>Dashboard</h1>
			</ProtectedRoute>
		),
	},
	{
		path: '*',
		element: <ErrorPage />,
	},
]);

export default router;
