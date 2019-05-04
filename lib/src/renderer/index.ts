import { Component } from "../parser/entities/component";
import {renderComponentInParentHtml } from "./build-component";

export class HTMLRenderer {
	static render(component: Component): void {
		const root = document.getElementById('root');
		if (!root) {
			console.error('no root element in body');
			return;
		} else {
			renderComponentInParentHtml(component, root);
		}
	}

	static clear(): void {
		const root = document.getElementById('root');
		if (!root) {
			console.error('no root element in body');
			return;
		} else {
			while (root.lastChild) {
				root.removeChild(root.lastChild);
			}
		}
	}
}
