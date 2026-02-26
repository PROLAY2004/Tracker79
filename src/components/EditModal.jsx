import { useState, useEffect } from 'react';
import {
	investmentCalculator,
	taxCalculator,
} from '../pages/dashboard/formCalculate.js';
import editFormSubmit from '../pages/dashboard/editFormSubmit.js';

function EditModal(modalData) {
	const recordId = modalData.recordDetails._id;
	const [loading, setLoading] = useState(false);
	const [editDate, setEditDate] = useState('');
	const [editAmount, setEditAmount] = useState('');
	const [editInvestment, setEditInvestment] = useState('');
	const [editTax, setEditTax] = useState('');
	const [editGold, setEditGold] = useState('');

	useEffect(() => {
		const investment = modalData.recordDetails.investment;

		setEditDate(modalData.recordDetails.date);
		setEditAmount(modalData.recordDetails.total);
		setEditInvestment(investment);
		setEditTax(modalData.recordDetails.tax);
		setEditGold(investment / modalData.recordDetails.gold);
	}, [modalData.display]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const isUpdated = await editFormSubmit(e, recordId, setLoading);

		if (isUpdated) {
			modalData.closeModal(false);
			modalData.pageLoader((prev) => prev + 1);
		}
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
						value={editAmount || ''}
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
						value={editInvestment || ''}
					/>
				</div>

				<div className="form-group">
					<label>Tax (3%)</label>
					<input
						type="number"
						name="tax"
						readOnly
						placeholder="Eg: 4388.69"
						value={editTax || ''}
					/>
				</div>

				<div className="form-group">
					<label>Gold Buying Price (₹/gm)</label>
					<input
						type="number"
						step={0.01}
						name="buyingPrice"
						placeholder="Eg: 9.500"
						value={editGold || ''}
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
