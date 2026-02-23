const investmentCalculator = (e, setTotalAmount, setInvestment, setTax) => {
	const total = Number(e.target.value);

	setTotalAmount(total);

	if (!total || total <= 0) {
		setTotalAmount('');
		setInvestment('');
		setTax('');
		return;
	}

	const calculatedTax = total * 0.029257895756636;
	const calculatedInvestment = +(total - calculatedTax);

	setTax(+calculatedTax.toFixed(2));
	setInvestment(+calculatedInvestment.toFixed(2));
};

const taxCalculator = (e, setInvestment, setTax, totalAmount) => {
	const invest = Number(e.target.value);

	setInvestment(invest);

	if (!invest || invest <= 0) {
		setTax('');
		setInvestment('');
		return;
	}

	const calculatedTax = +totalAmount - invest;
	setTax(+calculatedTax.toFixed(2));
};
export { investmentCalculator, taxCalculator };
