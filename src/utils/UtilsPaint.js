// LINEA:
const utilsPaint_graficaLinea = (linea, context) => {
	context.lineWidth = linea.grosor;
	context.strokeStyle = linea.color;

	context.beginPath();
	context.moveTo(linea.x_ini, linea.y_ini);
	context.lineTo(linea.x_fin, linea.y_fin);
	context.stroke();
	context.closePath();
};

// LAPIZ:
const utilsPain_graficaLapiz = (lapiz, context) => {
	context.lineWidth = lapiz.grosor;
	context.strokeStyle = lapiz.color;

	context.beginPath();
	let sw = true;
	lapiz.historiaLinea.forEach((element) => {
		sw ? context.moveTo(element[0], element[1]) : '';
		sw = false;
		context.lineTo(element[2], element[3]);
	});
	context.stroke();
	context.closePath();
};

// LAPIZ - HISORIA:
const utilsPaint_graficaLapizHistoria = (array, context) => {
	array.forEach((element) => {
		utilsPain_graficaLapiz(element, context);
	});
};

export {
	utilsPain_graficaLapiz,
	utilsPaint_graficaLinea,
	utilsPaint_graficaLapizHistoria,
};
