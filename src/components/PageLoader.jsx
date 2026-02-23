import '../styles/loader.scss';

function Loader(data) {
	return (
		<div
			className="app-loader"
			style={{ display: data.display ? 'flex' : 'none' }}>
			<div className="loader-card">
				<div className="spinner"></div>
				<p>Loading, please wait…</p>
			</div>
		</div>
	);
}

export default Loader;
