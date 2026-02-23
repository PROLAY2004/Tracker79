function Card(cardDetails) {
	return (
		<div className="analytics-card">
			<p>{cardDetails.title}</p>
			<h2 className={cardDetails.color ? cardDetails.color : ''}>
				{cardDetails.value}
			</h2>
		</div>
	);
}

export default Card;
