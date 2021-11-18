import React, { useContext, useEffect } from 'react';

// CONTEXT:
import AppContextMover from '../context/AppContextMover';
import AppContextLapiz from '../context/AppContextLapiz';
import AppContextCuadrado from '../context/AppContextCuadrado';

const PaintMover = (id_canvas, canvasWidth, canvasHeight) => {
	// useContext: mover
	const { stateMover } = useContext(AppContextMover);
	// useContext: cuadrado
	const { stateCuadrado } = useContext(AppContextCuadrado);
	// useContext: lapiz
	const { stateLapipz } = useContext(AppContextLapiz);

	// LOGICA:
	const arrayCuadrados = stateCuadrado.historialCuadrado;
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
	const graficaCuadrado = (newCuadrado) => {
		const context = document.getElementById(id_canvas).getContext('2d');
		context.beginPath();

		context.strokeStyle = newCuadrado.bordeColor; // bordeColor
		context.fillStyle = newCuadrado.fondoColor; // fondoColor
		context.lineWidth = newCuadrado.bordeGrosor; // bordeGrosor

		context.moveTo(newCuadrado.x_ini, newCuadrado.y_ini); // (x_ini, y_ini)
		context.lineTo(newCuadrado.x_fin, newCuadrado.y_ini); // (x_fin, y_ini)
		context.lineTo(newCuadrado.x_fin, newCuadrado.y_fin); // (x_fin, y_fin)
		context.lineTo(newCuadrado.x_ini, newCuadrado.y_fin); // (x_ini, y_fin)
		context.lineTo(newCuadrado.x_ini, newCuadrado.y_ini); // (x_ini, y_ini)

		newCuadrado.fondoEstado ? context.fill() : ''; // fondoColor = true
		newCuadrado.bordeEstado ? context.stroke() : ''; // bordeColor = true
		context.closePath();
	};
	const graficaCuadradoArray = (array, id) => {
		array.map((newCuadrado) => {
			if (newCuadrado.id != id) {
				const context = document.getElementById(id_canvas).getContext('2d');
				context.beginPath();

				context.strokeStyle = newCuadrado.bordeColor; // bordeColor
				context.fillStyle = newCuadrado.fondoColor; // fondoColor
				context.lineWidth = newCuadrado.bordeGrosor; // bordeGrosor

				context.moveTo(newCuadrado.x_ini, newCuadrado.y_ini); // (x_ini, y_ini)
				context.lineTo(newCuadrado.x_fin, newCuadrado.y_ini); // (x_fin, y_ini)
				context.lineTo(newCuadrado.x_fin, newCuadrado.y_fin); // (x_fin, y_fin)
				context.lineTo(newCuadrado.x_ini, newCuadrado.y_fin); // (x_ini, y_fin)
				context.lineTo(newCuadrado.x_ini, newCuadrado.y_ini); // (x_ini, y_ini)

				newCuadrado.fondoEstado ? context.fill() : ''; // fondoColor = true
				newCuadrado.bordeEstado ? context.stroke() : ''; // bordeColor = true
				context.closePath();
			}
		});
	};

	const saludar = () => {
		alert('hola');
		console.log('alert');
	};
	const cuadradoBusca = (e) => {
		captura_Pos_Posprev(e);
		//stateCuadrado.historialCuadrado.map((elem) => {
		arrayCuadrados.map((elem) => {
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
			graficaCuadricula();
			graficaCuadradoArray(arrayCuadrados, cuadradoSelect.id);
			cuadradoMueve(e);
			graficaCuadrado(cuadradoSelect);
		}
	};
	const mouseUpMover = (e) => {
		if (mouse.move) {
			cuadradoMueve(e);
			graficaCuadrado(cuadradoSelect);
			mouse.move = false;
		}
		mouse.click = false;
	};
	// LOGICA END.

	// useEffect:
	useEffect(() => {
		if (stateMover.active) {
			let canvasMover = document.getElementById(id_canvas);
			canvasMoverDatos.top = canvasMover.getBoundingClientRect().top;
			canvasMoverDatos.left = canvasMover.getBoundingClientRect().left;
			canvasMoverDatos.width = canvasMover.getBoundingClientRect().width;
			canvasMoverDatos.height = canvasMover.getBoundingClientRect().height;

			//canvasMover.addEventListener('click', saludar);
			//canvasMover.addEventListener('click', mouseClickMover);
			canvasMover.addEventListener('mousedown', mouseDownMover);
			canvasMover.addEventListener('mousemove', mouseMoveMover);
			canvasMover.addEventListener('mouseup', mouseUpMover);
		}
		return () => {
			let canvasMover = document.getElementById(id_canvas);

			//canvasMover.removeEventListener('click', saludar);
			//canvasMover.removeEventListener('click', mouseClickMover);
			canvasMover.removeEventListener('mousedown', mouseDownMover);
			canvasMover.removeEventListener('mousemove', mouseMoveMover);
			canvasMover.removeEventListener('mouseup', mouseUpMover);
		};
	}, [stateCuadrado]);

	// RENDER:
	// return console.log('paint mover');
};

export default PaintMover;
