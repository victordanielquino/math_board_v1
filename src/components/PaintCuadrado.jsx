import React, { useContext, useEffect } from 'react';

// CONTEXT:
import AppContextCuadrado from '../context/AppContextCuadrado';
import AppContextCanvas from '../context/AppContextCanvas';
import AppContextLapiz from '../context/AppContextLapiz';

// utils:
import { utilsCuadricula_graficaCuadricula } from '../utils/UtilsCuadricula';
import { utilsLapiz_graficaLapizHistoria } from '../utils/UtilsLapiz';
import {
	utilsCuadrado_graficaCuadrado,
	utilsCuadrado_graficaCuadradoHistoria,
} from '../utils/UtilsCuadrado';

const PaintCuadrado = (id_canvas) => {
	// useContext:
	const { stateCuadrado, add_cuadrado_en_historia } =
		useContext(AppContextCuadrado);
	const { stateCanvas } = useContext(AppContextCanvas);
	const { stateLapiz } = useContext(AppContextLapiz);

	// LOGICA:
	let canvas = '';
	let context = '';
	const cuadrado = {
		id: 0,
		bordeEstado: stateCuadrado.bordeEstado,
		bordeGrosor: stateCuadrado.bordeGrosor,
		bordeColor: stateCuadrado.bordeColor,
		fondoEstado: stateCuadrado.fondoEstado,
		fondoColor: stateCuadrado.fondoColor,
		x_ini: 0,
		y_ini: 0,
		x_fin: 0,
		y_fin: 0,
	};
	const mouse = {
		click: false,
		move: false,
		primerClick: false,
		pos: { x: 0, y: 0 },
		pos_prev: { x: 0, y: 0 },
	};
	const canvasCuadradoDatos = {
		top: 0,
		left: 0,
		width: 0,
		height: 0,
	};
	const captura_Pos_Posprev = (e) => {
		let x = e.clientX;
		let y = e.clientY;
		let x_real = x - canvasCuadradoDatos.left;
		let y_real = y - canvasCuadradoDatos.top;
		mouse.pos_prev.x = mouse.pos.x;
		mouse.pos_prev.y = mouse.pos.y;
		mouse.pos.x = x_real;
		mouse.pos.y = y_real;

		if (mouse.primerClick) {
			cuadrado.x_ini = mouse.pos_prev.x;
			cuadrado.y_ini = mouse.pos_prev.y;
			mouse.primerClick = false;
		}
		cuadrado.x_fin = mouse.pos.x;
		cuadrado.y_fin = mouse.pos.y;
	};
	const paint = () => {
		utilsCuadricula_graficaCuadricula(context, stateCanvas); // grafica cuadricula
		utilsLapiz_graficaLapizHistoria(context, stateLapiz.historiaLapiz); // grafica historia de lapiz
		utilsCuadrado_graficaCuadradoHistoria(
			context,
			stateCuadrado.historiaCuadrado
		);
	};
	const mouseDownCuadrado = (e) => {
		mouse.click = true;
		captura_Pos_Posprev(e);
	};
	const mouseMoveCuadrado = (e) => {
		if (mouse.click) {
			if (!mouse.move) {
				mouse.primerClick = true;
				mouse.move = true;
			}
			captura_Pos_Posprev(e);
			paint();
			utilsCuadrado_graficaCuadrado(context, cuadrado);
		}
	};
	const mouseUpCuadrado = (e) => {
		captura_Pos_Posprev(e);
		if (mouse.click) {
			cuadrado.id = stateCuadrado.historiaCuadrado.length;
			paint();
			utilsCuadrado_graficaCuadrado(context, cuadrado);
			add_cuadrado_en_historia(cuadrado);
		}
		mouse.click = false;
		mouse.move = false;
		mouse.primerClick = false;
	};
	const update_canvasCuadradoDatos = () => {
		canvasCuadradoDatos.top = canvas.getBoundingClientRect().top;
		canvasCuadradoDatos.left = canvas.getBoundingClientRect().left;
		canvasCuadradoDatos.width = canvas.getBoundingClientRect().width;
		canvasCuadradoDatos.height = canvas.getBoundingClientRect().height;
	};
	// LOGICA END.

	// useEffect:
	useEffect(() => {
		canvas = document.getElementById(id_canvas);
		context = canvas.getContext('2d');

		if (stateCuadrado.active) {
			update_canvasCuadradoDatos();

			canvas.addEventListener('mousedown', mouseDownCuadrado);
			canvas.addEventListener('mousemove', mouseMoveCuadrado);
			canvas.addEventListener('mouseup', mouseUpCuadrado);
		}
		return () => {
			canvas.removeEventListener('mousedown', mouseDownCuadrado);
			canvas.removeEventListener('mousemove', mouseMoveCuadrado);
			canvas.removeEventListener('mouseup', mouseUpCuadrado);
		};
	}, [stateCuadrado]);
	useEffect(() => {
		// console.log(stateCuadrado);
	}, [add_cuadrado_en_historia]);

	// return console.log('soy el paintCuadrado');
};

export default PaintCuadrado;
