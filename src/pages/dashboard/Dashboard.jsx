import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import '../../styles/dashboard.scss';
import Card from '../../components/Cards.jsx';
import Loader from '../../components/PageLoader.jsx';
import List from '../../components/Lists.jsx';
import AddModal from '../../components/AddModal.jsx';
import DeleteModal from '../../components/DeleteModal.jsx';
import displayData from './fetchData.js';
import logout from './logout.js';

function Dashboard() {
	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [addModal, setaddModal] = useState(false);
	const [delModal, setDelModal] = useState(false)
	const [recordId, setRecordId] = useState('')

	const [loading, setLoading] = useState(false);
	const [reload, setReload] = useState(0);
	const [total, setTotal] = useState(0);
	const [invest, setInvest] = useState(0);
	const [goldQtn, setGoldQtn] = useState(0);
	const [tax, setTax] = useState(0);
	const [records, setRecords] = useState([]);

	const userLogout = () => {
		if (logout()) {
			navigate('/login', { replace: true });
		}
	};

	useEffect(() => {
		displayData(
			setTotal,
			setInvest,
			setGoldQtn,
			setTax,
			setRecords,
			setLoading,
			currentPage,
			setTotalPages,
		);
	}, [reload, currentPage]);

	return (
		<div className="main-content">
			<Loader display={loading} />

			<header className="navbar">
				<h1 className="logo">Tracker79</h1>
				<button className="logout-btn" onClick={userLogout}>
					<i className="fa fa-sign-out"></i> Logout
				</button>
			</header>

			<section className="summary">
				<Card title={'Total Invested (Including Tax)'} value={'₹' + total} />
				<Card title={'Total Invested (Excluding Tax)'} value={'₹' + invest} />
				<Card title={'Total Tax Paid'} value={'₹' + tax} />
				<Card title={'Total Gold Quantity'} value={goldQtn + ' gm'} />
			</section>

			<div className="section-action">
				<h3>Investment History</h3>

				<div className="btn-group">
					<button
						className="btn-secondary"
						style={{ display: records.length ? 'block' : 'none' }}>
						<i className="fa fa-line-chart"></i>
					</button>

					<button className="btn-primary" onClick={() => setaddModal(true)}>
						<b className="add-Btn">
							<i className="fa fa-plus"></i>{' '}
							<span className="add-text">Add Data</span>
						</b>
					</button>
				</div>
			</div>

			<section className="list-section">
				<div
					className="table"
					style={{ display: records.length ? 'block' : 'none' }}>
					<div className="table-header">
						<span>Date</span>
						<span>Investment</span>
						<span>Tax (3%)</span>
						<span>Total Amount</span>
						<span>Gold (gm)</span>
						<span>Actions</span>
					</div>

					{records.map((record) => {
						return (
							<List
								key={record._id}
								record={record}
								deleteModal={setDelModal}
								setRecordId={setRecordId}
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
					<button
						className="page-btn"
						disabled={currentPage === 1}
						onClick={() => setCurrentPage((prev) => prev - 1)}>
						‹
					</button>

					{[...Array(totalPages)].map((_, index) => (
						<button
							key={index + 1}
							className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
							onClick={() => setCurrentPage(index + 1)}>
							{index + 1}
						</button>
					))}

					<button
						className="page-btn"
						disabled={currentPage === totalPages || records.length == 0}
						onClick={() => setCurrentPage((prev) => prev + 1)}>
						›
					</button>
				</div>
			</section>

			<AddModal
				display={addModal}
				closeModal={setaddModal}
				pageLoader={setReload}
			/>

			<DeleteModal
				display={delModal}
				closeModal={setDelModal}
				recordId={recordId}
				deleteModal={setDelModal}
				pageLoader={setReload}
			/>
		</div>
	);
}

export default Dashboard;
