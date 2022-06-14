/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

import Default from './expression/Default';
import VariableDeclaration from './expression/VariableDeclaration';

import useStore from '@/store';

function Node({ node }) {
	// react to click event
	const clickNode = useStore((state) => state.clickNode);
	function onClick() {
		clickNode(node._id);
	}

	// selected
	const selecting = useStore((state) => state.selectingNode === node._id);

	return (
		<div
			onClick={onClick}
			className={`${selecting && 'border-2 border-green-400'} mb-3`}
		>
			{node.type === 'xx' ? (
				<VariableDeclaration node={node} />
			) : (
				<Default node={node} />
			)}
		</div>
	);
}

Node.propTypes = {
	node: PropTypes.shape({
		type: PropTypes.string,
	}).isRequired,
};

export default Node;
