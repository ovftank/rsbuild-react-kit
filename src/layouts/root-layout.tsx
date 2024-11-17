import Header from '@/components/header';
import ScrollToTop from '@/components/scroll-to-top';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
	return (
		<div className='min-h-screen'>
			<Header />
			<main className='container mx-auto px-4 py-8'>
				<Outlet />
			</main>
			<ScrollToTop />
		</div>
	);
};

export default RootLayout;
