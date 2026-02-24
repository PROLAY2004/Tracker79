import apiInterceptor from '../../api/interceptor.js';
import showToast from '../../utils/showToast.js';

export default async function deleteRecord(
	recordId,
	setLoading,
	setReload,
	delModal,
) {
	try {
		setLoading(true);

		const response = await apiInterceptor('DELETE', '/user/account/dashboard', {
			recordId,
		});

		const result = await response.json();

		if (result.success) {
			delModal(false);
			setReload((prev) => prev + 1);
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
