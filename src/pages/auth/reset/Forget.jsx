import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Auth from '../AuthPage.jsx';
import handleSubmit from './sendMailHandler.js';
import resendOtp from './resendOtp.js';
import handleForgotForm from './submitResetForm.js';

function Forget() {
	const OTP_DURATION = 5 * 60;
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [otpForm, setOtpForm] = useState(false);
	const [email, setEmail] = useState('');
	const [resendCount, setResendCount] = useState(0);
	const [timeLeft, setTimeLeft] = useState(0);

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

	const handleEmailSubmit = async (e) => {
		e.preventDefault();

		setEmail(e.target.email.value);

		const isSuccess = await handleSubmit(e, setLoading);

		if (isSuccess) {
			setOtpForm(true);
		}
	};

	const handleResetSubmit = async (e) => {
		e.preventDefault();

		const isSuccess = await handleForgotForm(e, email, setLoading);

		if (isSuccess) {
			navigate('/login', { replace: true });
		}
	};

	return (
		<div className="auth-container">
			<Auth />

			<div className="auth-right">
				<div
					className="auth-card"
					style={{ display: otpForm ? 'none' : 'block' }}>
					<h2>Reset password</h2>
					<p className="subtitle">Verify your email and set a new password</p>

					<form onSubmit={handleEmailSubmit}>
						<div className="auth-group">
							<label>Email</label>
							<input
								type="email"
								name="email"
								placeholder="you@example.com"
								required
							/>
						</div>

						<button
							disabled={loading}
							className="auth-btn-primary"
							type="submit">
							{loading ? (
								<>
									<span className="spinner"></span> Sending OTP...
								</>
							) : (
								'Send OTP'
							)}
						</button>
					</form>

					<p className="footer-text">
						Remembered your password?{' '}
						<Link to="/login" className="link">
							Go back
						</Link>
					</p>
				</div>

				<div
					className="auth-card"
					style={{ display: otpForm ? 'block' : 'none' }}>
					<h2>Verify your email</h2>
					<p className="subtitle">
						Please enter the OTP sent to your email ({email})
					</p>

					<form onSubmit={handleResetSubmit}>
						<div className="auth-group">
							<label>OTP Code</label>
							<input
								type="text"
								name="otp"
								placeholder="Enter OTP"
								maxLength={6}
								autoComplete="otp"
								inputMode="numeric"
								required
							/>
						</div>

						<div className="auth-group">
							<label>New Password</label>
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
									<span className="spinner"></span>Resetting...
								</>
							) : (
								'Reset Password'
							)}
						</button>
					</form>

					<p className="footer-text">
						Didn’t receive the code?
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
								resendOtp(email);
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

export default Forget;
