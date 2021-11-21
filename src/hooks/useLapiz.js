import { useState } from 'react';
const initialStateLapiz = {
	active: false,
	color: 'black',
	grosor: 4,
	historiaLapiz: [],
};

const useLapiz = () => {
	const [stateLapiz, setStateLapiz] = useState(initialStateLapiz);

	const updateLapizActive = (valor) => {
		setStateLapiz({
			...stateLapiz,
			active: valor,
		});
	};
	const updateLapizColor = (valor) => {
		console.log('color util:', valor);
		setStateLapiz({
			...stateLapiz,
			color: valor,
		});
		console.log('color:', stateLapiz);
	};
	const updateLapizGrosor = (valor) => {
		setStateLapiz({
			...stateLapiz,
			grosor: valor,
		});
	};
	const add_historiaLapiz = (valor) => {
		setStateLapiz({
			...stateLapiz,
			historiaLapiz: [...stateLapiz.historiaLapiz, valor],
		});
	};
	const updateLapizColorGrosor = (valor1, valor2) => {
		setStateLapiz({
			...stateLapiz,
			color: valor1,
			grosor: valor2,
		});
	};

	return {
		stateLapiz,
		updateLapizActive,
		updateLapizColor,
		updateLapizGrosor,
		add_historiaLapiz,
		updateLapizColorGrosor,
	};
};

export default useLapiz;
