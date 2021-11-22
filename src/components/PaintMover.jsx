import React, { useContext, useEffect } from 'react';

// CONTEXT:
import AppContextMover from '../context/AppContextMover';
import AppContextLapiz from '../context/AppContextLapiz';
import AppContextCuadrado from '../context/AppContextCuadrado';
import AppContextCanvas from '../context/AppContextCanvas';

// utils:
import { utilsCuadricula_graficaCuadricula } from '../utils/UtilsCuadricula';
import { utilsLapiz_graficaLapizHistoria } from '../utils/UtilsLapiz';
import {
	utilsCuadrado_graficaCuadrado,
	utilsCuadrado_graficaCuadradoHistoria,
	UC_graficaCuadradoHistoria_menosI,
} from '../utils/UtilsCuadrado';

const PaintMover = (id_canvas, canvasWidth, canvasHeight) => {
	// useContext: mover
	const { stateMover } = useContext(AppContextMover);
	// useContext: cuadrado
	const { stateCuadrado } = useContext(AppContextCuadrado);
	// useContext: lapiz
	const { stateLapiz } = useContext(AppContextLapiz);
	// useContext: cuadricula
	const { stateCanvas } = useContext(AppContextCanvas);

	// LOGICA:
	let canvas = '';
	let context = '';
	let arrayCuadrados = stateCuadrado.historiaCuadrado;
	var cuadradoSelect = {};

	const mouse = {
		click: false,
		move: false,
		pos: { x: 0, y: 0 },
		pos_prev: { x: 0, y: 0 },
	};
	const canvasMoverDatos = {
		top: 0,
		left: 0,
		width: 0,
		height: 0,
	};
	const captura_Pos_Posprev = (e) => {
		const x = e.clientX;
		const y = e.clientY;

		const x_real = x - canvasMoverDatos.left;
		const y_real = y - canvasMoverDatos.top;

		mouse.pos_prev.x = mouse.pos.x;
		mouse.pos_prev.y = mouse.pos.y;
		mouse.pos.x = x_real;
		mouse.pos.y = y_real;
	};
	const cuadradoBusca = (e) => {
		captura_Pos_Posprev(e);
		arrayCuadrados.forEach((elem) => {
			if (
				elem.x_ini < mouse.pos.x &&
				mouse.pos.x < elem.x_fin &&
				elem.y_ini < mouse.pos.y &&
				mouse.pos.y < elem.y_fin
			) {
				cuadradoSelect = elem;
				mouse.move = true;
			}
		});
	};
	const cuadradoMueve = (e) => {
		captura_Pos_Posprev(e);
		const recorrido_x = mouse.pos.x - mouse.pos_prev.x;
		const recorrido_y = mouse.pos.y - mouse.pos_prev.y;
		cuadradoSelect.x_ini = cuadradoSelect.x_ini + recorrido_x;
		cuadradoSelect.y_ini = cuadradoSelect.y_ini + recorrido_y;
		cuadradoSelect.x_fin = cuadradoSelect.x_fin + recorrido_x;
		cuadradoSelect.y_fin = cuadradoSelect.y_fin + recorrido_y;
	};
	const mouseDownMover = (e) => {
		mouse.click = true;
		cuadradoBusca(e);
	};
	const mouseMoveMover = (e) => {
		if (mouse.move) {
			utilsCuadricula_graficaCuadricula(context, stateCanvas);
			cuadradoMueve(e);
			utilsCuadrado_graficaCuadradoHistoria(context, arrayCuadrados);
			utilsLapiz_graficaLapizHistoria(context, stateLapiz.historiaLapiz); // grafica historia de lapiz
		}
	};
	const mouseUpMover = (e) => {
		if (mouse.move) {
			cuadradoMueve(e);
			utilsCuadrado_graficaCuadrado(context, cuadradoSelect);
			utilsLapiz_graficaLapizHistoria(context, stateLapiz.historiaLapiz); // grafica historia de lapiz
		}
		mouse.move = false;
		mouse.click = false;
	};
	const update_canvasMoverDatos = () => {
		canvasMoverDatos.top = canvas.getBoundingClientRect().top;
		canvasMoverDatos.left = canvas.getBoundingClientRect().left;
		canvasMoverDatos.width = canvas.getBoundingClientRect().width;
		canvasMoverDatos.height = canvas.getBoundingClientRect().height;
	};
	// LOGICA END.

	// useEffect:
	useEffect(() => {
		canvas = document.getElementById(id_canvas);
		context = canvas.getContext('2d');
		if (stateMover.active) {
			update_canvasMoverDatos();
			canvas.addEventListener('mousedown', mouseDownMover);
			canvas.addEventListener('mousemove', mouseMoveMover);
			canvas.addEventListener('mouseup', mouseUpMover);
		}
		return () => {
			canvas.removeEventListener('mousedown', mouseDownMover);
			canvas.removeEventListener('mousemove', mouseMoveMover);
			canvas.removeEventListener('mouseup', mouseUpMover);
		};
	}, [stateCuadrado]);

	// RENDER:
	// return console.log('paint mover');
};

export default PaintMover;
