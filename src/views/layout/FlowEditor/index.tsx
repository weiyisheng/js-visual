/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

function FlowEditor() {
	const [code, setCode] = useState(`console.log('hello world!');`);

	return (
		<div className="absolute inset-0 w-screen h-screen bg-slate-900">
			<CodeMirror
				value={code}
				height="200px"
				extensions={[javascript({ jsx: true })]}
				onChange={(value, viewUpdate) => {
					console.log('value:', value);
					setCode(value);
				}}
			/>
		</div>
	);
}

export default FlowEditor;
