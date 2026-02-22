export default function isAuthenticated() {
	const accessToken = localStorage.getItem('T79_access_token');
	const refreshToken = localStorage.getItem('T79_refresh_token');

	if (accessToken && refreshToken) {
		return true;
	}

	return false;
}
