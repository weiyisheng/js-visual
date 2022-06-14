import { v4 as uuidv4 } from 'uuid';

function getExpression(loc, source) {
	const {
		start: { index: start },
		end: { index: end },
	} = loc;
	const fragment = source.slice(start, end);
	return fragment;
}

let _nodes = [];

export function astToNodes(ast, source) {
	const newNodes = ast.program.body;

	const canReuseId = newNodes.length === _nodes.length;

	// eslint-disable-next-line no-return-assign
	return (_nodes = newNodes.map((b, idx) => ({
		...b,
		_id: canReuseId ? _nodes[idx]._id : uuidv4(),
		_expression: getExpression(b.loc, source),
	})));
}

export function expressionValid(expression, node) {
	return true;
}
