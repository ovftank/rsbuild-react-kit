import {
	faFileAlt,
	faHome,
	faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

const Header = () => {
	return (
		<header className='bg-white shadow'>
			<nav className='container mx-auto px-4 py-4'>
				<ul className='flex gap-4'>
					<li>
						<NavLink
							to='/'
							className={({ isActive }) =>
								`hover:text-blue-600 ${isActive ? 'text-blue-600' : 'text-gray-600'} flex items-center gap-2`
							}
						>
							<FontAwesomeIcon icon={faHome} />
							<span>Home</span>
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/about'
							className={({ isActive }) =>
								`hover:text-blue-600 ${isActive ? 'text-blue-600' : 'text-gray-600'} flex items-center gap-2`
							}
						>
							<FontAwesomeIcon icon={faInfoCircle} />
							<span>About</span>
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/lorem'
							className={({ isActive }) =>
								`hover:text-blue-600 ${isActive ? 'text-blue-600' : 'text-gray-600'} flex items-center gap-2`
							}
						>
							<FontAwesomeIcon icon={faFileAlt} />
							<span>Lorem</span>
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
