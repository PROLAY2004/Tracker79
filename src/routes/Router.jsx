import { createBrowserRouter } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute.jsx';
import Home from '../components/Home.jsx';
import Signin from '../pages/auth/signin/Login.jsx';
import Signup from '../pages/auth/signup/Register.jsx';
import Forget from '../pages/auth/reset/Forget.jsx';
import Dashboard from '../pages/dashboard/Dashboard.jsx';
import Analytics from '../pages/Analytics/Analytics.jsx';
import ErrorPage from '../components/DefaultPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
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
		path: '/analytics',
		element: (
			<ProtectedRoute>
				<Analytics />
			</ProtectedRoute>
		),
	},
	{
		path: '*',
		element: <ErrorPage />,
	},
]);

export default router;
