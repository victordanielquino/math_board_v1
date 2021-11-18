import React, { useEffect, useContext } from 'react';

// context
import AppContext from '../context/AppContext';

// styles:
import '../styles/PaletaColor.scss';

const PaletaColor = () => {
	// useContext:
	const { state, updateColor } = useContext(AppContext);

	// LOGICA:
	const arrayColorLinea = [
		{ colorLine: 'black', id: 'colorBlack' },
		{ colorLine: 'red', id: 'colorRed' },
		{ colorLine: 'green', id: 'colorGreen' },
		{ colorLine: 'blue', id: 'colorBlue' },
		{ colorLine: 'yellow', id: 'colorYellow' },
	];
	const updatePaletaColor = (color) => {
		const array = document.querySelectorAll('.activeColorLinea');
		for (let i = 0; i < array.length; i++) {
			array[i].classList.remove('activeColorLinea');
		}
		let elem = arrayColorLinea.find((elem) => elem.colorLine == color);
		document.getElementById(elem.id).classList.add('activeColorLinea');
	};
	const handleLineColor = (color) => {
		updatePaletaColor(color);
		updateColor(color); // CONTEXT
	};
	// LOGICA END.

	// useEffect:
	useEffect(() => {
		// se ejecuta solo la 1ra vez que se carga el componente.
		updatePaletaColor(state.color);
	}, []);

	return (
		<div className="article__menuLapiz__paletaColor">
			<div>
				<span>COLOR: </span>
			</div>
			<div className="article__menuLapiz__paletaColor__container">
				{arrayColorLinea.map((elem) => (
					<div
						className={`color activeColorLinea ${elem.colorLine}`}
						id={elem.id}
						onClick={() => handleColor('colorNegro')}
						key={elem.id}
						onClick={() => handleLineColor(elem.colorLine)}
					></div>
				))}
			</div>
		</div>
	);
};

export default PaletaColor;
