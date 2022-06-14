export function getSourceCache() {
	return localStorage.getItem('source') || '';
}

export function cacheSource(s) {
	localStorage.setItem('source', s);
}
