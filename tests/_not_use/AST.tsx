/* eslint-disable no-unused-vars */

import React, { useState } from 'react';

import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

import useStore from '@/store/code';

export default function ASTView() {
	const ast = useStore((state) => state.ast);

	return (
		<div className="absolute right-0 w-1/3 bg-gray-300 h-screen">
			<CodeMirror
				value={JSON.stringify(ast, null, 2)}
				height="100vh"
				extensions={[javascript()]}
			/>
		</div>
	);
}

const a = 'http://xxxsss';
const b = 300;
const c = fetch(a, b);

const s = function (params) {};
