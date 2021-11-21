import React, { useEffect, useContext } from 'react';

// context
import AppContextCanvas from '../context/AppContextCanvas';

// styles:
import '../styles/MenuCuadricula.scss';
import iconCuadricula from '../assets/icons/cuadricula.svg';
import iconCuadriculaSin from '../assets/icons/cuadriculaSin.svg';
import iconLineaNone from '../assets/icons/lineaNone.svg';

const MenuCuadricula = () => {
	// useContext:
	const { stateCanvas, updateTipoCuadricula, updateCuadriculaWidth } =
		useContext(AppContextCanvas);

	// LOGICA:
	const handleRadioCuadricula = (e) => {
		switch (e.target.value) {
			case 'cuadricula':
				updateTipoCuadricula(e.target.value);
				break;
			case 'linea':
				updateTipoCuadricula(e.target.value);
				break;
			case 'sinCuadricula':
				updateTipoCuadricula(e.target.value);
				break;
			default:
				break;
		}
	};
	const handleBtnAncho = (op) => {
		op == '-' && stateCanvas.cuadriculaWidth > 10
			? updateCuadriculaWidth(stateCanvas.cuadriculaWidth - 10)
			: '';
		op == '+' ? updateCuadriculaWidth(stateCanvas.cuadriculaWidth + 10) : '';
	};
	// LOGICA END.

	// useEffect
	useEffect(() => {}, []);

	return (
		<article className="article__menuCuadricula">
			<div className="article__menuCuadricula__paletaTipo">
				<div>
					<span>Tipo: </span>
				</div>
				<div className="inputRadio">
					<input
						type="radio"
						value="cuadricula"
						name="radioCuadricula"
						defaultChecked={stateCanvas.tipoCuadricula == 'cuadricula'}
						onChange={handleRadioCuadricula}
					/>
				</div>
				<img className="svgIcon" src={iconCuadricula}></img>
				<div className="inputRadio">
					<input
						type="radio"
						value="linea"
						name="radioCuadricula"
						defaultChecked={stateCanvas.tipoCuadricula == 'linea'}
						onChange={handleRadioCuadricula}
					/>
				</div>
				<img className="svgIcon" src={iconCuadriculaSin}></img>
				<div className="inputRadio">
					<input
						type="radio"
						value="sinCuadricula"
						name="radioCuadricula"
						defaultChecked={stateCanvas.tipoCuadricula == 'ninguno'}
						onChange={handleRadioCuadricula}
					/>
				</div>
				<img className="svgIcon" src={iconLineaNone}></img>
			</div>
			<div className="article__menuCuadricula__paletaAncho">
				<div>
					<span>Ancho: </span>
				</div>
				<div className="inputButton">
					<input
						type="button"
						value="+"
						// defaultChecked={stateCuadrado.fondoEstado}
						onClick={() => handleBtnAncho('+')}
					/>
				</div>
				<div className="inputButton">
					<input
						type="button"
						value="-"
						// defaultChecked={stateCuadrado.fondoEstado}
						onClick={() => handleBtnAncho('-')}
					/>
				</div>
			</div>
		</article>
	);
};

export default MenuCuadricula;
