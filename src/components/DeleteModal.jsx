import { useState } from 'react';
import deleteRecord from '../pages/dashboard/deleteSubmit.js';

function DeleteModal(modalData) {
	const recordId = modalData.recordId;
	const setReload = modalData.pageLoader;
	const delModal = modalData.deleteModal;
	const [loading, setLoading] = useState(false);

	return (
		<div
			className="modal-backdrop"
			style={{ display: modalData.display ? 'flex' : 'none' }}>
			<div className="modal delete-modal">
				<h3>Delete Investment</h3>

				<p className="delete-text">
					Are you sure you want to delete this investment?
					<br />
					This action cannot be undone.
				</p>

				<div className="modal-actions">
					<button
						className="btn-secondary"
						type="button"
						onClick={() => modalData.closeModal(false)}>
						Cancel
					</button>
					<button
						disabled={loading}
						className="btn-danger"
						type="button"
						onClick={() =>
							deleteRecord(recordId, setLoading, setReload, delModal)
						}>
						{loading ? (
							<>
								<span className="spinner"></span> Deleting...
							</>
						) : (
							'Delete '
						)}
					</button>
				</div>
			</div>
		</div>
	);
}

export default DeleteModal;
