import React from 'react';
import Header from '../components/Header';
import NavIzq from '../components/NavIzq';

const Layout = ({ children }) => {
	return (
		<div className="Layout">
			<Header />
			<NavIzq />
			{children}
		</div>
	);
};

export default Layout;
