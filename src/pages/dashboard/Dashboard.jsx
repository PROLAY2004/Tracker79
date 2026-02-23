import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import '../../styles/dashboard.scss';
import Card from '../../components/Cards.jsx';
import List from '../../components/Lists.jsx';
import AddModal from '../../components/AddModal.jsx';
import logout from './logout.js';

function Dashboard() {
	const navigate = useNavigate();
	const [addModal, setaddModal] = useState(false);

	function displayAddModal() {
		setaddModal(true);
	}

	function closeModal() {
		setaddModal(false);
	}

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
				<h3>Investment History</h3>

				<button className="btn-primary" onClick={displayAddModal}>
					Add Data
				</button>
			</div>

			<section className="list-section">
				<div className="table">
					<div className="table-header">
						<span>Date</span>
						<span>Amount</span>
						<span>Gold (gm)</span>
						<span>Return %</span>
						<span>Return % (No Tax)</span>
						<span>Actions</span>
					</div>

					<List
						date="12 Jan 2025"
						amount="₹1,50,000"
						gold="24.15"
						returnPercentage="+10.8%"
						returnPercentageNoTax="+14.1%"
					/>
					<List
						date="05 Nov 2024"
						amount="₹2,00,000"
						gold="32.80"
						returnPercentage="+13.6%"
						returnPercentageNoTax="+16.9%"
					/>
					<List
						date="18 Jul 2024"
						amount="₹1,00,000"
						gold="15.40"
						returnPercentage="-2.1%"
						returnPercentageNoTax="+1.2%"
					/>
				</div>

				<div className="pagination">
					<button className="page-btn">‹</button>
					<button className="page-btn active">1</button>
					<button className="page-btn">2</button>
					<button className="page-btn">3</button>
					<button className="page-btn">›</button>
				</div>
			</section>

			<AddModal display={addModal} closeModal={closeModal} />
		</div>
	);
}

export default Dashboard;
