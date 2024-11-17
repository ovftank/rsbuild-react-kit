import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const Home = () => {
	const [count, setCount] = useState<number>(0);

	const handleIncrement = () => {
		setCount((prevCount) => prevCount + 1);
	};

	return (
		<>
			<Helmet>
				<title>Home | Vite React Kit</title>
			</Helmet>
			<div className='flex flex-col items-center justify-center gap-4 p-6'>
				<h1 className='text-3xl font-bold'>Home Page</h1>

				<div className='flex flex-col items-center gap-3'>
					<p className='text-xl'>Count: {count}</p>
					<button
						onClick={handleIncrement}
						className='rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600'
						aria-label='Increment count'
					>
						Click me
					</button>
				</div>
			</div>
		</>
	);
};

export default Home;
