import { useNavigate } from 'react-router-dom';

import '../../styles/dashboard.scss';
import Card from '../../components/Cards';
import logout from './logout.js';

function Dashboard() {
	const navigate = useNavigate();

	const userLogout = () => {
		const isSuccess = logout();

		if (isSuccess) {
			navigate('/login', { replace: true });
		}
	};

	return (
		<div className="main-content">
			<header className="navbar">
				<h1 className="logo">Tracker79</h1>
				<button className="logout-btn" onClick={userLogout}>
					Logout
				</button>
			</header>

			<section className="summary">
				<Card title={'Total Invested'} value={'₹4,50,000'} />
				<Card title={'Total Gold'} value={'72.35 gm'} />
				<Card title={'Avg Return'} value={'+12.4%'} color="positive" />
			</section>

			<div className="section-action">
				<span className="section-title">Investment History</span>

				<button className="btn-primary">Add Data</button>
			</div>

			<section className="list-section">
				<div className="table">
					<div className="table-header">
						<span>Date</span>
						<span>Amount</span>
						<span>Gold (gm)</span>
						<span>Return %</span>
						<span>Return % (No Tax)</span>
					</div>

					<div className="table-row">
						<span>12 Jan 2025</span>
						<span>₹1,50,000</span>
						<span>24.15</span>
						<span className="positive">+10.8%</span>
						<span className="positive">+14.1%</span>
					</div>

					<div className="table-row">
						<span>05 Nov 2024</span>
						<span>₹2,00,000</span>
						<span>32.80</span>
						<span className="positive">+13.6%</span>
						<span className="positive">+16.9%</span>
					</div>

					<div className="table-row">
						<span>18 Jul 2024</span>
						<span>₹1,00,000</span>
						<span>15.40</span>
						<span className="negative">-2.1%</span>
						<span className="positive">+1.2%</span>
					</div>
				</div>

				<div className="pagination">
					<button className="page-btn">‹</button>
					<button className="page-btn active">1</button>
					<button className="page-btn">2</button>
					<button className="page-btn">3</button>
					<button className="page-btn">›</button>
				</div>
			</section>
		</div>
	);
}

export default Dashboard;
