import { useEffect, useContext } from 'react';

// CONTEXT:
import AppContextCanvas from '../context/AppContextCanvas';
import AppContextLapiz from '../context/AppContextLapiz';

// utils:
import { utilsCuadricula_graficaCuadricula } from '../utils/UtilsCuadricula';
import { utilsLapiz_graficaLapizHistoria } from '../utils/UtilsLapiz';

const PaintCuadricula = (canvasId) => {
	// useContext:
	const { stateCanvas } = useContext(AppContextCanvas);
	const { stateLapiz } = useContext(AppContextLapiz);

	// LOGICA:
	let context = '';
	// LOGICA END.

	// useEffect:
	useEffect(() => {
		context = document.getElementById(canvasId).getContext('2d');
		utilsCuadricula_graficaCuadricula(context, stateCanvas);
		utilsLapiz_graficaLapizHistoria(stateLapiz.historiaLapiz, context);
	}, [
		stateCanvas.width,
		stateCanvas.height,
		stateCanvas.tipoCuadricula,
		stateCanvas.cuadriculaWidth,
	]);
};
//const saludar = () => console.log('hola daniel');

export default PaintCuadricula;
