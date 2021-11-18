import React, { useEffect, useContext } from 'react';

// CONTEXT:
import AppContextBorrador from '../context/AppContextBorrador';

const PaintBorrador = (id_canvas) => {
	// useContext:
	const { stateBorrador } = useContext(AppContextBorrador);

	// LOGICA:
	const mouse = {
		click: false,
		move: false,
		pos: { x: 0, y: 0 },
		pos_prev: { x: 0, y: 0 },
	};
	const saludar = () => {
		alert('hola');
		console.log('alert');
	};
	const canvasBorradorDatos = {
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
	const capturaPosPosprev = (e) => {
		click.x = e.clientX;
		click.y = e.clientY;

		clickReal.x = click.x - canvasBorradorDatos.left;
		clickReal.y = click.y - canvasBorradorDatos.top;

		mouse.pos_prev.x = mouse.pos.x;
		mouse.pos_prev.y = mouse.pos.y;
		mouse.pos.x = clickReal.x;
		mouse.pos.y = clickReal.y;
	};
	const graficaBorrador = () => {
		// historiaLinea.push([
		// 	mouse.pos_prev.x,
		// 	mouse.pos_prev.y,
		// 	mouse.pos.x,
		// 	mouse.pos.y,
		// ]);
		const context = document.getElementById(id_canvas).getContext('2d');
		context.beginPath();
		context.moveTo(mouse.pos_prev.x, mouse.pos_prev.y);
		context.lineTo(mouse.pos.x, mouse.pos.y);
		context.strokeStyle = stateBorrador.color;
		context.lineWidth = stateBorrador.grosor;
		context.stroke();
		context.closePath();
	};
	const mouseDownBorrador = (e) => {
		// console.log('mousedown borrador');
		mouse.click = true;
		capturaPosPosprev(e);
	};
	const mouseMoveBorrador = (e) => {
		// console.log('mousemove borrador');
		if (mouse.click) {
			capturaPosPosprev(e);
			graficaBorrador();
		}
	};
	const mouseUpBorrador = (e) => {
		// console.log('mouseup borrador');
		capturaPosPosprev(e);
		graficaBorrador();
		mouse.click = false;
	};
	// LOGICA END.

	// useEffect:
	useEffect(() => {
		if (stateBorrador.active) {
			let canvasBorrador = document.getElementById(id_canvas);
			//canvasBorrador.addEventListener('click', saludar);
			canvasBorradorDatos.top = canvasBorrador.getBoundingClientRect().top;
			canvasBorradorDatos.left = canvasBorrador.getBoundingClientRect().left;
			canvasBorradorDatos.width = canvasBorrador.getBoundingClientRect().width;
			canvasBorradorDatos.height =
				canvasBorrador.getBoundingClientRect().height;

			canvasBorrador.addEventListener('mousedown', mouseDownBorrador);
			canvasBorrador.addEventListener('mousemove', mouseMoveBorrador);
			canvasBorrador.addEventListener('mouseup', mouseUpBorrador);
		}
		return () => {
			let canvasBorrador = document.getElementById(id_canvas);
			//canvasBorrador.removeEventListener('click', saludar);

			canvasBorrador.removeEventListener('mousedown', mouseDownBorrador);
			canvasBorrador.removeEventListener('mousemove', mouseMoveBorrador);
			canvasBorrador.removeEventListener('mouseup', mouseUpBorrador);
		};
	}, [stateBorrador]);

	// RENDER:
	// return console.log('hola soy el borrador');
};

export default PaintBorrador;
