import { Helmet } from 'react-helmet-async';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';
const NotFound = () => {
	const error = useRouteError();

	return (
		<>
			<Helmet>
				<title>Not Found | Vite React Kit</title>
			</Helmet>
			<div className='flex min-h-screen items-center justify-center'>
				<div className='text-center'>
					<h1 className='mb-4 text-4xl font-bold'>
						{isRouteErrorResponse(error)
							? 'Page Not Found'
							: 'Oops! Something went wrong'}
					</h1>
					<Link to='/' className='text-blue-600 hover:text-blue-800'>
						Go back home
					</Link>
				</div>
			</div>
		</>
	);
};

export default NotFound;
