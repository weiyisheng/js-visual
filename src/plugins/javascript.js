/* eslint-disable no-restricted-syntax */
import { v4 as uuidv4 } from 'uuid';

export function getNodes(ast, allTokens) {
	let idx = 0;

	// first, we group allTokens into every node by positon
	const nodes = allTokens.reduce((acc, token) => {
		const { end } = ast[idx];
		const { start } = token;
		if (start > end) idx += 1;
		if (!acc[idx])
			// new Node
			acc[idx] = {
				id: uuidv4(),
				ast: ast[idx],
				tokens: [],
			};
		acc[idx].tokens.push({
			id: uuidv4(),
			...token,
		});
		return acc;
	}, []);

	// second, add every node`s ref and every token`s 'isRef' tag.
	const nodesWithRef = nodes.map((node) => {
		const { tokens } = node;
		return {
			...node,
			ref: tokens[1].value,
		};
	});
	const allRefs = nodesWithRef.map((n) => n.ref);
	for (const node of nodesWithRef) {
		const { tokens } = node;
		for (const token of tokens) {
			const {
				type: { label },
				value,
			} = token;
			// 如果token的value 在allRefs里面，则认为该token是一个链接其他node的ref
			if (label === 'name' && allRefs.includes(value)) {
				token.isRef = true;
			}
			if (label === 'name' && value === node.ref) {
				token.isNodeRef = true;
			}
		}
	}

	return nodesWithRef;
}

export function getEdges(nodes) {
	const refsMap = nodes.reduce(
		(acc, node) => ({
			...acc,
			[node.ref]: node.id,
		}),
		{}
	);

	return nodes.reduce((acc, node) => {
		const { tokens, id: nodeId } = node;
		return [
			...acc,
			...tokens.reduce((edges, token) => {
				const { isRef, value, id: tokenId } = token;
				if (isRef) {
					return [
						...edges,
						{
							id: uuidv4(),
							source: refsMap[value],
							target: nodeId,
							targetHandle: tokenId,
						},
					];
				}

				return edges;
			}, []),
		];
	}, []);
}

const ignore = ['=', ';', 'eof'];
export function onTokenShown(token) {
	const {
		type: { label },
		isRef,
		isNodeRef,
	} = token;

	const hideStyle = {
		display: 'none',
	};

	if (label === 'const') return hideStyle;
	if (isNodeRef) return hideStyle;
	if (ignore.includes(label)) return hideStyle;

	if (isRef) {
		return {
			color: '#4EC9B0',
		};
	}

	return {
		color: 'rgba(0,0,0,.6)',
	};
}
