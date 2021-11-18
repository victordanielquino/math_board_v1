import React, { useContext, useEffect } from 'react';

// CONTEXT:
import AppContextCuadrado from '../context/AppContextCuadrado';

const PaintCuadrado = (id_canvas) => {
	// useContext:
	const { stateCuadrado, add_cuadrado_en_historia } =
		useContext(AppContextCuadrado);

	// LOGICA:
	const cuadradoNew = {
		id: 0,
		bordeEstado: true,
		bordeGrosor: 2,
		bordeColor: 'black',

		fondoEstado: true,
		fondoColor: 'black',
		x_ini: 0,
		y_ini: 0,
		x_fin: 0,
		y_fin: 0,
	};
	const mouse = {
		click: false,
		move: false,
		pos: { x: 0, y: 0 },
		pos_prev: { x: 0, y: 0 },
	};
	const canvasCuadradoDatos = {
		top: 0,
		left: 0,
		width: 0,
		height: 0,
	};
	const click = {
		x: 0,
		y: 0,
	};
	const clickReal = {
		x: 0,
		y: 0,
	};
	const capturaPosprev = (e) => {
		click.x = e.clientX;
		click.y = e.clientY;

		clickReal.x = click.x - canvasCuadradoDatos.left;
		clickReal.y = click.y - canvasCuadradoDatos.top;

		mouse.pos_prev.x = mouse.pos.x;
		mouse.pos_prev.y = mouse.pos.y;
		mouse.pos.x = clickReal.x;
		mouse.pos.y = clickReal.y;
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
	const mouseDownCuadrado = (e) => {
		mouse.click = true;
		capturaPosprev(e);
	};
	const mouseUpCuadrado = (e) => {
		capturaPosprev(e);

		if (mouse.pos_prev.x != mouse.pos.x && mouse.pos_prev.y != mouse.pos.y) {
			// new object:
			cuadradoNew.id = stateCuadrado.historialCuadrado.length;
			cuadradoNew.bordeEstado = stateCuadrado.bordeEstado;
			cuadradoNew.bordeGrosor = stateCuadrado.bordeGrosor;
			cuadradoNew.bordeColor = stateCuadrado.bordeColor;
			cuadradoNew.fondoEstado = stateCuadrado.fondoEstado;
			cuadradoNew.fondoColor = stateCuadrado.fondoColor;
			cuadradoNew.x_ini = mouse.pos_prev.x;
			cuadradoNew.y_ini = mouse.pos_prev.y;
			cuadradoNew.x_fin = mouse.pos.x;
			cuadradoNew.y_fin = mouse.pos.y;
			graficaCuadrado(cuadradoNew);
			add_cuadrado_en_historia(cuadradoNew);
		}
		mouse.click = false;
	};
	// LOGICA END.

	// useEffect:
	useEffect(() => {
		if (stateCuadrado.active) {
			let canvasCuadrado = document.getElementById(id_canvas);
			//canvasCuadrado.addEventListener('click', saludar);
			canvasCuadradoDatos.top = canvasCuadrado.getBoundingClientRect().top;
			canvasCuadradoDatos.left = canvasCuadrado.getBoundingClientRect().left;
			canvasCuadradoDatos.width = canvasCuadrado.getBoundingClientRect().width;
			canvasCuadradoDatos.height =
				canvasCuadrado.getBoundingClientRect().height;

			canvasCuadrado.addEventListener('mousedown', mouseDownCuadrado);
			//canvasCuadrado.addEventListener('mousemove', mouseMoveCuadrado);
			canvasCuadrado.addEventListener('mouseup', mouseUpCuadrado);
		}
		return () => {
			let canvasCuadrado = document.getElementById(id_canvas);
			//canvasCuadrado.removeEventListener('click', saludar);

			canvasCuadrado.removeEventListener('mousedown', mouseDownCuadrado);
			//canvasCuadrado.removeEventListener('mousemove', mouseMoveCuadrado);
			canvasCuadrado.removeEventListener('mouseup', mouseUpCuadrado);
		};
	}, [stateCuadrado]);
	useEffect(() => {
		// console.log(stateCuadrado);
	}, [add_cuadrado_en_historia]);

	// return console.log('soy el paintCuadrado');
};

export default PaintCuadrado;
