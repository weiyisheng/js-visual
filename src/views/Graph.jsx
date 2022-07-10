import React, { useEffect } from 'react';

import ReactFlow, { Background } from 'react-flow-renderer';
import useStore from '@/store';

import Node from './Node';

import manager from '@/system/manager';

const nodeTypes = {
	node: Node,
};

function Graph() {
	const { nodes, edges } = useStore();

	return (
		<ReactFlow
			nodeTypes={nodeTypes}
			nodes={nodes}
			edges={edges}
			onNodesChange={manager.onNodesChange}
			onEdgesChange={manager.onEdgesChange}
			onConnect={manager.onConnect}
			fitView
			attributionPosition="top-right"
		>
			<Background color="#aaa" gap={16} />
		</ReactFlow>
	);
}

export default Graph;
