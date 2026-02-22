import ToastTemplate from '../templates/ToastTemplate';

const displayToast = new ToastTemplate();

export default function showToast(type, message) {
	const toastContainer = document.querySelector('.toast-container');

	if (type === 'success') {
		toastContainer.innerHTML = displayToast.successToast(message);
	} else if (type === 'error') {
		toastContainer.innerHTML = displayToast.errorToast(message);
	}

	setTimeout(() => {
		toastContainer.innerHTML = '';
	}, 3000);
}
