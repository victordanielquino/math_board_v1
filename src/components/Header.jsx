import React, { useEffect, useContext, useState } from 'react';

// estilos:
import '../styles/Header.scss';

// containers:
import Menu1 from '../containers/Menu1';
import Menu2 from '../containers/Menu2';
import MenuMover from '../containers/MenuMover';
import MenuLapiz from '../containers/MenuLapiz';
import MenuBorrador from '../containers/MenuBorrador';
import MenuCuadrado from '../containers/MenuCuadrado';

// context:
import AppContext from '../context/AppContext';

// iconos:

const Header = () => {
	// useContext:
	const { state } = useContext(AppContext);

	// useState:
	const [toggleMenu1, setToggleMenu1] = useState(false);
	const [toggleMenu2, setToggleMenu2] = useState(false);
	const [toggleMenuMover, setToggleMenuMover] = useState(false);
	const [toggleMenuLapiz, setToggleMenuLapiz] = useState(false);
	const [toggleMenuBorrador, setToggleMenuBorrador] = useState(false);
	const [toggleMenuCuadrado, setToggleMenuCuadrado] = useState(false);

	useEffect(() => {
		switch (state.active) {
			case 'moverIcon':
				setToggleMenu1(false);
				setToggleMenuMover(true);
				setToggleMenuLapiz(false);
				setToggleMenuBorrador(false);
				setToggleMenuCuadrado(false);
				break;
			case 'lapizIcon':
				setToggleMenu1(false);
				setToggleMenuMover(false);
				setToggleMenuLapiz(true);
				setToggleMenuBorrador(false);
				setToggleMenuCuadrado(false);
				break;
			case 'borradorIcon':
				setToggleMenu1(false);
				setToggleMenuMover(false);
				setToggleMenuLapiz(false);
				setToggleMenuBorrador(true);
				setToggleMenuCuadrado(false);
				break;
			case 'cuadradoIcon':
				setToggleMenu1(false);
				setToggleMenuMover(false);
				setToggleMenuLapiz(false);
				setToggleMenuBorrador(false);
				setToggleMenuCuadrado(true);
				break;
			default:
				setToggleMenu1(true);
				setToggleMenuMover(false);
				setToggleMenuLapiz(false);
				setToggleMenuBorrador(false);
				setToggleMenuCuadrado(false);
				break;
		}
	}, [state]);
	return (
		<nav className="header__nav">
			<div className="navbar-left">
				<ul>
					<li>
						<a href="/">MathBoard</a>
					</li>
				</ul>
			</div>
			<div className="navbar-central">
				{toggleMenu1 && <Menu1 />}
				{toggleMenu2 && <Menu2 />}
				{toggleMenuMover && <MenuMover />}
				{toggleMenuLapiz && <MenuLapiz />}
				{toggleMenuBorrador && <MenuBorrador />}
				{toggleMenuCuadrado && <MenuCuadrado />}
			</div>
			<div className="navbar-right">
				<ul>
					<li className="navbar-email">UMSA / INFORMÁTICA</li>
				</ul>
			</div>
		</nav>
	);
};

export default Header;
