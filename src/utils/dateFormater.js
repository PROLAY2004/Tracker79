const formatDate = (dateStr) => {
	const date = new Date(dateStr);

	return date.toLocaleDateString('en-GB', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
	});
};

const getCurrentDate = () => {
	const date = new Date();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	const year = date.getFullYear();

	if (month < 10) month = `0${month}`;
	if (day < 10) day = `0${day}`;

	const today = `${year}-${month}-${day}`;
	return today;
};

export { formatDate, getCurrentDate };
