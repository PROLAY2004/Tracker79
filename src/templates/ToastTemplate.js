export default class ToastTemplate {
	successToast = (message) => {
		return `
        	<div class="toast toast-success">
				<div class="toast-logo success-logo">
					<i class="fa fa-check"></i>
				</div>
				<div class="toast-text">${message}</div>
			</div>`;
	};

	errorToast = (message) => {
		return `
            <div class="toast toast-error">
				<div class="toast-logo error-logo">
					<i class="fa fa-times"></i>
				</div>
				<div class="toast-text">${message}</div>
			</div>`;
	};
}
