import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import fetchAnalytics from './displayAnalytics.js';
import {
	Chart as ChartJS,
	ArcElement,
	BarElement,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
} from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';

import '../../styles/analytics.scss';
import Nav from '../../components/Navbar.jsx';

// Register ChartJS components
ChartJS.register(
	ArcElement,
	BarElement,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
);

function Analytics() {
	const navigate = useNavigate();
	const location = useLocation();
	const { sellingPrice } = location.state || {};

	// --- State Management ---
	const [stats, setStats] = useState(null);
	const [filterType, setFilterType] = useState('monthly');
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!sellingPrice) {
			navigate('/dashboard', { replace: true });
		} else {
			fetchAnalytics(filterType, page, sellingPrice, setLoading, setStats);
		}
	}, [filterType, page, sellingPrice]);

	if (loading && !stats)
		return <div className="loader">Loading Analytics...</div>;
	if (!stats) return null;

	const { summary, chartData, pagination } = stats;

	// --- Chart Data Configurations ---

	const donutData = {
		labels: ['Investment', 'Tax'],
		datasets: [
			{
				data: [summary.totalInvestment, summary.totalTax],
				backgroundColor: ['#3A7BD5', '#F27059'],
				borderWidth: 0,
			},
		],
	};

	const barData = {
		labels: chartData.map((d) => d.label),
		datasets: [
			{
				label: 'Investment amount',
				data: chartData.map((d) => d.investment),
				backgroundColor: '#A45EE5',
				borderRadius: 5,
			},
		],
	};

	const lineData = {
		labels: chartData.map((d) => d.label),
		datasets: [
			{
				label: 'Buying Value',
				data: chartData.map((d) => d.investment),
				borderColor: '#D94A5F',
				tension: 0.3,
				fill: false,
			},
			{
				label: 'Selling Value',
				data: chartData.map((d) => d.sellValue),
				borderColor: '#2E8B8C',
				tension: 0.3,
				fill: false,
			},
		],
	};

	return (
		<>
			<Nav />
			<main className="container">
				<section className="top-cards">
					<div className="card selling-card">
						<button className="icon-btn" onClick={() => navigate(-1)}>
							✎
						</button>
						<p>Gold Selling Price</p>
						<h2>₹{sellingPrice} / gm</h2>
					</div>
					<div className="card">
						<p>Current Value</p>
						<h2 className="value">₹{summary.currentValue}</h2>
					</div>
					<div className="card">
						<p>Return (With Tax)</p>
						<h2
							className={summary.returnWithTax >= 0 ? 'positive' : 'negative'}>
							₹{summary.returnWithTax}
						</h2>
					</div>
					<div className="card">
						<p>Return (Without Tax)</p>
						<h2
							className={
								summary.returnWithoutTax >= 0 ? 'positive' : 'negative'
							}>
							₹{summary.returnWithoutTax}
						</h2>
					</div>
					<div className="card">
						<p>Avg Return</p>
						<h2 className={summary.avgReturn >= 0 ? 'positive' : 'negative'}>
							{summary.avgReturn}%
						</h2>
					</div>
				</section>

				<div className="filter-pagination-row">
					<div className="time-filters">
						<button
							className={`filter-btn ${filterType === 'monthly' ? 'active' : ''}`}
							onClick={() => {
								setFilterType('monthly');
								setPage(1);
							}}>
							Monthly
						</button>
						<button
							className={`filter-btn ${filterType === 'yearly' ? 'active' : ''}`}
							onClick={() => {
								setFilterType('yearly');
								setPage(1);
							}}>
							Yearly
						</button>
					</div>
					<div className="pagination-controls">
						<button
							className="page-btn"
							disabled={page === 1}
							onClick={() => setPage((prev) => prev - 1)}>
							← Prev
						</button>
						<span>
							Page {pagination.currentPage} / {pagination.totalPages}
						</span>
						<button
							className="page-btn"
							disabled={page === pagination.totalPages}
							onClick={() => setPage((prev) => prev + 1)}>
							Next →
						</button>
					</div>
				</div>

				<section className="charts">
					<div className="chart-row">
						<div className="chart-card">
							<h4>📊 Investment vs Tax</h4>
							<div className="chart-container">
								<Doughnut
									data={donutData}
									options={{
										cutout: '70%',
										plugins: { legend: { display: false } },
									}}
								/>
								<div className="donut-center">₹{summary.totalPaid}</div>
							</div>
						</div>
						<div className="chart-card">
							<h4>📈 Investment Activity</h4>
							<Bar
								data={barData}
								options={{
									responsive: true,
									plugins: { legend: { display: false } },
								}}
							/>
						</div>
					</div>
					<div className="chart-card full">
						<h4>💰 Portfolio Value Trend</h4>
						<Line
							data={lineData}
							options={{ responsive: true, maintainAspectRatio: false }}
							style={{ height: '300px' }}
						/>
					</div>
				</section>
			</main>
		</>
	);
}

export default Analytics;
