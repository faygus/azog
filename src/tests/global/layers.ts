import { Parser } from "../../../lib/src/parser/code-analyse/main";
import { IAppJSON } from "../../../lib/src/parser/interfaces/app";
import { ViewType } from "../../../lib/src/parser/interfaces/types";
import { HTMLRenderer } from "../../../lib/src/renderer/main";
import { TestTools } from "../tools/tools";

/**
 * A label above a unicolor background
 */
export function run(): void {
	const appJSON: IAppJSON = {
		views: {
			1: {
				type: ViewType.LAYERS,
				value: {
					mainLayer: {
						zIndex: 1,
						positionInsideHost: {
							vertical: {
								center: {
									relativeTo: 'start',
									space: {
										value: 50,
										unit: '%'
									}
								}
							},
							horizontal: {
								center: {
									relativeTo: 'start',
									space: {
										value: 50,
										unit: '%'
									}
								}
							}
						},
						component: {
							componentId: 2
						}
					},
					subLayers: [
						{
							zIndex: 0,
							positionInsideHost: {
								vertical: {
									start: 20,
									end: 20
								},
								horizontal: {
									start: 20,
									end: 20
								}
							},
							component: {
								componentId: 3
							}
						}
					]
				}
			},
			2: {
				type: ViewType.LABEL_WF,
				value: {
					text: 'hello world',
					style: {
						color: 2,
						size: 2
					}
				}
			},
			3: {
				type: ViewType.UNI_COLOR_WF,
				value: {
					color: 1
				}
			}
		}
	};

	const parser = new Parser(appJSON);
	const component = parser.parse(1);
	HTMLRenderer.render(component, TestTools.getRootHtml());
}
