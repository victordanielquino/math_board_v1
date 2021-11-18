import { useState } from 'react';
const initialStateCuadrado = {
	active: false,
	bordeEstado: true, // si tendra borde
	bordeGrosor: 2,
	bordeColor: 'black',
	fondoEstado: true, // si tendra fondo
	fondoColor: 'black',
	x_ini: 0,
	y_ini: 0,
	width: 10,
	height: 10,
	historialCuadrado: [],
};

const useCuadrado = () => {
	const [stateCuadrado, setStateCuadrado] = useState(initialStateCuadrado);

	const updateCuadradoActive = (valor) => {
		setStateCuadrado({
			...stateCuadrado,
			active: valor,
		});
	};
	// UPDATE GENERAL(HEADER - PALETA):
	const updateCuadradoBordeGrosor = (valor) => {
		setStateCuadrado({
			...stateCuadrado,
			bordeGrosor: valor,
		});
	};
	const updateCuadradoBordeEstado = (valor) => {
		setStateCuadrado({
			...stateCuadrado,
			bordeEstado: valor,
		});
	};
	const updateCuadradoBordeColor = (valor) => {
		setStateCuadrado({
			...stateCuadrado,
			bordeColor: valor,
		});
	};
	const updateCuadradoFondoEstado = (valor) => {
		setStateCuadrado({
			...stateCuadrado,
			fondoEstado: valor,
		});
	};
	const updateCuadradoFondoColor = (valor) => {
		setStateCuadrado({
			...stateCuadrado,
			fondoColor: valor,
		});
	};
	// CREATE: ADD_IN:	historiaCuadrado[]
	const add_cuadrado_en_historia = (cuadrado) => {
		setStateCuadrado({
			...stateCuadrado,
			historialCuadrado: [...stateCuadrado.historialCuadrado, cuadrado],
		});
	};
	// DELETE: DELETE_IN:	historiaCuadrado[]
	// UPDATE: UPDATE_IN:	historiaCuadrado[]
	const update_cuadrado_en_historia = (array) => {
		setStateCuadrado({
			...stateCuadrado,
			historialCuadrado: array,
		});
	};

	return {
		stateCuadrado,
		updateCuadradoActive,
		updateCuadradoBordeGrosor,
		updateCuadradoBordeEstado,
		updateCuadradoBordeColor,
		updateCuadradoFondoEstado,
		updateCuadradoFondoColor,
		add_cuadrado_en_historia,
		update_cuadrado_en_historia,
	};
};

export default useCuadrado;
