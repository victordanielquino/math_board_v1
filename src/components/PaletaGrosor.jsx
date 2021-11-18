import React, { useEffect, useContext } from 'react';

// context
import AppContext from '../context/AppContext';

// styles:
import '../styles/PaletaGrosor.scss';
import iconLineaS from '../assets/icons/lineaS.svg';
import iconLineaM from '../assets/icons/lineaM.svg';
import iconLineaL from '../assets/icons/lineaL.svg';
import iconLineaXL from '../assets/icons/lineaXL.svg';
import iconLineaXXL from '../assets/icons/lineaXXL.svg';

const PaletaGrosor = () => {
	// useContext:
	const { state, updateGrosor } = useContext(AppContext);

	// LOGICA:
	const arrayIconLinea = [
		{ iconLine: iconLineaS, grosor: 1, id: 'iconLineaS' },
		{ iconLine: iconLineaM, grosor: 2, id: 'iconLineaM' },
		{ iconLine: iconLineaL, grosor: 4, id: 'iconLineaL' },
		{ iconLine: iconLineaXL, grosor: 6, id: 'iconLineaXL' },
		{ iconLine: iconLineaXXL, grosor: 10, id: 'iconLineaXXL' },
	];
	const updatePaletaGrosor = (grosor) => {
		const array = document.querySelectorAll('.activeIconLinea');
		for (let i = 0; i < array.length; i++) {
			array[i].classList.remove('activeIconLinea');
		}
		let elem = arrayIconLinea.find((elem) => elem.grosor == grosor);
		document.getElementById(elem.id).classList.add('activeIconLinea');
	};
	const handleLineaGrosor = (grosor) => {
		updatePaletaGrosor(grosor);
		updateGrosor(grosor); // CONTEXT
	};
	// LOGICA END.

	// useEffect:
	useEffect(() => {
		// se ejecuta solo la 1ra vez que se carga el componente.
		updatePaletaGrosor(state.grosor);
	}, []);

	return (
		<div className="article__menuLapiz__tamano">
			<span htmlFor="">TAMAÑO: </span>
			<div className="article__menuLapiz__tamano__icons">
				{arrayIconLinea.map((elem) => (
					<img
						className="article__menuLapiz__tamano__icons__icon "
						src={elem.iconLine}
						id={elem.id}
						key={`key-${elem.id}`}
						onClick={() => handleLineaGrosor(elem.grosor)}
					/>
				))}
			</div>
		</div>
	);
};

export default PaletaGrosor;
