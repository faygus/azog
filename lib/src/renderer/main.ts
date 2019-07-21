import { Component } from "../models/component";
import { DynamicViewModel } from "./view-model/dynamic-view-model";
import { ViewModelCreator } from "./view-model/dynamic-view-model-creator";
import { IBaseRenderer2 } from "./interfaces/base-renderer2";
import { IComponentRenderer2 } from "./interfaces/component-renderer2";
import { IParentView } from "./interfaces/parent-view";
import { getRenderersMap } from "./renderers-map";
import { buildViewModel } from "./utils/build-view-model";

/**
 * Render a component in the root html element
 */
export class HTMLRenderer {

	static render(component: Component<any>, rootHtml: HTMLElement): void {
		const inserter: IParentView = {
			add: (htmlElement: HTMLElement, fullHeight = true) => {
				if (fullHeight) {
					htmlElement.style.height = '100%';
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
		const viewModel = buildViewModel(component);
		componentRenderer.build(component, inserter, viewModel);
	}

	private static getComponentRenderer(): IComponentRenderer2 {
		const componentRenderer: IComponentRenderer2 = {
			build: (component: Component<any>, inserter: IParentView, viewModel?: DynamicViewModel): void => {
				if (!viewModel) {
					if (component.viewModelInterface) {
						viewModel = ViewModelCreator.createViewModel(component.viewModelInterface, component.mockViewModel);
					}
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
