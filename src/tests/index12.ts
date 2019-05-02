import { routerParser } from "../parser/code-analyse/parsers/router";
import { GetView } from "../parser/code-analyse/parsers/type";
import { Component } from "../parser/entities/component";
import { IRouterJSON } from "../parser/interfaces/router";
import { DynamicViewModel } from "../renderer/dynamic-view-model";
import { IComponentRenderer } from "../renderer/html-renderer/interfaces/component-renderer";
import { IViewInserter } from "../renderer/html-renderer/interfaces/view-inserter";
import { RouterRenderer } from "../renderer/html-renderer/router";
import { TestTools } from "./tools/tools";

/**
 * router with static active route
 */
export function run(): void {
	const rootHtml = TestTools.getRootHtml();

	const routerJSON: IRouterJSON = {
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
		activeRoute: 'route3'
	};

	const getView = TestTools.getMockViewProvider();

	const view = routerParser(routerJSON, getView);

	const mockComponentRenderer = TestTools.getMockComponentRenderer({
		1: 'red',
		2: 'green',
		3: 'blue',
	});
	const renderer = new RouterRenderer(mockComponentRenderer);
	const inserter = TestTools.getViewInserter(rootHtml);

	renderer.build(view, inserter);
}
