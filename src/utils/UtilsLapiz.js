// LAPIZ:
const utilsLapiz_graficaLapiz = (context, lapiz) => {
	context.lineWidth = lapiz.grosor;
	context.strokeStyle = lapiz.color;
	context.setLineDash([0, 0]);
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
const utilsLapiz_graficaLapizHistoria = (context, array) => {
	array.forEach((element) => utilsLapiz_graficaLapiz(context, element));
};

export { utilsLapiz_graficaLapiz, utilsLapiz_graficaLapizHistoria };
