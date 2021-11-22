import { useEffect, useContext } from 'react';

// CONTEXT:
import AppContextCanvas from '../context/AppContextCanvas';
import AppContextLapiz from '../context/AppContextLapiz';
import AppContextCuadrado from '../context/AppContextCuadrado';

// utils:
import { utilsCuadricula_graficaCuadricula } from '../utils/UtilsCuadricula';
import { utilsLapiz_graficaLapizHistoria } from '../utils/UtilsLapiz';
import { utilsCuadrado_graficaCuadradoHistoria } from '../utils/UtilsCuadrado';

const PaintCuadricula = (canvasId) => {
	// useContext:
	const { stateCanvas } = useContext(AppContextCanvas);
	const { stateLapiz } = useContext(AppContextLapiz);
	const { stateCuadrado } = useContext(AppContextCuadrado);

	// LOGICA:
	let context = '';
	const paint = () => {
		utilsCuadricula_graficaCuadricula(context, stateCanvas);
		utilsCuadrado_graficaCuadradoHistoria(
			context,
			stateCuadrado.historiaCuadrado
		);
		utilsLapiz_graficaLapizHistoria(context, stateLapiz.historiaLapiz);
	};
	// LOGICA END.

	// useEffect:
	useEffect(() => {
		context = document.getElementById(canvasId).getContext('2d');
		paint();
	}, [
		stateCanvas.width,
		stateCanvas.height,
		stateCanvas.tipoCuadricula,
		stateCanvas.cuadriculaWidth,
	]);
};
//const saludar = () => console.log('hola daniel');

export default PaintCuadricula;
