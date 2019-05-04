import { GetView } from "../../parser/code-analyse/parsers/type";
import { ViewModelParsing } from "../../parser/code-analyse/view-model";
import { Component } from "../../parser/entities/component";
import { IMockViewModelJSON } from "../../parser/interfaces/mock-view-model";
import { IViewModelInterfaceJSON } from "../../parser/interfaces/view-model";
import { DynamicViewModel } from "../../renderer/dynamic-view-model";
import { ViewModelCreator } from "../../renderer/dynamic-view-model-creator";
import { IComponentRenderer } from "../../renderer/interfaces/component-renderer";
import { IComponentRenderer2 } from "../../renderer/interfaces/component-renderer2";
import { IParentView } from "../../renderer/interfaces/parent-view";

export class TestTools {
	static getRootHtml(): HTMLElement {
		const rootHtml = document.getElementById('root');
		if (!rootHtml) {
			throw new Error('no root element found in dom');
		}
		return rootHtml;
	}

	static getDynamicViewModel(
		routerViewModelInterfaceJSON: IViewModelInterfaceJSON,
		routerMockViewModelJSON: IMockViewModelJSON) {
		const viewModelInterface = ViewModelParsing.getViewModel(routerViewModelInterfaceJSON);
		const mockViewModel = ViewModelParsing.getMockData(routerMockViewModelJSON);
		return ViewModelCreator.createViewModel(viewModelInterface, mockViewModel);
	}

	static getMockViewProvider(): GetView {
		const res: GetView = (id: number) => {
			const res = new Component();
			res.view = id;
			return res;
		}
		return res;
	}

	static getViewInserter(htmlElement: HTMLElement): IParentView {
		const inserter: IParentView = {
			add: (element: HTMLElement) => {
				htmlElement.appendChild(element);
			},
			clear: () => {
				while (htmlElement.lastChild) {
					htmlElement.lastChild.remove();
				}
			},
			setPadding: (value: number) => {
				htmlElement.style.padding = value + 'px';
			}
		};
		return inserter;
	}

	static getRootViewInserter(): IParentView {
		const root = TestTools.getRootHtml();
		return TestTools.getViewInserter(root);
	}

	static getRootViewParent(): IParentView {
		const rootHtml = TestTools.getRootHtml();
		const inserter = TestTools.getViewInserter(rootHtml);
		return {
			...inserter, setPadding: (value) => {
				rootHtml.style.padding = value + 'px';
			}
		};
	}

	static getMockComponentRenderer(colorsMap: MockComponentColorsMap): IComponentRenderer {
		return {
			build: (view: Component, parentViewModel?: DynamicViewModel): HTMLElement => {
				const res = document.createElement('div');
				const index: number = view.view;
				res.style.backgroundColor = colorsMap[index];
				return res;
			}
		};
	}

	static getMockComponentRenderer2(colorsMap: MockComponentColorsMap): IComponentRenderer2 {
		return {
			build: (view: Component, inserter: IParentView) => {
				const res = document.createElement('div');
				const index: number = view.view;
				res.style.backgroundColor = colorsMap[index];
				inserter.add(res);
			}
		};
	}
}

type MockComponentColorsMap = { [key: number]: string };