import { Parser } from "../../../lib/src/parsing/main";
import { IAppJSON } from "../../../lib/src/interfaces/types/app";
import { HTMLRenderer } from "../../../lib/src/renderer/main";
import { TestTools } from "../tools/tools";

export function run(): void {
	const appJSON: IAppJSON = {
		views: {
			1: {
				type: 'composition',
				value: {
					hostId: 2,
					children: {
						'layer1': {
							id: 3
						},
						'layer2': {
							id: 4
						}
					}
				}
			},
			2: {
				type: 'layers',
				value: {
					subLayers: [
						{
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
							componentInfos: {
								ref: 'layer1'
							},
							zIndex: 1
						},
						{
							positionInsideHost: {
								vertical: {
									start: 40,
									end: 40
								},
								horizontal: {
									start: 40,
									end: 40
								}
							},
							componentInfos: {
								ref: 'layer2'
							},
							zIndex: 2
						}
					]
				}
			},
			3: {
				type: 'uniColorWF',
				value: {
					color: 1
				}
			},
			4: {
				type: 'labelWF',
				value: {
					text: 'i am the content'
				}
			}
		}
	};

	const parser = new Parser(appJSON);
	const component = parser.parse(1);
	HTMLRenderer.render(component, TestTools.getRootHtml());
}
