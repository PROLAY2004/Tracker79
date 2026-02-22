import { createBrowserRouter } from 'react-router-dom';
import Signin from '../pages/auth/signin/Login';
import Signup from '../pages/auth/signup/Register';
import Forget from '../pages/auth/reset/Forget';
import Home from '../components/Home';
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
		element: <h1>Dashboard</h1>,
	},
	{
		path: '*',
		element: <ErrorPage />,
	},
]);

export default router;
