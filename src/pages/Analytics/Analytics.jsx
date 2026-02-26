import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
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
import PageLoader from '../../components/PageLoader.jsx';

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
	const [resetPrice, setResetPrice] = useState(false);
	const { sellingPrice } = location.state || {};

	// --- State Management ---
	const [stats, setStats] = useState(null);
	const [filterType, setFilterType] = useState('monthly');
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const [btnLoading, setBtnLoading] = useState(false);
	const [newSellingPrice, setNewSellingPrice] = useState(sellingPrice);

	const handleSubmit = (e) => {
		e.preventDefault();
		setBtnLoading(true);

		setNewSellingPrice(e.target.price.value);
		navigate(location.pathname, {
			replace: true,
			state: { ...location.state, sellingPrice: newSellingPrice },
		});

		setBtnLoading(false);
		setResetPrice(false);
	};

	useEffect(() => {
		if (!sellingPrice) {
			navigate('/dashboard', { replace: true });
		} else {
			fetchAnalytics(filterType, page, sellingPrice, setLoading, setStats);
		}
	}, [filterType, page, sellingPrice]);

	if (loading && !stats) return <PageLoader display={loading} />;
	if (!stats) return null;

	const { summary, chartData, pagination } = stats;

	// --- Chart Data Configurations ---
	const getDonutGradients = (chart) => {
		const { ctx } = chart;
		const investGrad = ctx.createLinearGradient(0, 0, 0, 200);
		investGrad.addColorStop(0, '#3A7BD5');
		investGrad.addColorStop(1, '#2C5EB4');

		const taxGrad = ctx.createLinearGradient(0, 0, 0, 200);
		taxGrad.addColorStop(0, '#F27059');
		taxGrad.addColorStop(1, '#D9374E');
		return [investGrad, taxGrad];
	};

	const getBarGradient = (chart) => {
		const { ctx } = chart;
		const barGrad = ctx.createLinearGradient(0, 0, 0, 350);
		barGrad.addColorStop(0, '#20B2AA');
		barGrad.addColorStop(0.5, '#5F4B8B');
		barGrad.addColorStop(1, '#A45EE5');
		return barGrad;
	};

	const donutData = {
		labels: ['Investment', 'Tax Paid'],
		datasets: [
			{
				data: [summary.totalInvestment, summary.totalTax],
				backgroundColor: (context) => {
					const chart = context.chart;
					if (!chart.chartArea) return;
					return getDonutGradients(chart);
				},
				borderWidth: 2,
				borderColor: '#ffffff',
				borderRadius: 10,
			},
		],
	};

	const barData = {
		labels: chartData.map((d) => d.label),
		datasets: [
			{
				data: chartData.map((d) => d.investment),
				backgroundColor: (context) => {
					const chart = context.chart;
					if (!chart.chartArea) return;
					return getBarGradient(chart);
				},
				hoverBackgroundColor: '#003658',
				borderRadius: 8,
				barPercentage: 0.65,
			},
		],
	};

	const lineData = {
		labels: chartData.map((d) => d.label),
		datasets: [
			{
				label: 'Value at Buying',
				data: chartData.map((d) => d.investment),
				borderColor: '#D94A5F',
				backgroundColor: 'rgba(217,74,95,0.05)',
				pointBackgroundColor: '#D94A5F',
				pointBorderColor: '#ffffff',
				pointRadius: 4,
				tension: 0.2,
				borderWidth: 3,
				fill: false,
			},
			{
				label: 'Value at Selling',
				data: chartData.map((d) => d.sellValue),
				borderColor: '#2E8B8C',
				backgroundColor: 'rgba(46,139,140,0.03)',
				pointBackgroundColor: '#2E8B8C',
				pointBorderColor: '#ffffff',
				pointRadius: 4,
				tension: 0.2,
				borderWidth: 3,
				fill: false,
			},
		],
	};

	const centerTextPlugin = {
		id: 'centerText',
		afterDraw(chart) {
			const {
				ctx,
				chartArea: { top, bottom, left, right },
			} = chart;
			const cx = (left + right) / 2;
			const cy = (top + bottom) / 2;
			ctx.save();
			ctx.font = '700 18px Inter'; // Matches your original font
			ctx.fillStyle = '#1e293b';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillText(`₹${summary.totalPaid}`, cx, cy);
			ctx.restore();
		},
	};

	return (
		<>
			<PageLoader display={loading} />
			<Nav />

			<main className="container">
				<section className="top-cards">
					<div className="card selling-card">
						<button className="icon-btn" onClick={() => setResetPrice(true)}>
							<i className="fa fa-edit"></i>
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
									plugins={[centerTextPlugin]}
									options={{
										cutout: '68%',
										responsive: true,
										maintainAspectRatio: false,
										plugins: {
											legend: {
												display: true, // Set to true
												position: 'left',
												labels: {
													usePointStyle: true,
													pointStyle: 'circle',
													padding: 20,
													boxWidth: 8,
													font: {
														size: 12,
														family: 'Inter',
													},
												},
											},
										},
									}}
								/>
							</div>
						</div>
						<div className="chart-card">
							<h4>📈 Investment Activity</h4>
							<Bar
								data={barData}
								options={{
									responsive: true,
									plugins: { legend: { display: false } },
									scales: {
										x: { grid: { display: false } },
										y: { beginAtZero: true },
									},
								}}
							/>
						</div>
					</div>
					<div className="chart-card full">
						<h4>💰 Portfolio Value Trend</h4>
						<Line
							data={lineData}
							options={{
								responsive: true,
								maintainAspectRatio: false,
								plugins: {
									legend: {
										position: 'bottom',
										labels: {
											usePointStyle: true,
											boxWidth: 8,
											font: { size: 11 },
										},
									},
								},
							}}
							style={{ height: '300px' }}
						/>
					</div>
				</section>
			</main>

			<div
				className="modal-backdrop"
				style={{ display: resetPrice ? 'flex' : 'none' }}>
				<form className="modal analytics-modal" onSubmit={handleSubmit}>
					<h3>Analytics Setup</h3>

					<p className="analytics-text">
						Enter the current gold selling price to view updated returns and
						performance analytics.
					</p>

					<div className="form-group">
						<label>Current Gold Selling Price (₹ / gm)</label>
						<input
							type="number"
							step="0.01"
							name="price"
							placeholder="Eg: 6150.50"
							required
							value={newSellingPrice}
							onChange={(e) => setNewSellingPrice(e.target.value)}
						/>
					</div>

					<div className="modal-actions">
						<button
							type="button"
							className="btn-secondary"
							onClick={() => setResetPrice(false)}>
							Close
						</button>
						<button type="submit" disabled={btnLoading} className="btn-primary">
							{btnLoading ? (
								<>
									<span className="spinner"></span> Updating...
								</>
							) : (
								'Update '
							)}
						</button>
					</div>
				</form>
			</div>
		</>
	);
}

export default Analytics;
