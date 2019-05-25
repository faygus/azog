import { IRouterViewJSON } from "../../../lib/src/parser/interfaces/router";
import { routerParser } from "../../../lib/src/parser/code-analyse/parsers/router";
import { TestTools } from "../tools/tools";
import { RouterRenderer } from "../../../lib/src/renderer/router";

/**
 * Routing with 3 views
 */
export function run(): void {
	const routerViewJSON: IRouterViewJSON = {
		routes: {
			'route1': {
				id: 1
			},
			'route2': {
				id: 2
			},
			'route3': {
				id: 3
			},
		},
		activeRoute: 'route3'
	}
	const getView = TestTools.getMockViewProvider();
	const routerView = routerParser(routerViewJSON, getView);
	const componentRenderer = TestTools.getMockComponentRenderer2({
		1: 'red',
		2: 'green',
		3: 'blue'
	});
	const renderer = new RouterRenderer(componentRenderer);
	const inserter = TestTools.getViewInserter(TestTools.getRootHtml());
	renderer.build(routerView, inserter);
}
