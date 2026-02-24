import apiInterceptor from '../../api/interceptor.js';
import showToast from '../../utils/showToast.js';

export default async function displayData(
	setTotal,
	setInvest,
	setGoldQtn,
	setTax,
	setRecords,
	setLoading,
	page = 1, // Add page parameter
	setTotalPages, // Add setter for total pages
) {
	try {
		setLoading(true);

		const response = await apiInterceptor(
			'POST',
			'/user/account/dashboard/get-data',
			{ page }, // Pass the page here
		);

		const result = await response.json();

		if (result.success) {
			setTotal(result.data.totalInvestment);
			setInvest(result.data.investment);
			setGoldQtn(result.data.totalGold);
			setRecords(result.data.records);
			setTax(result.data.totalTax);

			if (setTotalPages) setTotalPages(result.data.totalPages); // Update UI

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

