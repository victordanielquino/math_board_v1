const historia = [];

const utilsLapiz = (id, active) => {
	const canvas = document.getElementById(id);
	const context = canvas.getContext('2d');

	if (active) {
		var historiaLinea = [];
		const mouse = {
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
		const click = {
			x: 0,
			y: 0,
		};
		const clickReal = {
			x: 0,
			y: 0,
		};

		const capturaPosPosprev = (e) => {
			click.x = e.clientX;
			click.y = e.clientY;

			clickReal.x = click.x - canvasDatos.left;
			clickReal.y = click.y - canvasDatos.top;

			mouse.pos_prev.x = mouse.pos.x;
			mouse.pos_prev.y = mouse.pos.y;
			mouse.pos.x = clickReal.x;
			mouse.pos.y = clickReal.y;
		};

		const graficaLapiz = () => {
			historiaLinea.push([
				mouse.pos_prev.x,
				mouse.pos_prev.y,
				mouse.pos.x,
				mouse.pos.y,
			]);
			context.beginPath();
			context.moveTo(mouse.pos_prev.x, mouse.pos_prev.y);
			context.lineTo(mouse.pos.x, mouse.pos.y);
			context.strokeStyle = 'black';
			context.lineWidth = 2;
			context.stroke();
			context.closePath();
		};

		canvas.addEventListener('mousedown', (e) => {
			historiaLinea = [];
			mouse.click = true;
			capturaPosPosprev(e);
		});
		canvas.addEventListener('mousemove', (e) => {
			if (mouse.click) {
				capturaPosPosprev(e);
				graficaLapiz();
			}
		});
		canvas.addEventListener('mouseup', (e) => {
			capturaPosPosprev(e);
			graficaLapiz();
			mouse.click = false;
			historia.push(historiaLinea);
		});
	} else {
		console.log('el lapiz no esta activado!!!');
		canvas.addEventListener('mousedown', (e) => {});
		canvas.addEventListener('mousemove', (e) => {});
		canvas.addEventListener('mouseup', (e) => {});
	}
};

export { utilsLapiz, historia };
//document.addEventListener('DOMContentLoaded', init);
