import { NavLink, Outlet } from "react-router";

const Layout = () => {
	return (
		<div className="min-h-screen bg-white">
			<header className="border-b border-gray-200 py-4">
				<nav className="container mx-auto px-4">
					<div className="flex gap-4">
						<NavLink
							to="/"
							end
							className={({ isActive }) =>
								`transition-colors ${isActive ? "text-black font-medium" : "text-gray-500 hover:text-gray-900"}`
							}
						>
							Home
						</NavLink>
						<NavLink
							to="/about"
							className={({ isActive }) =>
								`transition-colors ${isActive ? "text-black font-medium" : "text-gray-500 hover:text-gray-900"}`
							}
						>
							About
						</NavLink>
						<NavLink
							to="/contact"
							className={({ isActive }) =>
								`transition-colors ${isActive ? "text-black font-medium" : "text-gray-500 hover:text-gray-900"}`
							}
						>
							Contact
						</NavLink>
					</div>
				</nav>
			</header>
			<main className="container mx-auto px-4 py-8">
				<Outlet />
			</main>
		</div>
	);
};

export default Layout;
