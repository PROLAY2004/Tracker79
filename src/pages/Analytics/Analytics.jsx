import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Analytics() {
	const navigate = useNavigate();
	const location = useLocation();
	const { price } = location.state || {};

	useEffect(() => {
		if (!price) {
			navigate('/dashboard', { replace: true });
		}
	});

	return <h1>Gold Price: {price}</h1>;
}

export default Analytics;
