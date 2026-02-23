import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Auth from '../AuthPage.jsx';
import handleFormLogin from './submitLogin.js';

function Signin() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const handleLogin = async (e) => {
		e.preventDefault();

		const isChecked = e.target.remember.checked;
		const isLogedin = await handleFormLogin(e, setLoading);

		if (isLogedin) {
			localStorage.setItem('remember_me', isChecked);

			navigate('/dashboard', { replace: true });
		}
	};

	return (
		<div className="auth-container">
			<Auth />

			<div className="auth-right">
				<div className="auth-card">
					<h2>Welcome back</h2>
					<p className="subtitle">
						Login to continue tracking your investments
					</p>

					<form onSubmit={handleLogin}>
						<div className="auth-group">
							<label>Email</label>
							<input
								type="email"
								name="email"
								placeholder="you@example.com"
								required
							/>
						</div>

						<div className="auth-group">
							<label>Password</label>
							<input
								name="password"
								type="password"
								placeholder="••••••••"
								autoComplete="password"
								required
							/>
						</div>

						<div className="auth-row">
							<label className="checkbox">
								<input type="checkbox" name="remember" checked />
								Remember me
							</label>
							<Link to="/forget-password" className="link">
								Forgot password?
							</Link>
						</div>

						<button
							disabled={loading}
							className="auth-btn-primary"
							type="submit">
							{loading ? (
								<>
									<span className="spinner"></span> Signing in...
								</>
							) : (
								'Sign in'
							)}
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
