import { Parser } from "../../../lib/src/parser/code-analyse/main";
import { IIconWFViewJSON } from "../../../lib/src/parser/interfaces/icon-wf";
import { ViewType } from "../../../lib/src/parser/interfaces/types";
import { HTMLRenderer } from "../../../lib/src/renderer/main";
import { TestTools } from "../tools/tools";
import { IAppJSON } from "../../../lib/src/parser/interfaces/app";

export function run(): void {
	const appJSON: IAppJSON = {
		views: {
			1: {
				type: ViewType.ROUTER,
				value: {
					activeRoute: 'route3',
					routes: {
						'route1': {
							componentId: 2,
						},
						'route2': {
							componentId: 3
						},
						'route3': {
							componentId: 4
						}
					}
				}
			},
			2: {
				type: ViewType.UNI_COLOR_WF,
				value: {
					color: 1
				}
			},
			3: {
				type: ViewType.UNI_COLOR_WF,
				value: {
					color: 2
				}
			},
			4: {
				type: ViewType.UNI_COLOR_WF,
				value: {
					color: 0
				}
			},
		}
	};

	const parser = new Parser(appJSON);
	const component = parser.parse(1);
	HTMLRenderer.render(component, TestTools.getRootHtml());
}
