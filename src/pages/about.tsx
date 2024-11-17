import { Helmet } from 'react-helmet-async';

const About = () => {
	return (
		<>
			<Helmet>
				<title>About | Vite React Kit</title>
			</Helmet>
			<div>
				<h1 className='text-3xl font-bold'>About Page</h1>
				<p>This is the about page.</p>
			</div>
		</>
	);
};

export default About;
