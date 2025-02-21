import "@/assets/style/styles.css";
import Layout from "@/components/layout";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import { Route, Routes } from "react-router";

const App = () => {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="about" element={<About />} />
				<Route path="contact" element={<Contact />} />
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	);
};

export default App;
