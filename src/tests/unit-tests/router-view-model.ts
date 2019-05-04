import { routerParser } from "../../parser/code-analyse/parsers/router";
import { IMockViewModelJSON } from "../../parser/interfaces/mock-view-model";
import { IRouterViewJSON } from "../../parser/interfaces/router";
import { IViewModelInterfaceJSON } from "../../parser/interfaces/view-model";
import { RouterRenderer } from "../../renderer/router";
import { TestTools } from "../tools/tools";

/**
 * router with dynamic active route
 */
export function run(): void {
	const rootHtml = TestTools.getRootHtml();

	const routerJSON: IRouterViewJSON = {
		routes: {
			'route1': {
				componentId: 1
			},
			'route2': {
				componentId: 2
			},
			'route3': {
				componentId: 3
			}
		},
		activeRoute: {
			value: {
				propertyName: 'activeRoute'
			}
		}
	};

	const routerViewModelInterfaceJSON: IViewModelInterfaceJSON = {
		properties: {
			'activeRoute': 'string'
		}
	};

	const routerMockViewModelJSON: IMockViewModelJSON = {
		'activeRoute': {
			loop: true,
			values: [
				{
					timeout: 0,
					value: 'route1'
				},
				{
					timeout: 1000,
					value: 'route2'
				},
				{
					timeout: 2000,
					value: 'route3'
				},
			]
		}
	};

	const dynamicViewModel = TestTools.getDynamicViewModel(routerViewModelInterfaceJSON, routerMockViewModelJSON);

	const getView = TestTools.getMockViewProvider();

	const view = routerParser(routerJSON, getView);

	const mockComponentRenderer = TestTools.getMockComponentRenderer2({
		1: 'red',
		2: 'green',
		3: 'blue',
	});
	const renderer = new RouterRenderer(mockComponentRenderer);
	const inserter = TestTools.getViewInserter(rootHtml);

	renderer.build(view, inserter, dynamicViewModel);
}
