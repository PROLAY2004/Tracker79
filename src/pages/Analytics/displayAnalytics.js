import showToast from '../../utils/showToast.js';
import apiInterceptor from '../../api/interceptor.js';

const fetchAnalytics = async (
	filterType,
	page,
	sellingPrice,
	setLoading,
	setStats,
) => {
	try {
		setLoading(true);

		const response = await apiInterceptor('POST', '/user/account/stats', {
			filterType,
			page,
			limit: 5,
			sellPrice: sellingPrice,
		});

		const result = await response.json();
		if (result.success) {
			setStats(result.data);
		} else {
			showToast('error', result.message);
		}
	} catch (error) {
		showToast('error', error.message);
	} finally {
		setLoading(false);
	}
};

export default fetchAnalytics;
