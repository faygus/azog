import { Component } from "../../builder/entities/component";
import { buildComponent, renderComponent } from "./build-component";
import { IViewInserter } from "./interfaces/view-inserter";

export class HTMLRenderer {
	static render(component: Component): void {
		const root = document.getElementById('root');
		if (!root) {
			console.error('no root element in body');
			return;
		} else {
			// const div = buildComponent(component);
			const viewInserter: IViewInserter = {
				add: (element: HTMLElement) => {
					root.appendChild(element);
				},
				remove: () => {
					while (root.lastChild) {
						root.lastChild.remove();
					}
				}
			}
			renderComponent(component, viewInserter);
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
