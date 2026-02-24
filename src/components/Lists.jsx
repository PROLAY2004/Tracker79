function List(listDetails) {
	return (
		<div className="table-row">
			<span>{listDetails.date}</span>
			<span>{listDetails.investment}</span>
			<span>{listDetails.tax}</span>
			<span>{listDetails.amount}</span>
			<span>{listDetails.gold}</span>
			<div className="action-btns">
				<button className="action-btn view-btn">View</button>
				<button className="action-btn edit-btn">Edit</button>
				<button className="action-btn delete-btn">Delete</button>
			</div>
		</div>
	);
}

export default List;
