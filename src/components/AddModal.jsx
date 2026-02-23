function AddModal(modalData) {
	return (
		<div
			className="modal-backdrop"
			id="addDataModal"
			style={{ display: modalData.display ? 'flex' : 'none' }}>
			<form className="modal" id="modalForm">
				<h3>Add Gold Investment</h3>

				<div className="form-group">
					<label>Date</label>
					<input type="date" />
				</div>

				<div className="form-group">
					<label>Gold Invest Amount (₹)</label>
					<input type="number" placeholder="Eg: 150000" />
				</div>

				<div className="form-group">
					<label>Tax (3%)</label>
					<input type="number" placeholder="Auto / Manual" />
				</div>

				<div className="form-group">
					<label>Total Price Paid (₹)</label>
					<input type="number" />
				</div>

				<div className="form-group">
					<label>Total Gold Got (gm)</label>
					<input type="number" step="0.01" />
				</div>

				<div className="modal-actions">
					<button
						className="btn-secondary"
						type="button"
						style={{border:'none'}}
						onClick={modalData.closeModal}>
						Close
					</button>
					<button className="btn-primary">Save</button>
				</div>
			</form>
		</div>
	);
}

export default AddModal;
