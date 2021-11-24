import React, { useEffect, useContext } from 'react';

// context
import AppContextText from '../context/AppContextText';

// styles:
import '../styles/MenuText.scss';
import textUpIcon from '../assets/icons/text-up.svg';
import textDownIcon from '../assets/icons/text-down.svg';
import textIcon from '../assets/icons/text-font.svg';

const MenuText = () => {
	const { stateText, updateTextColor } = useContext(AppContextText);

	// LOGICA:
	const arrayColorLinea = [
		{ colorLine: 'black', id: 'colorBlack' },
		{ colorLine: 'red', id: 'colorRed' },
		{ colorLine: 'green', id: 'colorGreen' },
		{ colorLine: 'blue', id: 'colorBlue' },
		{ colorLine: 'yellow', id: 'colorYellow' },
	];

	const updatePaletaColor = (color) => {
		console.log('hola', color);
		const array = document.querySelectorAll('.activeColorLinea');
		for (let i = 0; i < array.length; i++) {
			array[i].classList.remove('activeColorLinea');
		}
		let elem = arrayColorLinea.find((elem) => elem.colorLine == color);
		document.getElementById(elem.id).classList.add('activeColorLinea');
	};

	const handleLineColor = (color) => {
		updatePaletaColor(color);
		updateTextColor(color); // CONTEXT
	};
	// POPUP:

	const handleText = () => {
		console.log('press text');
		document.getElementById('overlay').classList.add('active');
		document.getElementById('popup').classList.add('active');
	};
	const handleClosedPopup = () => {
		overlay.classList.remove('active');
		popup.classList.remove('active');
	};

	useEffect(() => {
		// se ejecuta solo la 1ra vez que se carga el componente.
		updatePaletaColor(stateText.color);
	});

	return (
		<article className="article__menuText">
			<div className="article__menuText__tamano">
				<span htmlFor="">TAMAÑO: </span>
				<input type="text" defaultValue="11" disabled />
				<img src={textUpIcon}></img>
				<img src={textDownIcon}></img>
			</div>
			<div className="article__menuText__btnTexto">
				<img src={textIcon} onClick={() => handleText()}></img>
			</div>
			<div className="article__menuText__paletaColor">
				<div>
					<span>COLOR: </span>
				</div>
				<div className="article__menuText__paletaColor__container">
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
			<div className="overlay " id="overlay">
				<div className="popup " id="popup">
					<a
						href="#"
						id="btn-cerrar-popup"
						onClick={() => handleClosedPopup()}
						className="btn-cerrar-popup"
					>
						x
					</a>
					<h3>TEXTO</h3>
					<form action="">
						<div className="contenedor-inputs">
							<input type="text" placeholder="in texto" />
							<input type="text" placeholder="in texto" />
						</div>
						<input type="submit" className="btn-submit" value="Suscribirse" />
					</form>
				</div>
			</div>
		</article>
	);
};

export default MenuText;
