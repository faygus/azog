require("../assets/stylesheets/styles.scss");
require("../node_modules/font-awesome/css/font-awesome.min.css");

import { ROOT } from "./app/components/views/10";
import { HTMLRenderer } from "./renderer/html-renderer";
import { CodeParser } from "./builder/code-analyse";
import { run } from "./work/index2";

try {
	/*const component = CodeParser.parseApp(14, true);
	HTMLRenderer.render(component);*/

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
