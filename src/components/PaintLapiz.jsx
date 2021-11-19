import React, { useEffect, useContext } from 'react';

// useContext:
import AppContextLapiz from '../context/AppContextLapiz';

const PaintLapiz = (id_canvas) => {
	// useContext:
	const { stateLapiz, add_historiaLapiz } = useContext(AppContextLapiz);

	// LOGICA:
	let canvas = '';
	let context = '';
	const lapizNew = {
		id: 0,
		grosor: stateLapiz.grosor,
		color: stateLapiz.color,
		historiaLinea: [],
	};
	const lapizLinea = {
		grosor: stateLapiz.grosor,
		color: stateLapiz.color,
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
	const canvasLapizDatos = {
		top: 0,
		left: 0,
		width: 0,
		height: 0,
	};
	const captura_Pos_Posprev = (e) => {
		const x = e.clientX;
		const y = e.clientY;

		const x_real = x - canvasLapizDatos.left;
		const y_real = y - canvasLapizDatos.top;

		mouse.pos_prev.x = mouse.pos.x;
		mouse.pos_prev.y = mouse.pos.y;
		mouse.pos.x = x_real;
		mouse.pos.y = y_real;

		lapizLinea.x_ini = mouse.pos_prev.x;
		lapizLinea.y_ini = mouse.pos_prev.y;
		lapizLinea.x_fin = mouse.pos.x;
		lapizLinea.y_fin = mouse.pos.y;
	};
	const graficaLapiz = (lapizNew) => {
		if (lapizNew.historiaLapiz.length > 0) {
			context.strokeStyle = lapizNew.color;
			context.lineWidth = lapizNew.grosor;
			lapizNew.historiaLapiz.map((elem) => {
				context.beginPath();
				context.moveTo(elem[0], elem[1]);
				context.lineTo(elem[2], elem[3]);
				context.stroke();
				context.closePath();
			});
		}
	};

	const graficaLinea = (linea) => {
		context.beginPath();
		context.moveTo(linea.x_ini, linea.y_ini);
		context.lineTo(linea.x_fin, linea.y_fin);
		context.strokeStyle = linea.color;
		context.lineWidth = linea.grosor;
		context.stroke();
		context.closePath();
	};
	const mouseDownLapiz = (e) => {
		stateLapiz.grosor > 0
			? (mouse.click = true)
			: console.log('el grosor es 0.');
		captura_Pos_Posprev(e);
	};
	const mouseMoveLapiz = (e) => {
		if (mouse.click) {
			captura_Pos_Posprev(e);
			graficaLinea(lapizLinea);
			lapizNew.historiaLinea.push([
				lapizLinea.x_ini,
				lapizLinea.y_ini,
				lapizLinea.x_fin,
				lapizLinea.y_fin,
			]);
		}
	};
	const mouseUpLapiz = (e) => {
		if (mouse.click) {
			captura_Pos_Posprev(e);
			graficaLinea(lapizLinea);
			lapizNew.historiaLinea.push([
				lapizLinea.x_ini,
				lapizLinea.y_ini,
				lapizLinea.x_fin,
				lapizLinea.y_fin,
			]);
			lapizNew.id = stateLapiz.historiaLapiz.length;
			add_historiaLapiz(lapizNew);
		}
		mouse.click = false;
	};
	// LOGICA END.

	// useEffect:
	useEffect(() => {
		canvas = document.getElementById(id_canvas);
		context = canvas.getContext('2d');

		if (stateLapiz.active) {
			//canvasLapiz.addEventListener('click', saludar);
			canvasLapizDatos.top = canvas.getBoundingClientRect().top;
			canvasLapizDatos.left = canvas.getBoundingClientRect().left;
			canvasLapizDatos.width = canvas.getBoundingClientRect().width;
			canvasLapizDatos.height = canvas.getBoundingClientRect().height;

			canvas.addEventListener('mousedown', mouseDownLapiz);
			canvas.addEventListener('mousemove', mouseMoveLapiz);
			canvas.addEventListener('mouseup', mouseUpLapiz);
		}
		return () => {
			//canvasLapiz.removeEventListener('click', saludar);
			canvas.removeEventListener('mousedown', mouseDownLapiz);
			canvas.removeEventListener('mousemove', mouseMoveLapiz);
			canvas.removeEventListener('mouseup', mouseUpLapiz);
		};
	}, [stateLapiz]);

	// return console.log('hola soy lapiz');
};

export default PaintLapiz;
