import { HTMLRenderer, IAppJSON, Parser } from '../../../lib/src';
import { ViewType } from '../../../lib/src/parser/view-types';
import { TestTools } from '../tools/tools';

/**
 * For loop
 */
export function run(): void {
	const appJSON: IAppJSON = {
		views: {
			1: {
				type: ViewType.FOR_LOOP,
				value: {
					array: [0,1,2,1],
					template: {
						componentId: 2,
						inputs: {
							color: {
								value: {
									propertyName: 'elementInArray'
								}
							}
						}
					},
					container: {
						direction: 'column',
						margin: 10,
						size: 110
					}
				}
			},
			2: {
				type: ViewType.UNI_COLOR_WF,
				value: {
					color: {
						value: {
							propertyName: 'color'
						}
					}
				}
			}
		},
		viewModelInterfaces: {
			2: {
				properties: {},
				inputs: {
					color: 'number'
				},
			}
		}
	};

	const parser = new Parser(appJSON);
	const component = parser.parse(1);
	HTMLRenderer.render(component, TestTools.getRootHtml());
}
