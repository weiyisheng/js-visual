/* eslint-disable no-restricted-syntax */
import dagre from 'dagre';

const g = new dagre.graphlib.Graph();

// Set an object for the graph label
g.setGraph({
	rankdir: 'TB',
	align: '', // UL, UR, DL, or DR
	ranker: 'longest-path', // network-simplex, tight-tree or longest-path
	acyclicer: 'greedy',
});

// Default to assigning a new object as a label for each new edge.
g.setDefaultEdgeLabel(() => {
	return {};
});

// dimens: 所有node的尺寸
// nodes: 补充位置信息之后返回
// edges: 设置dagre edges
function layout(dimens, nodes, edges) {
	try {
		for (const node of dimens) {
			const {
				id,
				dimensions: { width, height },
			} = node;
			g.setNode(id, { label: id, width, height });
		}

		for (const edge of edges) {
			const { source, target } = edge;
			g.setEdge(source, target);
		}

		dagre.layout(g);

		const _nodes = g.nodes().map((n) => {
			const node = g.node(n);

			return {
				...nodes.find((_n) => _n.id === n),
				position: {
					x: node.x,
					y: node.y,
				},
			};
		});

		return _nodes;
	} catch (e) {
		console.error(e);
		return null;
	}
}

export default layout;
