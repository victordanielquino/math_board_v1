const prueba1 = () => {
	console.log('saludando prueba 1');
};

// PAINT:

const paint = () => {
	const canvas = document.getElementById('canvas-1');
	const contexto = canvas.getContext('2d');

	const canvasDatos = {
		top: canvas.getBoundingClientRect().top,
		left: canvas.getBoundingClientRect().left,
		width: canvas.getBoundingClientRect().width,
		height: canvas.getBoundingClientRect().height,
	};
	console.log(canvasDatos);

	const COLOR = 'black';
	const GROSOR = 2;

	let xAnterior = 0;
	let yAnterior = 0;
	let xActual = 0;
	let yActual = 0;

	const obtenerXReal = (clientX) =>
		clientX - canvas.getBoundingClientRect().left;
	const obtenerYReal = (clientY) =>
		clientY - canvas.getBoundingClientRect().top;

	let haComenzadoDibujo = false; // Bandera que indica si el usuario está presionando el botón del mouse sin soltarlo

	canvas.addEventListener('mousedown', (evento) => {
		// En este evento solo se ha iniciado el clic, así que dibujamos un punto
		xAnterior = xActual;
		yAnterior = yActual;
		xActual = obtenerXReal(evento.clientX);
		yActual = obtenerYReal(evento.clientY);
		contexto.beginPath();
		contexto.fillStyle = COLOR;
		contexto.fillRect(xActual, yActual, GROSOR, GROSOR);
		contexto.closePath();
		// Y establecemos la bandera
		haComenzadoDibujo = true;
	});
	canvas.addEventListener('mousemove', (evento) => {
		if (!haComenzadoDibujo) {
			return;
		}
		// El mouse se está moviendo y el usuario está presionando el botón, así que dibujamos todo

		xAnterior = xActual;
		yAnterior = yActual;
		xActual = obtenerXReal(evento.clientX);
		yActual = obtenerYReal(evento.clientY);
		contexto.beginPath();
		contexto.moveTo(xAnterior, yAnterior);
		contexto.lineTo(xActual, yActual);
		contexto.strokeStyle = COLOR;
		contexto.lineWidth = GROSOR;
		contexto.stroke();
		contexto.closePath();
	});
	['mouseup', 'mouseout'].forEach((nombreDeEvento) => {
		canvas.addEventListener(nombreDeEvento, () => {
			haComenzadoDibujo = false;
		});
	});
};
const paint2 = () => {
	const canvas = document.getElementById('canvas-1');
	const contexto = canvas.getContext('2d');
	const COLOR = 'black';
	const GROSOR = 2;

	let xAnterior = 0;
	let yAnterior = 0;
	let xActual = 0;
	let yActual = 0;

	const obtenerXReal = (clientX) =>
		clientX - canvas.getBoundingClientRect().left;
	const obtenerYReal = (clientY) =>
		clientY - canvas.getBoundingClientRect().top;

	let haComenzadoDibujo = false; // Bandera que indica si el usuario está presionando el botón del mouse sin soltarlo

	canvas.addEventListener('mousedown', (evento) => {
		// En este evento solo se ha iniciado el clic, así que dibujamos un punto
		xAnterior = xActual;
		yAnterior = yActual;
		xActual = obtenerXReal(evento.clientX);
		yActual = obtenerYReal(evento.clientY);
		contexto.beginPath();
		contexto.fillStyle = COLOR;
		contexto.fillRect(xActual, yActual, GROSOR, GROSOR);
		contexto.closePath();
		// Y establecemos la bandera
		haComenzadoDibujo = true;
	});
	canvas.addEventListener('mousemove', (evento) => {
		if (!haComenzadoDibujo) {
			return;
		}
		// El mouse se está moviendo y el usuario está presionando el botón, así que dibujamos todo

		xAnterior = xActual;
		yAnterior = yActual;
		xActual = obtenerXReal(evento.clientX);
		yActual = obtenerYReal(evento.clientY);
		contexto.beginPath();
		contexto.moveTo(xAnterior, yAnterior);
		contexto.lineTo(xActual, yActual);
		contexto.strokeStyle = COLOR;
		contexto.lineWidth = GROSOR;
		contexto.stroke();
		contexto.closePath();
	});
	['mouseup', 'mouseout'].forEach((nombreDeEvento) => {
		canvas.addEventListener(nombreDeEvento, () => {
			haComenzadoDibujo = false;
		});
	});
};

function init() {
	console.log('init!!!');
	var clickX = 0;
	var clickY = 0;
	var iniCX = 0;
	var iniCY = 0;

	const canvas = document.getElementById('canvas-1');
	const contexto = canvas.getContext('2d');

	let mouse = {
		click: false,
		move: false,
		pos: { x: 0, y: 0 },
		pos_prev: { x: 0, y: 0 },
	};
	const canvasDatos = {
		top: canvas.getBoundingClientRect().top,
		left: canvas.getBoundingClientRect().left,
		width: canvas.getBoundingClientRect().width,
		height: canvas.getBoundingClientRect().height,
	};

	const dibuja = () => {
		contexto.beginPath();
		contexto.moveTo(mouse.pos_prev.x, mouse.pos_prev.y);
		contexto.lineTo(mouse.pos.x, mouse.pos.y);
		contexto.strokeStyle = 'black';
		contexto.lineWidth = 2;
		contexto.stroke();
		contexto.closePath();
	};
	canvas.addEventListener('mousedown', (e) => {
		clickX = e.clientX;
		clickY = e.clientY;
		iniCX = clickX - canvasDatos.left;
		iniCY = clickY - canvasDatos.top;

		console.log('x:', clickX, ', y:', clickY);
		console.log('x_ini:', iniCX, ', y_ini:', iniCY);

		contexto.beginPath();
		// contexto.moveTo(iniCX, iniCY);
		// contexto.lineTo(iniCX + 100, iniCY + 100);
		contexto.moveTo(2, 2);
		contexto.lineTo(200, 50);
		contexto.strokeStyle = 'black';
		contexto.lineWidth = 2;
		contexto.stroke();
		contexto.closePath();
	});
	canvas.addEventListener('mouseup', (e) => {
		console.log('solto el click!!!');
		mouse.click = false;
		//console.log(mouse);
	});
	canvas.addEventListener('mousemove', (e) => {
		//console.log('mueve el click!!!');
		mouse.move = true;
		if (mouse.click) {
			mouse.pos_prev.x = mouse.pos.x;
			mouse.pos_prev.y = mouse.pos.y;
			mouse.pos.x = e.clientX / canvasDatos.width;
			mouse.pos.y = e.clientY / canvasDatos.height;
			dibuja();
			console.log(mouse);
		}
		//console.log(mouse);
	});

	if (mouse.click && mouse.move && mouse.pos_prev) {
		dibuja();
	}
}
document.addEventListener('DOMContentLoaded', init);

export { prueba1, init };
