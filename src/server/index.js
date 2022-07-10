const parser = require('@babel/parser');

export function getSource() {
	return localStorage.getItem('source');
}

export function getTokens() {
	const s = getSource();
	try {
		const {
			program: { body },
			tokens,
		} = parser.parse(s.trim(), { errorRecovery: true, tokens: true });

		return {
			ast: body,
			tokens,
		};
	} catch (error) {
		console.error('group tokens fail :: ', error);
		return null;
	}
}

// can 'start' and 'end' get the true code ??
// 从start到end 这段代码开始解析，依次寻找对应语句的refs
// 直到
export async function run(start, end) {
	debugger;
}
