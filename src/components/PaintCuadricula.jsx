import { useEffect, useContext } from 'react';

// CONTEXT:
import AppContextCanvas from '../context/AppContextCanvas';
import AppContextCuadrado from '../context/AppContextCuadrado';
import AppContextLinea from '../context/AppContextLinea';
import AppContextLapiz from '../context/AppContextLapiz';

// utils:
import { utilsCuadricula_graficaCuadricula } from '../utils/UtilsCuadricula';
import { utilsCuadrado_graficaCuadradoHistoria } from '../utils/UtilsCuadrado';
import { utilsLinea_graficaLineaHistoria } from '../utils/UtilsLinea';
import { utilsLapiz_graficaLapizHistoria } from '../utils/UtilsLapiz';

const PaintCuadricula = (canvasId) => {
	// useContext:
	const { stateCanvas } = useContext(AppContextCanvas);
	const { stateCuadrado } = useContext(AppContextCuadrado);
	const { stateLinea } = useContext(AppContextLinea);
	const { stateLapiz } = useContext(AppContextLapiz);

	// LOGICA:
	let context = '';
	const paint = () => {
		utilsCuadricula_graficaCuadricula(context, stateCanvas);
		utilsCuadrado_graficaCuadradoHistoria(
			context,
			stateCuadrado.historiaCuadrado
		);
		utilsLinea_graficaLineaHistoria(context, stateLinea.historiaLinea);
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
