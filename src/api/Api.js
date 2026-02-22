export default class Api {
	postApi = async (url, token, reqBody = {}) => {
		try {
			const res = await fetch(url, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(reqBody),
			});

			return res;
		} catch (err) {
			throw new Error(err);
		}
	};

	patchApi = async (url, token, reqBody = {}) => {
		try {
			const res = await fetch(url, {
				method: 'PATCH',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(reqBody),
			});

			return res;
		} catch (err) {
			throw new Error(err);
		}
	};
}
