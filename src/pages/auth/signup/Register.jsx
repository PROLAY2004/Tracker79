import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Auth from '../AuthPage.jsx';
import handleSubmit from './submitRegister.js';
import handleVerify from './verifyForm.js';
import resendOtp from './resendOtp.js';

function Signup() {
	const OTP_DURATION = 5 * 60;
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [otpForm, setOtpForm] = useState(false);
	const [userEmail, setUserEmail] = useState('');
	const [timeLeft, setTimeLeft] = useState(OTP_DURATION);
	const [resendCount, setResendCount] = useState(0);

	useEffect(() => {
		if (!otpForm) return;

		setTimeLeft(OTP_DURATION);

		const interval = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev <= 1) {
					clearInterval(interval);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(interval);
	}, [otpForm, resendCount]);

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		setUserEmail(e.target.email.value);

		const isSuccess = await handleSubmit(e, setLoading);

		setOtpForm(isSuccess);
	};

	const handleOtpSubmit = async (e) => {
		e.preventDefault();
		const isVerified = await handleVerify(e, userEmail, setLoading);

		if (isVerified) {
			navigate('/login', { replace: true });
		}
	};

	return (
		<div className="auth-container">
			<Auth />

			<div
				className="auth-right"
				style={{ display: otpForm ? 'none' : 'flex' }}>
				<div className="auth-card">
					<h2>Create account</h2>
					<p className="subtitle">Sign up to start tracking your investments</p>

					<form onSubmit={handleFormSubmit}>
						<div className="auth-group">
							<label>Name</label>
							<input type="text" name="name" placeholder="Your name" required />
						</div>

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
								type="password"
								name="password"
								placeholder="••••••••"
								autoComplete="password"
								required
							/>
						</div>

						<button
							disabled={loading}
							className="auth-btn-primary"
							type="submit">
							{loading ? (
								<>
									<span className="spinner"></span> Signing up...
								</>
							) : (
								'Sign up'
							)}
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

			<div
				className="auth-right"
				style={{ display: otpForm ? 'flex' : 'none' }}>
				<div className="auth-card">
					<h2>Verify OTP</h2>
					<p className="subtitle">
						Enter the 6-digit code sent to your email ({userEmail}).
					</p>

					<form onSubmit={handleOtpSubmit}>
						<div className="auth-group">
							<label>OTP Code</label>
							<input
								type="text"
								name="otp"
								placeholder="Enter OTP"
								maxLength={6}
								inputMode="numeric"
								required
							/>
						</div>

						<button
							disabled={loading}
							className="auth-btn-primary"
							type="submit">
							{loading ? (
								<>
									<span className="spinner"></span> Verifying...
								</>
							) : (
								'Verify & Continue'
							)}
						</button>
					</form>

					<p className="footer-text">
						Didn’t receive the code?{' '}
						<strong style={{ display: timeLeft ? 'inline' : 'none' }}>
							{Math.floor(timeLeft / 60)}:
							{String(timeLeft % 60).padStart(2, '0')}
						</strong>
						<button
							style={{ display: timeLeft ? 'none' : 'inline' }}
							type="button"
							className="link"
							disabled={timeLeft > 0}
							onClick={() => {
								resendOtp(userEmail);
								setResendCount((prev) => prev + 1);
							}}>
							Resend OTP
						</button>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Signup;
