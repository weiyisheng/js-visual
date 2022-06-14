import React from 'react';
import useStore from '@/store';

// import PropTypes from 'prop-types';

function VariableDeclaration({ node }) {
	const isEditing = useStore((state) => state.editingNode === node.id);

	const value = node.declarations[0].init?.value;

	function onInput(e) {
		const val = e.target.value;
		console.log(val);
	}

	return (
		<div className=" w-16 bg-white">
			{isEditing ? (
				<input value={value} onInput={onInput} />
			) : (
				<span>{value || '--'}</span>
			)}
		</div>
	);
}

// VariableDeclaration.propTypes = {
// 	node: PropTypes.shape({
// 		type: PropTypes.string,
//         declarations: PropTypes.array
// 	}).isRequired,
// };

export default VariableDeclaration;
