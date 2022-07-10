/* eslint-disable class-methods-use-this */

import store from '@/store';
import layout from './layout';

import { getTokens } from '@/server';

import { getNodes, getEdges } from '@/plugins/javascript';

function onNodesChange(changes) {
	// 判断尺寸变化，一般是在首次渲染成功之后
	if (changes[0]?.type === 'dimensions') {
		store.setState({
			nodes: layout(
				changes,
				store.getState().nodes,
				store.getState().edges
			),
		});
	}
}
function onEdgesChange(change) {
	console.log(change);
}
function onConnect() {
	console.log('change');
}

function onEditNode(node) {
	const { tokens } = node;
	store.setState({
		showInput: true,
	});
}

function setSource(source) {
	store.setState({ source });
}

function initNodes() {
	const { ast, tokens } = getTokens();

	const nodes = getNodes(ast, tokens);
	const edges = getEdges(nodes);

	store.setState({
		nodes: nodes.map((n) => ({
			id: n.id,
			data: n,
			type: 'node',
			position: { x: 0, y: 0 },
		})),
		edges,
	});
}

export default {
	initNodes,
	onNodesChange,
	onEdgesChange,
	onConnect,
	setSource,
};
