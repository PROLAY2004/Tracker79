import showToast from './showToast.js';

export default function logout() {
	localStorage.clear();
	showToast('success', 'User logout successful.');

	return true;
}
