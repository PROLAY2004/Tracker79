import { useState } from 'react';
import addFormSubmit from '../pages/dashboard/addFormSubmit.js';

function AnalyticsModal(modalData) {
	return (
		<div
			className="modal-backdrop"
			style={{ display: modalData.display ? 'flex' : 'none' }}>
			<form className="modal analytics-modal">
				<h3>Analytics Setup</h3>

				<p className="analytics-text">
					Enter the current gold selling price to view updated returns and
					performance analytics.
				</p>

				<div className="form-group">
					<label>Current Gold Selling Price (₹ / gm)</label>
					<input type="number" step="0.01" placeholder="Eg: 6150.50" required />
				</div>

				<div className="modal-actions">
					<button
						type="button"
						className="btn-secondary"
						onClick={() => modalData.closeModal(false)}>
						Cancel
					</button>
					<button type="submit" className="btn-primary">
						View Analytics
					</button>
				</div>
			</form>
		</div>
	);
}

export default AnalyticsModal;
