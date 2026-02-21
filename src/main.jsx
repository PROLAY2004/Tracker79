import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import router from './routes/Router.jsx';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<div className="toast-container">
			<div className="toast toast-success">
				<div className="toast-logo">
					<i className="fa fa-check"></i>
				</div>
				<div className="toast-text">OTP sent to email.</div>
			</div>
		</div>
		<RouterProvider router={router} />
	</StrictMode>,
);
