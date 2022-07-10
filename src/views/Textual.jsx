/* eslint-disable no-unused-vars */

import React, { useState } from 'react';

import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

import useStore from '@/store';

import manager from '@/system/manager';

export default function Textual() {
	const source = useStore((state) => state.source);

	return (
		<CodeMirror
			value={source}
			extensions={[javascript({ jsx: true })]}
			onChange={(value, viewUpdate) => {
				manager.setSource(value);
			}}
		/>
	);
}
