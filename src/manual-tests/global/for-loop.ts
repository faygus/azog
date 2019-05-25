import { HTMLRenderer, IAppJSON, Parser } from '../../../lib/src';
import { TestTools } from '../tools/tools';

/**
 * For loop
 */
export function run(): void {
	const appJSON: IAppJSON = {
		views: {
			1: {
				type: 'forLoop',
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
				type: 'uniColorWF',
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
