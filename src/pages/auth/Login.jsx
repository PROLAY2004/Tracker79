import { Link } from 'react-router-dom';
import Auth from './AuthPage.jsx';

function Signin() {
	return (
		<div className="auth-container">
			<Auth />

			<div className="auth-right">
				<div className="auth-card">
					<h2>Welcome back</h2>
					<p className="subtitle">
						Login to continue tracking your investments
					</p>

					<form>
						<div className="auth-group">
							<label>Email</label>
							<input type="email" placeholder="you@example.com" required />
						</div>

						<div className="auth-group">
							<label>Password</label>
							<input type="password" placeholder="••••••••" required />
						</div>

						<div className="auth-row">
							<label className="checkbox">
								<input type="checkbox" />
								Remember me
							</label>
							<Link to="#" className="link">
								Forgot password?
							</Link>
						</div>

						<button className="auth-btn-primary" type="submit">
							Login
						</button>
					</form>

					<p className="footer-text">
						Don’t have an account?
						<Link to="/register" className="link">
							Create one
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Signin;
