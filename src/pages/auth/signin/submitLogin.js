import Api from '../../../api/Api.js';
import configaruration from '../../../config/config.js';
import showToast from '../../../utils/showToast.js';

const api = new Api();

const handleFormLogin = async (e, setLoading) => {
	try {
		e.preventDefault();
		setLoading(true);

		const form = e.target;
		const email = form.email.value;
		const password = form.password.value;
		const url = `${configaruration.BASE_URL}/user/auth/signin`;

		const response = await api.postApi(url, null, { email, password });
		const result = await response.json();

		if (result.success) {
			localStorage.setItem('T79_access_token', result.access_token);
			localStorage.setItem('T79_refresh_token', result.refresh_token);

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

export default handleFormLogin;
