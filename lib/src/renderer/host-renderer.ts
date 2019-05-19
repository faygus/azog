import { Host } from "../parser/entities/host";
import { DynamicViewModel } from "./view-model/dynamic-view-model";
import { Unit } from "../parser/entities/unit";
import { Component } from "../parser/entities/component";
import { IfDirective } from "../parser/entities/directives/if-directive";
import { IViewInserter } from "./interfaces/view-inserter";
import { ForDirective } from "../parser/entities/directives/for-directive";
import { IfDirectiveRenderer } from "./if-directive";
import { RenderComponentInParentHtml, IComponentRenderer } from "./interfaces/component-renderer";
import { IHostRenderer } from "./interfaces/host-renderer";
import { IComponentOrHostBuilder } from "./interfaces/component-builder";

export class HostRenderer implements IHostRenderer {
	constructor(private _componentRenderer: IComponentRenderer,
		private _renderComponentInParentHtml: RenderComponentInParentHtml) {

	}

	build(host: Host, viewModel?: DynamicViewModel): HTMLElement {
		const div = document.createElement('div');
		div.style.position = 'relative';
		div.style.boxSizing = 'border-box';
		const width = host.width;
		if (width) {
			if (typeof width === 'object') {
				const unitStr = getUnit(width.unit);
				const widthString = width.value + unitStr;
				div.style.width = widthString;
			} else {
				if (width === 'full') {
					div.style.flex = '1';
				}
			}
		}
		const height = host.height;
		if (height) {
			if (typeof height === 'object') {
				div.style.height = height.value + getUnit(height.unit);
			} else {
				if (height === 'full') {
					div.style.flex = '1';
				}
			}
		}
		if (host.child) {
			if (host.child instanceof Component) {
				this._renderComponentInParentHtml(host.child, div, viewModel);
			} else {
				const directive = host.child;
				if (directive instanceof IfDirective) {
					const viewInserter: IViewInserter = {
						add: (element: HTMLElement) => {
							div.appendChild(element);
						},
						clear: () => {
							while (div.lastChild) {
								div.lastChild.remove();
							}
						}
					};
					this.handleIfDirective(directive, viewInserter, viewModel);
				} else if (directive instanceof ForDirective) {
					// Est ce que l'on peut vraiment avoir un for dans un host ?
				}
			}
		} else if (host.hostContent) {
			// TODO
			console.warn('host content not rendered yet');
		}
		return div;
	}

	private handleIfDirective(directive: IfDirective, viewInserter: IViewInserter,
		viewModel?: DynamicViewModel): void {
		const componentOrHostRenderer: IComponentOrHostBuilder = {
			build: (component: Component<any> | Host, viewModel?: DynamicViewModel) => {
				if (component instanceof Component) {
					return this._componentRenderer.build(component);
				}
				return this.build(component, viewModel);
			}
		}
		const renderer = new IfDirectiveRenderer(directive, viewInserter,
			componentOrHostRenderer, viewModel);
		renderer.run();
	}
}

function getUnit(unit: Unit): string {
	const map = {
		[Unit.POURCENTAGE]: '%',
		[Unit.PX]: 'px'
	};
	return map[unit];
}
