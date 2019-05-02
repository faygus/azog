import { ViewModelCreator } from "../../renderer/html-renderer/dynamic-view-model-creator";
import { ViewModelParsing } from "../../parser/code-analyse/view-model";
import { IMockViewModelJSON } from "../../parser/interfaces/mock-view-model";
import { IViewModelInterfaceJSON } from "../../parser/interfaces/view-model";
import { GetView } from "../../parser/code-analyse/parsers/type";
import { Component } from "../../parser/entities/component";
import { IViewInserter } from "../../renderer/html-renderer/interfaces/view-inserter";
import { IComponentRenderer } from "../../renderer/html-renderer/interfaces/component-renderer";
import { DynamicViewModel } from "../../renderer/dynamic-view-model";
import { IComponentRenderer2 } from "../../renderer/html-renderer/interfaces/component-renderer2";

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

	static getViewInserter(htmlElement: HTMLElement) {
		const inserter: IViewInserter = {
			add: (element: HTMLElement) => {
				htmlElement.appendChild(element);
			},
			remove: () => {
				while (htmlElement.lastChild) {
					htmlElement.lastChild.remove();
				}
			},
		};
		return inserter;
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
			build: (view: Component, inserter: IViewInserter) => {
				const res = document.createElement('div');
				const index: number = view.view;
				res.style.backgroundColor = colorsMap[index];
				inserter.add(res);
			}
		};
	}
}

type MockComponentColorsMap = {[key: number]: string};