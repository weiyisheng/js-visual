import React from 'react';

import Textual from '@/views/Textual';
import Graph from '@/views/Graph';

function App() {
	return (
		<div className="h-screen">
			<div className=" h-3/4 bg-slate-600">
				<Graph />
			</div>
			<div className=" h-1/4 bg-gray-300">
				<Textual />
			</div>
		</div>
	);
}

export default App;
