import { GetView } from "../../../lib/src/parser/code-analyse/parsers/type";
import { ViewModelParsing } from "../../../lib/src/parser/code-analyse/view-model";
import { Component } from "../../../lib/src/parser/entities/component";
import { IMockViewModelJSON } from "../../../lib/src/parser/interfaces/mock-view-model";
import { IViewModelInterfaceJSON } from "../../../lib/src/parser/interfaces/view-model";
import { DynamicViewModel } from "../../../lib/src/renderer/view-model/dynamic-view-model";
import { ViewModelCreator } from "../../../lib/src/renderer/view-model/dynamic-view-model-creator";
import { IComponentRenderer } from "../../../lib/src/renderer/interfaces/component-renderer";
import { IComponentRenderer2 } from "../../../lib/src/renderer/interfaces/component-renderer2";
import { IParentView, Padding } from "../../../lib/src/renderer/interfaces/parent-view";

export class TestTools {
	static getRootHtml(): HTMLElement {
		const rootHtml = document.getElementById('root');
		if (!rootHtml) {
			throw new Error('no root element found in dom');
		}
		return rootHtml;
	}

	static getDynamicViewModel(
		viewModelInterfaceJSON: IViewModelInterfaceJSON,
		mockViewModelJSON: IMockViewModelJSON) {
		const viewModelInterface = ViewModelParsing.getViewModel(viewModelInterfaceJSON);
		const mockViewModel = ViewModelParsing.getMockData(mockViewModelJSON);
		return ViewModelCreator.createViewModel(viewModelInterface, mockViewModel);
	}

	static getMockViewProvider(views?: { [key: number]: any }): GetView {
		const res: GetView = (id: number) => {
			if (views) {
				const data = views[id];
				if (data) {
					return new Component(data);
				}
			}
			return new Component(id);
		}
		return res;
	}

	static getViewInserter(htmlElement: HTMLElement): IParentView {
		const inserter: IParentView = {
			add: (element: HTMLElement, fullHeight = true) => {
				if (fullHeight) {
					element.style.height = '100%';
				}
				htmlElement.appendChild(element);
			},
			clear: () => {
				while (htmlElement.lastChild) {
					htmlElement.lastChild.remove();
				}
			},
			setPadding: (value: number | Padding) => {
				if (typeof value === 'number') {
					htmlElement.style.padding = value + 'px';
				} else {
					htmlElement.style.paddingTop = value.top;
					htmlElement.style.paddingRight = value.right;
					htmlElement.style.paddingBottom = value.bottom;
					htmlElement.style.paddingLeft = value.left;
				}
			},
			centerContent: (horizontaly: boolean, verticaly: boolean) => {
				htmlElement.style.display = 'flex';
				if (horizontaly) {
					htmlElement.style.justifyContent = 'center';
				}
				if (verticaly) {
					htmlElement.style.alignItems = 'center';
				}
			}
		};
		return inserter;
	}

	static getRootViewInserter(): IParentView {
		const root = TestTools.getRootHtml();
		return TestTools.getViewInserter(root);
	}

	static getMockComponentRenderer(colorsMap: MockComponentColorsMap): IComponentRenderer {
		return {
			build: (view: Component<any>, parentViewModel?: DynamicViewModel): HTMLElement => {
				const res = document.createElement('div');
				const index: number = view.view;
				res.style.backgroundColor = colorsMap[index];
				return res;
			}
		};
	}

	static getMockComponentRenderer2(colorsMap: MockComponentColorsMap): IComponentRenderer2 {
		return {
			build: (view: Component<any>, inserter: IParentView) => {
				const res = document.createElement('div');
				const index: number = view.view;
				res.style.backgroundColor = colorsMap[index];
				inserter.add(res);
			}
		};
	}
}

type MockComponentColorsMap = { [key: number]: string };