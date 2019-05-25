import { routerParser } from "../../../lib/src/parser/code-analyse/parsers/router";
import { IRouterViewJSON } from "../../../lib/src/parser/interfaces/router";
import { RouterRenderer } from "../../../lib/src/renderer/router";
import { TestTools } from "../tools/tools";

/**
 * router with static active route
 */
export function run(): void {
	const rootHtml = TestTools.getRootHtml();

	const routerJSON: IRouterViewJSON = {
		routes: {
			'route1': {
				id: 1
			},
			'route2': {
				id: 2
			},
			'route3': {
				id: 3
			}
		},
		activeRoute: 'route3'
	};

	const getView = TestTools.getMockViewProvider();

	const view = routerParser(routerJSON, getView);

	const mockComponentRenderer = TestTools.getMockComponentRenderer2({
		1: 'red',
		2: 'green',
		3: 'blue',
	});
	const renderer = new RouterRenderer(mockComponentRenderer);
	const inserter = TestTools.getViewInserter(rootHtml);

	renderer.build(view, inserter);
}
