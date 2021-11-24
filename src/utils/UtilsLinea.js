// LINEA:
const utilsLinea_graficaLinea = (context, linea) => {
	context.lineWidth = linea.grosor;
	context.strokeStyle = linea.color;
	context.setLineDash([0, 0]);

	context.beginPath();
	context.moveTo(linea.x_ini, linea.y_ini);
	context.lineTo(linea.x_fin, linea.y_fin);
	context.stroke();
	context.closePath();
};

// LAPIZ - HISORIA:
const utilsLinea_graficaLineaHistoria = (context, array) => {
	array.forEach((element) => {
		utilsLinea_graficaLinea(context, element);
	});
};

export { utilsLinea_graficaLinea, utilsLinea_graficaLineaHistoria };
