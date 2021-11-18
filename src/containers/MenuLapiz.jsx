import React, { useContext, useEffect } from 'react';

// context
import AppContextLapiz from '../context/AppContextLapiz';
import AppContext from '../context/AppContext';

// components:
import PaletaColor from '../components/PaletaColor';
import PaletaGrosor from '../components/PaletaGrosor';

// styles:
import '../styles/MenuLapiz.scss';

const MenuLapiz = () => {
	// useContext:
	const { state } = useContext(AppContext);
	const { updateLapizColorGrosor } = useContext(AppContextLapiz);

	// LOGICA:

	// LOGICA END.

	// useEffect:
	useEffect(() => {
		updateLapizColorGrosor(state.color, state.grosor);
	}, [state]);
	useEffect(() => {
		//console.log('STATE LAPIZ:', stateLapiz);
	}, []);

	return (
		<article className="article__menuLapiz">
			{<PaletaGrosor />}
			{<PaletaColor />}
		</article>
	);
};

export default MenuLapiz;
