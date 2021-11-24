import { useContext, useEffect } from 'react';

// CONTEXT:
import AppContextMover from '../context/AppContextMover';
import AppContextCanvas from '../context/AppContextCanvas';
import AppContextCuadrado from '../context/AppContextCuadrado';
import AppContextLinea from '../context/AppContextLinea';
import AppContextLapiz from '../context/AppContextLapiz';

// utils:
import { utilsCuadricula_graficaCuadricula } from '../utils/UtilsCuadricula';
import { utilsCuadrado_graficaCuadradoHistoria } from '../utils/UtilsCuadrado';
import { utilsLinea_graficaLineaHistoria } from '../utils/UtilsLinea';
import { utilsLapiz_graficaLapizHistoria } from '../utils/UtilsLapiz';
import {
	u_getCuadrado,
	u_moverCuadrado,
	u_cuadradoSegmentado,
	get_pts_redimencion,
	u_updateZiseCuadrado,
	u_getLinea, // linea
	u_lineaSegmentado,
	u_moverLinea,
	get_pts_redimencion_linea,
	u_updateZiseLinea,
} from '../utils/UtilsMover';

const PaintMover = (id_canvas) => {
	// useContext
	const { stateMover } = useContext(AppContextMover);
	const { stateCanvas } = useContext(AppContextCanvas);
	const { stateCuadrado } = useContext(AppContextCuadrado);
	const { stateLinea } = useContext(AppContextLinea);
	const { stateLapiz } = useContext(AppContextLapiz);

	// LOGICA:
	const paint = () => {
		utilsCuadricula_graficaCuadricula(context, stateCanvas); // grafica cuadricula
		utilsCuadrado_graficaCuadradoHistoria(
			context,
			stateCuadrado.historiaCuadrado
		);
		utilsLinea_graficaLineaHistoria(context, stateLinea.historiaLinea);
		utilsLapiz_graficaLapizHistoria(context, stateLapiz.historiaLapiz); // grafica historia de lapiz
	};
	let canvas = '';
	let context = '';
	let cuadradoSelect = {};
	let lineaSelect = {};

	const mouse = {
		pos: { x: 0, y: 0 },
		pos_prev: { x: 0, y: 0 },
		click: false,

		mover_cuadrado: false,
		seleccionar_cuadrado_pts: false,
		cuadrado_punto_mover: false,
		cuadrado_pto: '',

		mover_linea: false,
		seleccionar_linea_pts: false,
		linea_punto_mover: false,
		linea_pto: '',
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
	const busca_cuadrado_ptoClick = (x, y, array) => {
		let resp = '';
		if (
			array[0].x1 < x &&
			x < array[0].x2 &&
			array[0].y1 < y &&
			y < array[0].y2
		)
			resp = 'top';
		else if (
			array[1].x1 < x &&
			x < array[1].x2 &&
			array[1].y1 < y &&
			y < array[1].y2
		)
			resp = 'right';
		else if (
			array[2].x1 < x &&
			x < array[2].x2 &&
			array[2].y1 < y &&
			y < array[2].y2
		)
			resp = 'button';
		else if (
			array[3].x1 < x &&
			x < array[3].x2 &&
			array[3].y1 < y &&
			y < array[3].y2
		)
			resp = 'lefth';
		return resp;
	};
	const busca_linea_ptoClick = (x, y, array) => {
		let resp = '';
		if (
			array[0].x1 < x &&
			x < array[0].x2 &&
			array[0].y1 < y &&
			y < array[0].y2
		)
			resp = 'ini';
		else if (
			array[1].x1 < x &&
			x < array[1].x2 &&
			array[1].y1 < y &&
			y < array[1].y2
		)
			resp = 'fin';
		return resp;
	};
	// 1:
	const mouseDownMover = (e) => {
		mouse.click = true;
		captura_Pos_Posprev(e);

		// CUADRADO:
		if (mouse.seleccionar_cuadrado_pts) {
			// ya tiene seleccionado un cuadrado previamente
			let arrayPts = get_pts_redimencion(cuadradoSelect);
			mouse.cuadrado_pto = busca_cuadrado_ptoClick(
				mouse.pos.x,
				mouse.pos.y,
				arrayPts
			);
			if (mouse.cuadrado_pto != '') {
				console.log(mouse.cuadrado_pto);
				mouse.cuadrado_punto_mover = true; // se movera el lado seleccionado
				mouse.mover_cuadrado = false; // no se movera el cuadrado
			} else {
				mouse.cuadrado_punto_mover = false; // move_size
				mouse.mover_cuadrado = false;
			}
		}
		if (!mouse.cuadrado_punto_mover) {
			// no tiene seleccionando un cuadrado aun
			cuadradoSelect = u_getCuadrado(
				stateCuadrado.historiaCuadrado,
				mouse.pos.x,
				mouse.pos.y
			);
			if (cuadradoSelect) {
				// encontro un cuadrado donde hizo click
				mouse.seleccionar_cuadrado_pts = true;
				mouse.mover_cuadrado = true;
				mouse.cuadrado_punto_mover = false;
				u_cuadradoSegmentado(context, cuadradoSelect);
			} else {
				// no encontro un cuadrado donde hizo click
				mouse.seleccionar_cuadrado_pts = false;
				mouse.mover_cuadrado = false;
				mouse.cuadrado_punto_mover = false;
				//paint();
			}
		}
		// LINEA:
		if (!cuadradoSelect) {
			if (mouse.seleccionar_linea_pts) {
				let arrayPts = get_pts_redimencion_linea(lineaSelect);
				mouse.linea_pto = busca_linea_ptoClick(
					mouse.pos.x,
					mouse.pos.y,
					arrayPts
				);
				if (mouse.linea_pto != '') {
					mouse.linea_punto_mover = true;
					mouse.mover_linea = false;
				} else {
					mouse.linea_punto_mover = false;
					mouse.mover_linea = false;
				}
			}
			if (!mouse.linea_punto_mover) {
				lineaSelect = u_getLinea(
					stateLinea.historiaLinea,
					mouse.pos.x,
					mouse.pos.y
				);
				if (lineaSelect) {
					console.log('line select ok');
					mouse.seleccionar_linea_pts = true;
					mouse.mover_linea = true;
					mouse.linea_punto_mover = false;
					u_lineaSegmentado(context, lineaSelect);
				} else {
					mouse.seleccionar_linea_pts = false;
					mouse.mover_linea = false;
					mouse.linea_punto_mover = false;
					//paint();
				}
			}
		}
		if (!lineaSelect && !cuadradoSelect) paint();
	};
	// 2:
	const mouseMoveMover = (e) => {
		if (mouse.click) {
			if (mouse.mover_cuadrado) {
				captura_Pos_Posprev(e);
				cuadradoSelect = u_moverCuadrado(cuadradoSelect, mouse);
				paint();
				u_cuadradoSegmentado(context, cuadradoSelect);
			} else {
				if (mouse.cuadrado_punto_mover) {
					captura_Pos_Posprev(e);
					cuadradoSelect = u_updateZiseCuadrado(cuadradoSelect, mouse);
					paint();
					u_cuadradoSegmentado(context, cuadradoSelect);
				} else {
					// LINEA:
					if (mouse.mover_linea) {
						captura_Pos_Posprev(e);
						lineaSelect = u_moverLinea(lineaSelect, mouse);
						paint();
						u_lineaSegmentado(context, lineaSelect);
					} else {
						if (mouse.linea_punto_mover) {
							captura_Pos_Posprev(e);
							lineaSelect = u_updateZiseLinea(lineaSelect, mouse);
							paint();
							u_lineaSegmentado(context, lineaSelect);
						}
					}
				}
			}
		}
	};
	// 3:
	const mouseUpMover = (e) => {
		if (mouse.cuadrado_punto_mover) {
			if (cuadradoSelect.x_fin < cuadradoSelect.x_ini) {
				let aux = cuadradoSelect.x_fin;
				cuadradoSelect.x_fin = cuadradoSelect.x_ini;
				cuadradoSelect.x_ini = aux;
			}
			if (cuadradoSelect.y_fin < cuadradoSelect.y_ini) {
				let aux = cuadradoSelect.y_fin;
				cuadradoSelect.y_fin = cuadradoSelect.y_ini;
				cuadradoSelect.y_ini = aux;
			}
		}
		mouse.click = false;

		mouse.mover_cuadrado = false;
		mouse.cuadrado_punto_mover = false;
		mouse.cuadrado_pto = '';

		// LINEA:
		mouse.mover_linea = false;
		mouse.linea_punto_mover = false;
		mouse.linea_pto = '';
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
	}, [stateCuadrado, stateLinea]);

	// RENDER:
	// return console.log('paint mover');
};

export default PaintMover;
