import { useState, useEffect } from 'react';
import {
	investmentCalculator,
	taxCalculator,
} from '../pages/dashboard/formCalculate.js';

function EditModal(modalData) {
	const [loading, setLoading] = useState(false);
	const [editDate, setEditDate] = useState('');
	const [editAmount, setEditAmount] = useState(0);
	const [editInvestment, setEditInvestment] = useState(0);
	const [editTax, setEditTax] = useState(0);
	const [editGold, setEditGold] = useState(0);

	useEffect(() => {
		if (modalData.recordDetails) {
			setEditDate(modalData.recordDetails.date);
			setEditAmount(modalData.recordDetails.total);
			setEditInvestment(modalData.recordDetails.investment);
			setEditTax(modalData.recordDetails.tax);
			setEditGold(modalData.recordDetails.gold);
		}
	}, [modalData.display]);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('form Submitted');
		setLoading(true);
	};

	return (
		<div
			className="modal-backdrop"
			id="addDataModal"
			style={{ display: modalData.display ? 'flex' : 'none' }}>
			<form className="modal" onSubmit={handleSubmit}>
				<h3>Edit Gold Investment</h3>

				<div className="form-group">
					<label>Date</label>
					<input
						type="date"
						name="date"
						value={editDate || ''}
						onChange={(e) => setEditDate(e.target.value)}
					/>
				</div>

				<div className="form-group">
					<label>Total Amount Paid (₹)</label>
					<input
						type="number"
						name="totalAmount"
						value={editAmount || 0}
						onChange={(e) =>
							investmentCalculator(
								e,
								setEditAmount,
								setEditInvestment,
								setEditTax,
							)
						}
						placeholder="Eg: 150000"
					/>
				</div>

				<div className="form-group">
					<label>Gold Invest Amount (₹)</label>
					<input
						type="number"
						name="investment"
						onChange={(e) =>
							taxCalculator(e, setEditInvestment, setEditTax, editAmount)
						}
						placeholder="Eg: 145611.31"
						value={editInvestment || 0}
					/>
				</div>

				<div className="form-group">
					<label>Tax (3%)</label>
					<input
						type="number"
						name="tax"
						readOnly
						placeholder="Eg: 4388.69"
						value={editTax || 0}
					/>
				</div>

				<div className="form-group">
					<label>Total Gold Got (gm)</label>
					<input
						type="number"
						step={0.00001}
						name="gold"
						placeholder="Eg: 9.500"
						value={editGold || 0}
						onChange={(e) => setEditGold(e.target.value)}
					/>
				</div>

				<div className="modal-actions">
					<button
						className="btn-secondary"
						type="button"
						onClick={() => modalData.closeModal(false)}>
						Close
					</button>

					<button disabled={loading} className="btn-primary" type="submit">
						{loading ? (
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
	);
}

export default EditModal;
