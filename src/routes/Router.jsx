import { createBrowserRouter } from 'react-router-dom';
import Signin from '../pages/auth/signin/Login';
import Signup from '../pages/auth/signup/Register';
import Home from '../components/PathRedirector';
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
		path: '/dashboard',
		element: <h1>Dashboard</h1>,
	},
	{
		path: '*',
		element: <ErrorPage />,
	},
]);

export default router;
