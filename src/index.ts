require("../assets/stylesheets/styles.scss");
require("../node_modules/font-awesome/css/font-awesome.min.css");

import { run } from "./tests/global/router";

try {
	// HTMLRenderer.render(component);
	run();

} catch (error) {
	showError(error);
}

function showError(error: Error): void {
	const errorMessage = error.message;
	const divHtml = document.createElement('div');
	const textHtml = document.createTextNode(errorMessage);
	divHtml.appendChild(textHtml);
	const root = document.getElementById('root');
	if (!root) {
		console.error('no root element in body');
		return;
	} else {
		while (root.lastChild) {
			root.removeChild(root.lastChild);
		}
		root.appendChild(divHtml);
	}
}
