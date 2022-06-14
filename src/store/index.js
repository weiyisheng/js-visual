import create from 'zustand';

import { parse } from '@/language';

import { astToNodes } from '@/language/utils';

import { getSourceCache, cacheSource } from './source';

function initNodes(source) {
	const [ast] = parse(source);

	if (ast) return astToNodes(ast, source);
	return [];
}

function initError(source) {
	const [ast, error] = parse(source);

	return error;
}

const useStore = create((set, get) => ({
	source: getSourceCache(),
	nodes: initNodes(getSourceCache()),
	error: initError(getSourceCache()),
	selectingNode: null,
	editingNode: null,
	setSource: (source) => {
		set({ source });
		cacheSource(source);
		const [ast, error] = parse(source);
		if (error) {
			set({ error });
		} else {
			set({ nodes: astToNodes(ast, source), error: null, ast });
		}
	},
	clickNode: (nodeId) => {
		if (get().selectingNode === nodeId) {
			set({ editingNode: nodeId });
		} else {
			set({ selectingNode: nodeId, editingNode: null });
		}
	},
	updateExpression(exp, loc) {
		const { source, setSource } = get();

		const {
			start: { index: start },
			end: { index: end },
		} = loc;

		setSource(
			source.slice(0, start) + exp + source.slice(end + 1, source.length)
		);
	},
	addNode() {
		const { source, setSource } = get();
		setSource(`${source}\nconst operator = ''`);
	},
}));

export default useStore;
