import { Component } from "../parser/entities/component";
import { DynamicViewModel } from "./dynamic-view-model";
import { ViewModelCreator } from "./dynamic-view-model-creator";
import { IBaseRenderer2 } from "./interfaces/base-renderer2";
import { IComponentRenderer2 } from "./interfaces/component-renderer2";
import { IParentView } from "./interfaces/parent-view";
import { getRenderersMap } from "./renderers-map";

/**
 * Render a component in the root html element
 */
export class HTMLRenderer {

	static render(component: Component, rootHtml: HTMLElement): void {
		const inserter: IParentView = {
			add: (htmlElement: HTMLElement, style?: {[key: string]: string}) => {
				if (style !== undefined) {
					console.log('apply style', style);
					Object.assign(htmlElement.style, style);
				}
				rootHtml.appendChild(htmlElement);
			},
			clear: () => {
				while (rootHtml.lastChild) {
					rootHtml.lastChild.remove();
				}
			},
			setPadding: (value: number) => {
				rootHtml.style.padding = value + 'px';
			},
			centerContent: (horizontaly: boolean, verticaly: boolean) => {
				rootHtml.style.display = 'flex';
				if (horizontaly) {
					rootHtml.style.justifyContent = 'center';
				}
				if (verticaly) {
					rootHtml.style.alignItems = 'center';
				}
			}
		};
		const componentRenderer = HTMLRenderer.getComponentRenderer();
		componentRenderer.build(component, inserter);
	}

	private static getComponentRenderer(): IComponentRenderer2 {
		const componentRenderer: IComponentRenderer2 = {
			build: (component: Component, inserter: IParentView): void => {
				let viewModel: DynamicViewModel | undefined;
				if (component.viewModelInterface) {
					viewModel = ViewModelCreator.createViewModel(component.viewModelInterface, component.mockViewModel);
				}
				const map = getRenderersMap(componentRenderer);
				let renderer: IBaseRenderer2<any> | undefined;
				for (const key of map.keys()) {
					if (component.view instanceof key) {
						renderer = map.get(key);
						break;
					}
				}
				if (renderer) {
					renderer.build(component.view, inserter, viewModel);
				} else {
					throw new Error('no renderer found');
				}
			}
		};
		return componentRenderer;
	}
}
