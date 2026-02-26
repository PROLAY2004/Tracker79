import { useState, useEffect } from 'react';
import addFormSubmit from '../pages/dashboard/addFormSubmit.js';
import { getCurrentDate } from '../utils/dateFormater.js';
import {
	investmentCalculator,
	taxCalculator,
} from '../pages/dashboard/formCalculate.js';

function AddModal(modalData) {
	const [loading, setLoading] = useState(false);
	const [totalAmount, setTotalAmount] = useState('');
	const [investment, setInvestment] = useState('');
	const [date, setDate] = useState('');
	const [tax, setTax] = useState('');

	useEffect(() => {
		setDate(getCurrentDate());
	}, [modalData.display]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const isSubmited = await addFormSubmit(
			e,
			setLoading,
			setTotalAmount,
			setInvestment,
			setTax,
		);

		if (isSubmited) {
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
				<h3>Add Gold Investment</h3>

				<div className="form-group">
					<label>Date</label>
					<input
						type="date"
						name="date"
						value={date}
						onChange={(e) => setDate(e.target.value)}
					/>
				</div>

				<div className="form-group">
					<label>Total Amount Paid (₹)</label>
					<input
						type="number"
						name="totalAmount"
						value={totalAmount}
						onChange={(e) =>
							investmentCalculator(e, setTotalAmount, setInvestment, setTax)
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
							taxCalculator(e, setInvestment, setTax, totalAmount)
						}
						placeholder="Eg: 145611.31"
						value={investment}
					/>
				</div>

				<div className="form-group">
					<label>Tax (3%)</label>
					<input
						type="number"
						name="tax"
						readOnly
						placeholder="Eg: 4388.69"
						value={tax}
					/>
				</div>

				<div className="form-group">
					<label>Gold Buying Price (₹/gm)</label>
					<input
						type="number"
						step={0.01}
						name="buyingPrice"
						placeholder="Eg: 9500"
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
								<span className="spinner"></span> Saving...
							</>
						) : (
							'Save '
						)}
					</button>
				</div>
			</form>
		</div>
	);
}

export default AddModal;
