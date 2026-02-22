import Api from '../../../api/Api.js';
import configaruration from '../../../config/config.js';
import showToast from '../../../utils/showToast.js';

const api = new Api();

const handleSubmit = async (e, setLoading) => {
	try {
		e.preventDefault();
		setLoading(true);

		const form = e.target;
		const email = form.email.value;

		const url = `${configaruration.BASE_URL}/user/auth/forgot-password`;

		const response = await api.postApi(url, null, { email });
		const result = await response.json();

		if (result.success) {
			showToast('success', result.message);
			return true;
		} else {
			showToast('error', result.message);
			return false;
		}
	} catch (error) {
		showToast('error', error.message);
		return false;
	} finally {
		setLoading(false);
	}
};

export default handleSubmit;
