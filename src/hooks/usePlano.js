import { useState } from 'react';
const initialStatePlano = {
	active: false,
	x_min: -10,
	y_max: 10,
	salto: 1,
	color_cuadricula: '#abb2b9',
	width_cuadricula: 20,
	historiaPlano: [],
};

const usePlano = () => {
	const [statePlano, setStatePlano] = useState(initialStatePlano);

	const updatePlanoActive = (valor) => {
		setStatePlano({
			...statePlano,
			active: valor,
		});
	};
	const add_plano_en_historia = (valor) => {
		setStatePlano({
			...statePlano,
			historiaPlano: [...statePlano.historiaPlano, valor],
		});
	};
	return {
		statePlano,
		updatePlanoActive,
		add_plano_en_historia,
	};
};

export default usePlano;
