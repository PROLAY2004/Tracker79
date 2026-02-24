import formatDate from '../utils/dateFormater.js';

function List(listDetails) {
	return (
		<div className="table-row">
			<span>{formatDate(listDetails.record.date)}</span>
			<span>{`₹` + listDetails.record.investment.toFixed(2)}</span>
			<span>{`₹` + listDetails.record.tax.toFixed(2)}</span>
			<span>{`₹` + listDetails.record.total.toFixed(2)}</span>
			<span>{listDetails.record.gold + ' gm'}</span>

			<div className="action-btns">
				<button
					className="action-btn edit-btn"
					onClick={() => {
						listDetails.setRecordDetails(listDetails.record);
						listDetails.editModal(true);
					}}>
					<i className="fa fa-edit"></i> Edit
				</button>

				<button
					className="action-btn delete-btn"
					onClick={() => {
						listDetails.deleteModal(true);
						listDetails.setRecordId(listDetails.record._id);
					}}>
					<i className="fa fa-trash-o"></i> Delete
				</button>
			</div>
		</div>
	);
}

export default List;
