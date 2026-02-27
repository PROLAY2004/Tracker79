import { useState, useEffect } from 'react';

import '../../styles/dashboard.scss';
import Nav from '../../components/Navbar.jsx';
import Card from '../../components/Cards.jsx';
import Loader from '../../components/PageLoader.jsx';
import List from '../../components/Lists.jsx';
import AddModal from '../../components/AddModal.jsx';
import EditModal from '../../components/EditModal.jsx';
import AnalyticsModal from '../../components/AnalyticsModal.jsx';
import DeleteModal from '../../components/DeleteModal.jsx';
import displayData from './fetchData.js';

function Dashboard() {
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [addModal, setaddModal] = useState(false);
	const [delModal, setDelModal] = useState(false);
	const [editModal, setEditModal] = useState(false);
	const [analyticsModal, setAnalyticsModal] = useState(false);
	const [recordId, setRecordId] = useState('');
	const [recordDetails, setRecordDetails] = useState({});
	const [loading, setLoading] = useState(false);
	const [reload, setReload] = useState(0);
	const [total, setTotal] = useState(0);
	const [invest, setInvest] = useState(0);
	const [goldQtn, setGoldQtn] = useState(0);
	const [tax, setTax] = useState(0);
	const [records, setRecords] = useState([]);

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

			<Nav />

			<section className="summary">
				<Card title={'TOTAL INVESTED (WITH TAX)'} value={'₹' + total} />
				<Card title={'Total Invested (WITHOUT Tax)'} value={'₹' + invest} />
				<Card title={'Total Tax Paid'} value={'₹' + tax} />
				<Card title={'Total Gold Quantity'} value={goldQtn + ' gm'} />
			</section>

			<div className="section-action">
				<h3>Investment History</h3>

				<div className="btn-group">
					<button
						className="btn-secondary"
						onClick={() => setAnalyticsModal(true)}
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
								editModal={setEditModal}
								setRecordDetails={setRecordDetails}
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
						className="dashboard-page-btn"
						disabled={currentPage === 1}
						onClick={() => setCurrentPage((prev) => prev - 1)}>
						‹
					</button>

					{[...Array(totalPages)].map((_, index) => (
						<button
							key={index + 1}
							className={`dashboard-page-btn ${currentPage === index + 1 ? 'active' : ''}`}
							onClick={() => setCurrentPage(index + 1)}>
							{index + 1}
						</button>
					))}

					<button
						className="dashboard-page-btn"
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
				pageLoader={setReload}
			/>

			<EditModal
				display={editModal}
				closeModal={setEditModal}
				recordDetails={recordDetails}
				setRecordDetails={setRecordDetails}
				pageLoader={setReload}
			/>

			<AnalyticsModal display={analyticsModal} closeModal={setAnalyticsModal} />
		</div>
	);
}

export default Dashboard;
