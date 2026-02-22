import Api from '../../../api/Api.js';
import configaruration from '../../../config/config.js';
import showToast from '../../../utils/showToast.js';

const api = new Api();

const handleSubmit = async (e, setLoading) => {
	try {
		e.preventDefault();
		setLoading(true);

		const form = e.target;
		const name = form.name.value;
		const email = form.email.value;
		const password = form.password.value;
		const url = `${configaruration.BASE_URL}/user/auth/signup`;

		const response = await api.postApi(url, null, { name, email, password });
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
