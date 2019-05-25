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
					array: {
						value: {
							propertyName: 'data'
						}
					},
					template: {
						componentId: 2
					},
					container: {
						direction: 'column',
						margin: 10,
						size: 110
					}
				}
			},
			2: {
				type: 'labelWF',
				value: {
					text: 'hey world'
				}
			}
		},
		viewModelInterfaces: {
			1: {
				properties: {
					data: 'string' // TODO
				}
			}
		},
		mockViewModels: {
			1: {
				data: {
					loop: true,
					values: [
						{
							timeout: 0,
							value: ['hey', 'world']
						},
						{
							timeout: 1000,
							value: ['hey']
						},
						{
							timeout: 2000,
							value: ['hey', 'beautiful', 'world']
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
