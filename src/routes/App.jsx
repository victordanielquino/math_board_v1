import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// CONTEXT:
import AppContext from '../context/AppContext';
import AppContextLapiz from '../context/AppContextLapiz';
import AppContextBorrador from '../context/AppContextBorrador';
import AppContextCuadrado from '../context/AppContextCuadrado';

// HOOKS:
import useInitialState from '../hooks/useInitialState';
import useMover from '../hooks/useMover';
import useLapiz from '../hooks/useLapiz';
import useBorrador from '../hooks/useBorrador';
import useCuadrado from '../hooks/useCuadrado';

import Layout from '../containers/Layout';
import Home from '../pages/Home';
import '../styles/global.css';
import AppContextMover from '../context/AppContextMover';

const App = () => {
	const initialState = useInitialState();
	const initialStateMover = useMover();
	const initialStateLapiz = useLapiz();
	const initialStateBorrador = useBorrador();
	const initialStateCuadrado = useCuadrado();

	return (
		<AppContext.Provider value={initialState}>
			<AppContextMover.Provider value={initialStateMover}>
				<AppContextLapiz.Provider value={initialStateLapiz}>
					<AppContextBorrador.Provider value={initialStateBorrador}>
						<AppContextCuadrado.Provider value={initialStateCuadrado}>
							<BrowserRouter>
								<Layout>
									<Routes>
										{/* <Route exact path="/" element={<Home />} /> */}
									</Routes>
								</Layout>
							</BrowserRouter>
						</AppContextCuadrado.Provider>
					</AppContextBorrador.Provider>
				</AppContextLapiz.Provider>
			</AppContextMover.Provider>
		</AppContext.Provider>
	);
};

export default App;
