const fs = require('fs');
const path = require('path');

const acorn = require('acorn');
const espree = require('espree');
const babel = require('@babel/parser');

fs.readFile(path.resolve(__dirname, 'example.js'), 'utf8', (err, _data) => {
	if (err) {
		console.error(err);
		return;
	}

	const data = JSON.stringify(_data);

	try {
		fs.writeFile(
			path.resolve(__dirname, 'acorn.json'),
			acorn.parse(data, { ecmaVersion: 3 }),
			(err) => {
				if (err) {
					console.error('acorn fail0 : ', err);
				}
				// file written successfully
			}
		);
	} catch (e) {
		console.error('acorn fail1 : ', e);
	}

	try {
		fs.writeFile(
			path.resolve(__dirname, 'espree.json'),
			espree.parse(data, { ecmaVersion: 3 }),
			(err) => {
				if (err) {
					console.error('espree fail0 : ', err);
				}
				// file written successfully
			}
		);
	} catch (e) {
		console.error('espree fail1 : ', e);
	}

	try {
		fs.writeFile(
			path.resolve(__dirname, 'babel.json'),
			babel.parse(data, { ecmaVersion: 3 }),
			(err) => {
				if (err) {
					console.error('babel fail0 : ', err);
				}
				// file written successfully
			}
		);
	} catch (e) {
		console.error('babel fail1 : ', e);
	}
});
