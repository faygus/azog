import { IContainerJSON } from "../../../lib/src/parser/interfaces/container";
import { IViewCompositionJSON } from "../../../lib/src/parser/interfaces/view-composition";
import { containerParser } from "../../../lib/src/parser/code-analyse/parsers/container";
import { GetView } from "../../../lib/src/parser/code-analyse/parsers/type";
import { viewCompositionParser } from "../../../lib/src/parser/code-analyse/parsers/view-composition";
import { ViewComposition2Renderer } from "../../../lib/src/renderer/view-composition2";
import { IComponentRenderer } from "../../../lib/src/renderer/interfaces/component-renderer";
import { Component } from "../../../lib/src/parser/entities/component";
import { DynamicViewModel } from "../../../lib/src/renderer/dynamic-view-model";
import { IViewModelInterfaceJSON } from "../../../lib/src/parser/interfaces/view-model";
import { IMockViewModelJSON } from "../../../lib/src/parser/interfaces/mock-view-model";
import { ViewModelParsing } from "../../../lib/src/parser/code-analyse/view-model";

/**
 * Layout with if directive binded
 */
export function run(): void {

	const layoutJSON: IContainerJSON = {
		direction: 'column',
		children: [
			{
				spaceWithPrevious: 10,
				size: {
					value: 100,
					unit: 'px'
				}
			},
			{
				spaceWithPrevious: 10,
				size: {
					value: 100,
					unit: 'px'
				},
				directive: {
					name: 'if',
					data: {
						condition: {
							value: {
								propertyName: 'show'
							}
						}
					}
				}
			},
			{
				spaceWithPrevious: 10,
				size: {
					value: 100,
					unit: 'px'
				}
			},
			{
				spaceWithPrevious: 40,
				size: {
					value: 100,
					unit: 'px'
				}
			}
		]
	};

	const layoutViewModelJSON: IViewModelInterfaceJSON = {
		properties: {
			'show': 'boolean'
		}
	};

	const layoutMockDataJSON: IMockViewModelJSON = {
		show: {
			loop: true,
			values: [
				{
					timeout: 0,
					value: true
				},
				{
					timeout: 1000,
					value: false
				},
			]
		}
	};

	const viewCompositionJSON: IViewCompositionJSON = {
		parentView: 1,
		children: [
			{
				id: 2
			},
			{
				id: 3
			},
			{
				id: 4
			},
			{
				id: 5
			},
		]
	};

	const getView: GetView = (id: number) => {
		const res = new Component();
		if (id === 1) {
			res.view = containerParser(layoutJSON);
			const vm = ViewModelParsing.getViewModel(layoutViewModelJSON);
			const mock = ViewModelParsing.getMockData(layoutMockDataJSON);
			res.viewModelInterface = vm;
			res.mockViewModel = mock;
		} else {
			res.view = id;
		}
		return res;
	}

	const view = viewCompositionParser(viewCompositionJSON, getView);

	const componentRenderer: IComponentRenderer = {
		build: (view: Component, parentViewModel?: DynamicViewModel): HTMLElement => {
			const res = document.createElement('div');
			const colorsMap: { [key: number]: string } = {
				2: 'red',
				3: 'yellow',
				4: 'green',
				5: 'blue'
			};
			const index: number = view.view;
			res.style.backgroundColor = colorsMap[index];
			return res;
		}
	};
	const renderer = new ViewComposition2Renderer(componentRenderer);
	const res = renderer.build(view);

	res.style.backgroundColor = 'orange';
	res.style.height = '100%';
	const root = document.getElementById('root');
	if (root) {
		root.appendChild(res);
	}
}
