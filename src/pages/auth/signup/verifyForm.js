import Api from '../../../api/Api.js';
import configaruration from '../../../config/config.js';
import showToast from '../../../utils/showToast.js';

const api = new Api();

const handleVerify = async (e, email, setLoading) => {
	try {
		e.preventDefault();
		setLoading(true);

		const form = e.target;
		const otp = form.otp.value;
		const url = `${configaruration.BASE_URL}/user/auth/signup`;

		if (otp.length !== 6) {
			showToast('error', 'OTP must be 6 digits');
			return false;
		}

		const response = await api.patchApi(url, null, { userOtp: otp, email });
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

export default handleVerify;
