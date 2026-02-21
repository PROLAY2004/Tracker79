import '../../styles/auth.scss';

function Auth() {
	return (
		<div className="auth-left">
			<div className="auth-left-overlay"></div>

			<div className="auth-left-content">
				<h1>Tracker79</h1>

				<p className="auth-tagline">
					Track your gold investments.
					<br />
					Measure returns.
					<br />
					Stay ahead.
				</p>

				<div className="auth-divider"></div>

				<p className="auth-subtext">
					A clean, private dashboard to monitor your gold portfolio with clarity
					and confidence.
				</p>
			</div>
		</div>
	);
}

export default Auth;
