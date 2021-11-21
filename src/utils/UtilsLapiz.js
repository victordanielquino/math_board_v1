// LAPIZ:
const utilsLapiz_graficaLapiz = (lapiz, context) => {
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
const utilsLapiz_graficaLapizHistoria = (array, context) => {
	array.forEach((element) => utilsLapiz_graficaLapiz(element, context));
};

export { utilsLapiz_graficaLapiz, utilsLapiz_graficaLapizHistoria };
