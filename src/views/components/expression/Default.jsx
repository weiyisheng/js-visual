import React, { useState } from 'react';
import { parse } from '@babel/parser';
import useStore from '@/store';

import { expressionValid } from '@/language/utils';

function Default({ node }) {
	const updateExp = useStore(({ updateExpression }) => updateExpression);

	const isEditing = useStore(({ editingNode }) => editingNode === node._id);

	const value = node._expression || node.type;

	const [temp, setTemp] = useState(null);
	const [err, setErr] = useState(null);

	function onInput(e) {
		const val = e.target.value;
		try {
			const ast = parse(val, {
				errorRecovery: true,
			});
			setTemp(null);
			setErr(null);
			updateExp(val, node.loc);
		} catch (error) {
			setErr(error.toString());
			setTemp(val);
		}
	}

	function onBlur() {
		setTemp(null);
	}

	return (
		<div className=" w-40 bg-white relative">
			{isEditing ? (
				<input
					value={temp || value}
					onInput={onInput}
					onBlur={onBlur}
				/>
			) : (
				<span>{temp || value || '--'}</span>
			)}
			{err && <div className=" absolute -bottom-2 left-0">{err}</div>}
		</div>
	);
}

export default Default;
