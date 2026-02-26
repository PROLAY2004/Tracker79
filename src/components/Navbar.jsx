import { useNavigate } from 'react-router-dom';
import logout from '../utils/logout.js';

function Nav() {
	const navigate = useNavigate();
	const userLogout = () => {
		if (logout()) {
			navigate('/login', { replace: true });
		}
	};

	return (
		<header className="navbar">
			<h1 className="logo">Tracker79</h1>
			<button className="logout-btn" onClick={userLogout}>
				<i className="fa fa-sign-out"></i> Logout
			</button>
		</header>
	);
}

export default Nav;
