import Lorem from '@/pages/lorem';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
const Home = lazy(() => import('@/pages/home'));
const About = lazy(() => import('@/pages/about'));
const NotFound = lazy(() => import('@/pages/not-found'));
const RootLayout = lazy(() => import('../layouts/root-layout'));

const LoadingSpinner = () => (
	<div className='flex min-h-screen items-center justify-center'>
		<div className='h-8 w-8 animate-spin rounded-full border-2 border-gray-900 border-l-transparent border-r-transparent' />
	</div>
);

const router = createBrowserRouter(
	[
		{
			path: '/',
			element: (
				<Suspense fallback={<LoadingSpinner />}>
					<RootLayout />
				</Suspense>
			),
			errorElement: (
				<Suspense fallback={<LoadingSpinner />}>
					<NotFound />
				</Suspense>
			),
			children: [
				{
					index: true,
					element: (
						<Suspense fallback={<LoadingSpinner />}>
							<Home />
						</Suspense>
					),
				},
				{
					path: 'about',
					element: (
						<Suspense fallback={<LoadingSpinner />}>
							<About />
						</Suspense>
					),
				},
				{
					path: 'lorem',
					element: (
						<Suspense fallback={<LoadingSpinner />}>
							<Lorem />
						</Suspense>
					),
				},
			],
		},
	],
	{
		future: {
			v7_skipActionErrorRevalidation: true,
			v7_relativeSplatPath: true,
			v7_fetcherPersist: true,
			v7_normalizeFormMethod: true,
			v7_partialHydration: true,
		},
	},
);

const AppRouter = () => {
	return <RouterProvider router={router} />;
};

export default AppRouter;
