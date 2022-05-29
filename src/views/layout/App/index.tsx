import React from 'react';

import FlowEditor from '@/views/layout/FlowEditor';
import TextualEditor from '@/views/layout/TextualEditor';
import ASTView from '@/views/layout/ASTView';

function App() {
	return (
		<>
			<FlowEditor />
			<TextualEditor />
			<ASTView />
		</>
	);
}

export default App;
