/* eslint-disable import/prefer-default-export */
import { parse as babelParse } from '@babel/parser';

export function parse(source) {
	try {
		const ast = babelParse(source, {
			errorRecovery: true,
		});
		return [ast, null];
	} catch (e) {
		return [null, e];
	}
}
