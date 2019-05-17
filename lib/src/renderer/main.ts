import { Component } from "../parser/entities/component";
import { IconWFView } from "../parser/entities/controls/wireframe/icon";
import { LabelWFView } from "../parser/entities/controls/wireframe/label";
import { UniColorWFView } from "../parser/entities/controls/wireframe/uniColor";
import { ForLoopView } from "../parser/entities/for-loop";
import { LayersView } from "../parser/entities/layers";
import { RouterView } from "../parser/entities/router";
import { DynamicViewModel } from "./dynamic-view-model";
import { ViewModelCreator } from "./dynamic-view-model-creator";
import { ForLoopRenderer } from "./for-loop";
import { IBaseRenderer2 } from "./interfaces/base-renderer2";
import { IComponentRenderer2 } from "./interfaces/component-renderer2";
import { IParentView } from "./interfaces/parent-view";
import { LayersRenderer } from "./layers";
import { RouterRenderer } from "./router";
import { IconWFRenderer } from "./wireframe/icon";
import { LabelWFRenderer } from "./wireframe/label";
import { UniColorWFRenderer } from "./wireframe/unicolor";

/**
 * Render a component in the root html element
 */
export class HTMLRenderer {

	static render(component: Component, rootHtml: HTMLElement): void {
		const inserter: IParentView = {
			add: (htmlElement: HTMLElement) => {
				// htmlElement.style.height = '100%';
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
				const map = HTMLRenderer.getMap(componentRenderer);
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

	private static getMap(componentRenderer: IComponentRenderer2): Map<any, IBaseRenderer2<any>> {
		const map = new Map<any, IBaseRenderer2<any>>([
			[LabelWFView, new LabelWFRenderer()],
			[IconWFView, new IconWFRenderer()],
			[UniColorWFView, new UniColorWFRenderer()],
			[LayersView, new LayersRenderer(componentRenderer)],
			[RouterView, new RouterRenderer(componentRenderer)],
			[ForLoopView, new ForLoopRenderer(componentRenderer)],
			// ... TODO
		]);
		return map;
	}
}
