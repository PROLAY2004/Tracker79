import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AnalyticsModal(modalData) {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [price, setSellingPrice] = useState('');

	const handleSuibmit = (e) => {
		e.preventDefault();
		const sellingPrice = e.target.price.value;

		navigate('/analytics', {
			state: { sellingPrice },
		});
	};

	return (
		<div
			className="modal-backdrop"
			style={{ display: modalData.display ? 'flex' : 'none' }}>
			<form className="modal analytics-modal" onSubmit={handleSuibmit}>
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
						value={price}
						onChange={(e) => setSellingPrice(e.target.value)}
					/>
				</div>

				<div className="modal-actions">
					<button
						type="button"
						className="btn-secondary"
						onClick={() => modalData.closeModal(false)}>
						Close
					</button>
					<button type="submit" disabled={loading} className="btn-primary">
						{loading ? (
							<>
								<span className="spinner"></span> Redirecting...
							</>
						) : (
							'View Analytics '
						)}
					</button>
				</div>
			</form>
		</div>
	);
}

export default AnalyticsModal;
