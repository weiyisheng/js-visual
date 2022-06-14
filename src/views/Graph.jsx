import React, { useEffect } from 'react';

import useStore from '@/store';

import Node from './components/Node';

import keyEvent from '@/utils/keyEvent';

function Graph() {
	const nodes = useStore((state) => state.nodes);
	const error = useStore((state) => state.error);
	const ast = useStore((state) => state.ast);

	const addNode = useStore((state) => state.addNode);
	useEffect(
		() => {
			keyEvent.key('tab', (event, handler) => {
				addNode();
			});
		},
		() => {
			keyEvent.unbind('tab');
		}
	);

	return (
		<div className=" relative h-full">
			{nodes.map((node) => (
				<Node node={node} key={node._id} ast={ast} />
			))}
			{error ? (
				<div className=" absolute bottom-0 left-0 w-full mb-2 text-red-500">
					{error.toString()}
				</div>
			) : null}
		</div>
	);
}

export default Graph;
