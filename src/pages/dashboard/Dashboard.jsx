import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import '../../styles/dashboard.scss';
import Card from '../../components/Cards.jsx';
import Loader from '../../components/PageLoader.jsx';
import List from '../../components/Lists.jsx';
import AddModal from '../../components/AddModal.jsx';
import displayData from './fetchData.js';
import logout from './logout.js';
import formatDate from '../../utils/dateFormater.js';

function Dashboard() {
	const navigate = useNavigate();
	const [addModal, setaddModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [reload, setReload] = useState(0);
	const [total, setTotal] = useState(0);
	const [invest, setInvest] = useState(0);
	const [goldQtn, setGoldQtn] = useState(0);
	const [records, setRecords] = useState([]);

	const userLogout = () => {
		if (logout()) {
			navigate('/login', { replace: true });
		}
	};

	useEffect(() => {
		displayData(setTotal, setInvest, setGoldQtn, setRecords, setLoading);
	}, [reload]);

	return (
		<div className="main-content">
			<Loader display={loading} />

			<header className="navbar">
				<h1 className="logo">Tracker79</h1>
				<button className="logout-btn" onClick={userLogout}>
					Logout
				</button>
			</header>

			<section className="summary">
				<Card title={'Total Invested (Including Tax)'} value={'₹' + total} />
				<Card title={'Total Invested (Excluding Tax)'} value={'₹' + invest} />
				<Card title={'Total Gold Quantity'} value={goldQtn + ' gm'} />
				<Card title={'Avg Return'} value={'+00.0%'} color="positive" />
			</section>

			<div className="section-action">
				<h3>Investment History</h3>

				<button className="btn-primary" onClick={() => setaddModal(true)}>
					<b>+</b> Add Data
				</button>
			</div>

			<section className="list-section">
				<div
					className="table"
					style={{ display: records.length ? 'block' : 'none' }}>
					<div className="table-header">
						<span>Date</span>
						<span>Amount</span>
						<span>Gold (gm)</span>
						<span>Return %</span>
						<span>Return % (No Tax)</span>
						<span>Actions</span>
					</div>

					{records.map((record) => {
						return (
							<List
								key={record._id}
								date={formatDate(record.date)}
								amount={`₹` + record.total.toFixed(2)}
								gold={record.gold + ' gm'}
								returnPercentage="+0%"
								returnPercentageNoTax="+0%"
							/>
						);
					})}
				</div>

				<div
					className="table-empty"
					style={{ display: records.length ? 'none' : 'flex' }}>
					<div className="empty-content">
						<div className="empty-icon">
							<i className="fa fa-bar-chart"></i>
						</div>
						<h3>No records yet</h3>
						<p>
							Your gold investment records will appear here once you add your
							first entry.
						</p>
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

			<AddModal
				display={addModal}
				closeModal={setaddModal}
				pageLoader={setReload}
			/>
		</div>
	);
}

export default Dashboard;
