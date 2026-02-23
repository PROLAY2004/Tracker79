import apiInterceptor from '../../api/interceptor.js';
import showToast from '../../utils/showToast.js';

export default async function addFormSubmit(
	e,
	setLoading,
	setTotalAmount,
	setInvestment,
	setTax,
) {
	try {
		setLoading(true);

		const response = await apiInterceptor('POST', '/user/account/dashboard', {
			date: e.target.date.value,
			investment: e.target.investment.value,
			tax: e.target.tax.value,
			total: e.target.totalAmount.value,
			gold: e.target.gold.value,
		});

		const result = await response.json();

		if (result.success) {
			e.target.reset();

			setTotalAmount('');
			setInvestment('');
			setTax('');
			showToast('success', result.message);

			return true;
		} else {
			showToast('error', result.message);
			return false;
		}
	} catch (err) {
		showToast('error', err.message);

		return false;
	} finally {
		setLoading(false);
	}
}
