import React, { useState, useEffect, useContext } from 'react';

// context:
import AppContextLapiz from '../context/AppContextLapiz';

// styles:
import '../styles/Canvas.scss';

// components:
import PaintMover from './PaintMover';
import PainLapiz from '../components/PaintLapiz';
import PaintBorrador from './PaintBorrador';
import PaintCuadrado from './PaintCuadrado';

const Canvas = () => {
	// useContext:

	// useState:
	const [canvasWidth, setCanvasWidth] = useState(window.innerWidth - 75);
	const [canvasHeight, setCanvasHeight] = useState(window.innerHeight - 90);

	// LOGICA:
	PaintMover('canvas-1', canvasWidth, canvasHeight);
	PainLapiz('canvas-1');
	PaintBorrador('canvas-1');
	PaintCuadrado('canvas-1');

	const canvasDatos = {
		top: 0,
		left: 0,
		width: 0,
		height: 0,
	};
	const fondo = {
		bordeEstado: true,
		bordeGrosor: 2,
		bordeColor: 'black',
		fondoEstado: true,
		fondoColor: 'white',
		x_ini: 0,
		x_fin: canvasWidth,
		y_ini: 0,
		y_fin: canvasHeight,
	};
	const graficaCuadricula = () => {
		const context = document.getElementById('canvas-1').getContext('2d');
		context.beginPath();

		context.strokeStyle = 'black'; // bordeColor
		context.fillStyle = 'white'; // fondoColor
		context.lineWidth = 1; // bordeGrosor

		context.moveTo(0, 0); // (x_ini, y_ini)
		context.lineTo(canvasWidth, 0); // (x_fin, y_ini)
		context.lineTo(canvasWidth, canvasHeight); // (x_fin, y_fin)
		context.lineTo(0, canvasHeight); // (x_ini, y_fin)
		context.lineTo(0, 0); // (x_ini, y_ini)

		context.fill(); // fondoColor = true
		context.stroke(); // bordeColor = true
		context.closePath();
	};
	// LOGICA END.

	// useEfect:
	useEffect(() => {
		// redimencionamos el canvas la primera vez:
		const handleWidth = () => setCanvasWidth(window.innerWidth - 75);
		window.addEventListener('resize', handleWidth);
		const handleHeight = () => setCanvasHeight(window.innerHeight - 90);
		window.addEventListener('resize', handleHeight);

		return () => {
			window.removeEventListener('resize', handleWidth);
			window.removeEventListener('resize', handleHeight);
		};
	}, []);
	useEffect(() => {
		// grafica cuadricula:
		graficaCuadricula();
	}, [canvasWidth, canvasHeight]);

	return (
		<canvas
			className="canvas"
			width={canvasWidth}
			height={canvasHeight}
			id="canvas-1"
		></canvas>
	);
};

export default Canvas;
