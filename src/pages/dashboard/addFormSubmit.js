export default async function addFormSubmit(e, setLoading) {
	try {
		setLoading(true);

		const date = e.target.date.value;
		const investment = e.target.investment.value;
		const tax = e.target.tax.value;
		const totalAmount = e.target.totalAmount.value;
		const gold = e.target.gold.value;
	} catch (err) {
		console.log(err);
	}
}
