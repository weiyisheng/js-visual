import create from 'zustand';

const useStore = create((set, get) => ({
	source: '',
	nodes: [],
	edges: [],

	// textual change
	setSource: (source) => set({ source }),
}));

export default useStore;
