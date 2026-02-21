import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Auth from './AuthPage.jsx';

function Signup() {
	const navigate = useNavigate();

	const [form, setForm] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (form.password !== form.confirmPassword) {
			alert('Passwords do not match');
			return;
		}

		// 🔐 signup logic here (API / Supabase later)
		console.log('Signup data:', form);

		// after success
		// navigate('/login', { replace: true });
	};

	return (
		<div className="auth-container">
			<Auth />

			<div className="auth-right">
				<div className="auth-card">
					<h2>Create account</h2>
					<p className="subtitle">Sign up to start tracking your investments</p>

					<form onSubmit={handleSubmit}>
						<div className="auth-group">
							<label>Name</label>
							<input
								type="text"
								name="name"
								placeholder="Your name"
								value={form.name}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="auth-group">
							<label>Email</label>
							<input
								type="email"
								name="email"
								placeholder="you@example.com"
								value={form.email}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="auth-group">
							<label>Password</label>
							<input
								type="password"
								name="password"
								placeholder="••••••••"
								value={form.password}
								onChange={handleChange}
								autoComplete="password"
								required
							/>
						</div>

						<button className="auth-btn-primary" type="submit">
							Sign up
						</button>
					</form>

					<p className="footer-text">
						Already have an account?{' '}
						<Link to="/login" className="link">
							Login
						</Link>
					</p>
				</div>
			</div>

			<div className="auth-right" style={{ display: 'none' }}>
				<div className="auth-card">
					<h2>Verify OTP</h2>
					<p className="subtitle">Enter the 6-digit code sent to your email</p>

					<form>
						<div className="auth-group">
							<label>OTP Code</label>
							<input
								type="text"
								name="otp"
								placeholder="Enter OTP"
								value={form.otp}
								maxLength={6}
								inputMode="numeric"
								required
							/>
						</div>

						<button className="auth-btn-primary" type="submit">
							Verify & Continue
						</button>
					</form>

					<p className="footer-text">
						Didn’t receive the code?{' '}
						<button type="button" className="link">
							Resend OTP
						</button>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Signup;
