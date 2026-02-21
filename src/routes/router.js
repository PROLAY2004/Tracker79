import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
	{
		path: '/login',
		element: <h1>Login Page</h1>,
	},
	{
		path: '/dashboard',
		element: <h1>Dashboard</h1>,
	},
]);

export default router;
