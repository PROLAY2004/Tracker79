function List(listDetails) {
	return (
		<div className="table-row">
			<span>{listDetails.date}</span>
			<span>{listDetails.amount}</span>
			<span>{listDetails.gold}</span>
			<span
				className={
					listDetails.returnPercentage.includes('-') ? 'negative' : 'positive'
				}>
				{listDetails.returnPercentage}
			</span>
			<span
				className={
					listDetails.returnPercentageNoTax.includes('-')
						? 'negative'
						: 'positive'
				}>
				{listDetails.returnPercentageNoTax}
			</span>
			<div className="action-btns">
				<button className="action-btn view-btn">View</button>
				<button className="action-btn edit-btn">Edit</button>
				<button className="action-btn delete-btn">Delete</button>
			</div>
		</div>
	);
}

export default List;
