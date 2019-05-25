import { Parser } from "../../../lib/src/parser/code-analyse/main";
import { IAppJSON } from "../../../lib/src/parser/interfaces/types/app";
import { HTMLRenderer } from "../../../lib/src/renderer/main";
import { TestTools } from "../tools/tools";

export function run(): void {
	const appJSON: IAppJSON = {
		views: {
			1: {
				type: 'router',
				value: {
					activeRoute: {
						value: 'route1'
					},
					routes: {
						'route1': {
							id: 2,
						},
						'route2': {
							id: 3
						},
						'route3': {
							id: 4
						}
					}
				}
			},
			2: {
				type: 'labelWF',
				value: {
					text: 'Hey world'
				}
			},
			3: {
				type: 'uniColorWF',
				value: {
					color: 2
				}
			},
			4: {
				type: 'uniColorWF',
				value: {
					color: 0
				}
			},
		},
		viewModelInterfaces: {
			1: {
				properties: {
					activatedRoute: 'string'
				}
			}
		},
		mockViewModels: {
			1: {
				activatedRoute: {
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
			}
		}
	};

	const parser = new Parser(appJSON);
	const component = parser.parse(1);
	HTMLRenderer.render(component, TestTools.getRootHtml());
}
