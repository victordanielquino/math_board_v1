import { useState } from 'react';
const initialStateText = {
	active: false,
	color: 'black', // fillStyle
	textAlign: 'start', // start, end, left, right, center
	estilo: 'bold', // bold, ''
	family: 'arial', // arial, Verdana, Calibri
	size: 11,
	textBaseline: 'bottom', // top, midle, top
	font: 'bold 11pt arial',
	x_ini: 500,
	y_ini: 500,
	historiaText: [],
};

const useText = () => {
	const [stateText, setStateText] = useState(initialStateText);

	const updateTextActive = (valor) => {
		setStateText({
			...stateText,
			active: valor,
		});
	};
	const updateTextColor = (valor) => {
		setStateText({
			...stateText,
			color: valor,
		});
	};
	const add_Text_en_historia = (valor) => {
		setStateText({
			...stateText,
			historiaText: [...stateText.historiaText, valor],
		});
	};
	return {
		stateText,
		updateTextActive,
		updateTextColor,
		add_Text_en_historia,
	};
};

export default useText;
