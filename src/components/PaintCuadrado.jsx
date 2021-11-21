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
	const cuadradoNewSegmentado = {
		x_ini: 0,
		y_ini: 0,
		x_fin: 0,
		y_fin: 0,
		x_fin_prev: 0,
		y_fin_prev: 0,
		posIni: true,
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
	const captura_Pos_Posprev = (e) => {
		let x = e.clientX;
		let y = e.clientY;
		let x_real = x - canvasCuadradoDatos.left;
		let y_real = y - canvasCuadradoDatos.top;
		mouse.pos_prev.x = mouse.pos.x;
		mouse.pos_prev.y = mouse.pos.y;
		mouse.pos.x = x_real;
		mouse.pos.y = y_real;
	};
	const graficaCuadradoSegmentado = (cuadrado_new_segmentado) => {
		const context = document.getElementById(id_canvas).getContext('2d');

		// limpia el canvas:
		context.clearRect(
			cuadrado_new_segmentado.x_ini,
			cuadrado_new_segmentado.y_ini,
			cuadrado_new_segmentado.x_fin - cuadrado_new_segmentado.x_ini,
			cuadrado_new_segmentado.y_fin - cuadrado_new_segmentado.y_ini
		);

		// grafica tablero:
		context.beginPath();
		context.fillStyle = 'white'; // fondoColor
		context.moveTo(0, 0); // (x_ini, y_ini)
		context.lineTo(1000, 0); // (x_fin, y_ini)
		context.lineTo(1000, 1000); // (x_fin, y_fin)
		context.lineTo(0, 1000); // (x_ini, y_fin)
		context.lineTo(0, 0); // (x_ini, y_ini)
		context.fill(); // fondoColor = true
		context.closePath();

		// linea segmentada:
		context.beginPath();
		context.strokeStyle = 'red'; // bordeColor
		context.lineWidth = 1;
		context.setLineDash([14, 4]); // lineas segmentadas

		context.strokeRect(
			cuadrado_new_segmentado.x_ini,
			cuadrado_new_segmentado.y_ini,
			cuadrado_new_segmentado.x_fin - cuadrado_new_segmentado.x_ini,
			cuadrado_new_segmentado.y_fin - cuadrado_new_segmentado.y_ini
		); // grafica el cuadrado

		context.fillStyle = 'blue'; // fondoColor
		context.fill(); // fondoColor = true
		context.stroke();
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
	const mouseDownCuadrado = (e) => {
		mouse.click = true;
		captura_Pos_Posprev(e);
	};
	const mouseMoveCuadrado = (e) => {
		if (mouse.click) {
			// el mous esta en movimiento con el click presionado.
			captura_Pos_Posprev(e);
			if (cuadradoNewSegmentado.posIni) {
				cuadradoNewSegmentado.x_ini = mouse.pos_prev.x;
				cuadradoNewSegmentado.y_ini = mouse.pos_prev.y;
				cuadradoNewSegmentado.posIni = false;
			}
			cuadradoNewSegmentado.x_fin_prev = mouse.pos_prev.x;
			cuadradoNewSegmentado.y_fin_prev = mouse.pos_prev.y;
			cuadradoNewSegmentado.x_fin = mouse.pos.x;
			cuadradoNewSegmentado.y_fin = mouse.pos.y;
			graficaCuadradoSegmentado(cuadradoNewSegmentado);
		}
	};
	const mouseUpCuadrado = (e) => {
		//captura_Pos_Posprev(e);
		if (mouse.pos_prev.x != mouse.pos.x && mouse.pos_prev.y != mouse.pos.y) {
			graficaCuadradoSegmentado(cuadradoNewSegmentado);
			// new object:
			cuadradoNew.id = stateCuadrado.historialCuadrado.length;
			cuadradoNew.bordeEstado = stateCuadrado.bordeEstado;
			cuadradoNew.bordeGrosor = stateCuadrado.bordeGrosor;
			cuadradoNew.bordeColor = stateCuadrado.bordeColor;
			cuadradoNew.fondoEstado = stateCuadrado.fondoEstado;
			cuadradoNew.fondoColor = stateCuadrado.fondoColor;
			cuadradoNew.x_ini = cuadradoNewSegmentado.x_ini;
			cuadradoNew.y_ini = cuadradoNewSegmentado.y_ini;
			// cuadradoNew.x_ini = mouse.pos_prev.x;
			// cuadradoNew.y_ini = mouse.pos_prev.y;
			cuadradoNew.x_fin = mouse.pos.x;
			cuadradoNew.y_fin = mouse.pos.y;
			graficaCuadrado(cuadradoNew);
			console.log(cuadradoNew);
			add_cuadrado_en_historia(cuadradoNew);
		}
		mouse.click = false;
		cuadradoNewSegmentado.posIni = true;
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
			canvasCuadrado.addEventListener('mousemove', mouseMoveCuadrado);
			canvasCuadrado.addEventListener('mouseup', mouseUpCuadrado);
		}
		return () => {
			let canvasCuadrado = document.getElementById(id_canvas);
			//canvasCuadrado.removeEventListener('click', saludar);

			canvasCuadrado.removeEventListener('mousedown', mouseDownCuadrado);
			canvasCuadrado.removeEventListener('mousemove', mouseMoveCuadrado);
			canvasCuadrado.removeEventListener('mouseup', mouseUpCuadrado);
		};
	}, [stateCuadrado]);
	useEffect(() => {
		// console.log(stateCuadrado);
	}, [add_cuadrado_en_historia]);

	// return console.log('soy el paintCuadrado');
};

export default PaintCuadrado;
