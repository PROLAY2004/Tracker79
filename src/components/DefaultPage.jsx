import '../styles/error.scss';
import { Link } from 'react-router-dom';

function ErrorPage() {
	return (
		<div className="error-container">
			<div className="gif">
				<img src="https://i.postimg.cc/2yrFyxKv/giphy.gif" alt="gif_ing" />
			</div>
			<div className="content">
				<h3 className="main-heading">404 Not Found</h3>
				<p className='errorText'>The page you're looking for is not found or never existed.</p>

				<Link to="/" className="btn-primary">
					Back to home <i className="far fa-hand-point-right"></i>
				</Link>
			</div>
		</div>
	);
}

export default ErrorPage;
