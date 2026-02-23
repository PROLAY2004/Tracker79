import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import isAuthenticated from '../utils/checkAuth.js';

function Home() {
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated()) {
			navigate('/dashboard', { replace: true });
		} else {
			navigate('/login', { replace: true });
		}
	}, [navigate]);
}

export default Home;
