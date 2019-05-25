import { Parser } from "../../../lib/src/parser/code-analyse/main";
import { IAppJSON } from "../../../lib/src/parser/interfaces/types/app";
import { HTMLRenderer } from "../../../lib/src/renderer/main";
import { TestTools } from "../tools/tools";

/**
 * A label above a unicolor background
 */
export function run(): void {
	const appJSON: IAppJSON = {
		views: {
			1: {
				type: 'layers',
				value: {
					mainLayer: {
						zIndex: 1,
						positionInsideHost: {
							vertical: {
							},
							horizontal: {
							}
						},
						component: {
							id: 2
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
								id: 3
							}
						}
					]
				}
			},
			2: {
				type: 'labelWF',
				value: {
					text: 'hello world',
					style: {
						color: 1,
						size: 2
					}
				}
			},
			3: {
				type: 'uniColorWF',
				value: {
					color: 2
				}
			}
		}
	};

	const parser = new Parser(appJSON);
	const component = parser.parse(1);
	HTMLRenderer.render(component, TestTools.getRootHtml());
}
