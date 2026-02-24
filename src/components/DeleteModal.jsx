import { useState } from 'react';

function DeleteModal(modalData) {
	const [loading, setLoading] = useState(false);

    const deleteRecord = () => {
        console.log('delete record id : ', modalData.recordId);
    }

	return (
		<div className="modal-backdrop" style={{display : modalData.display ? 'flex' : 'none'}}>
			<div className="modal delete-modal">
				<h3>Delete investment</h3>

				<p className="delete-text">
					Are you sure you want to delete this investment?
					<br />
					This action cannot be undone.
				</p>

				<div className="modal-actions">
					<button className="btn-secondary" type="button" onClick={() => modalData.closeModal(false)}>
						Cancel
					</button>
					<button disabled={loading} className="btn-danger" type="button" onClick={deleteRecord}>
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
