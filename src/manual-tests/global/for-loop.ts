import { HTMLRenderer, IAppJSON, Parser } from '../../../lib/src';
import { ViewType } from '../../../lib/src/parser/view-types';
import { TestTools } from '../tools/tools';

/**
 * For loop
 */
export function run(): void {
	console.log('show forLoopView');
	const appJSON: IAppJSON = {
		views: {
			1: {
				type: ViewType.FOR_LOOP,
				value: {
					array: ['foo', 'foo', 'foo', 'foo'],
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
				type: ViewType.LABEL_WF,
				value: {
					text: 'hey world'
				}
			}
		}
	};

	const parser = new Parser(appJSON);
	const component = parser.parse(1);
	HTMLRenderer.render(component, TestTools.getRootHtml());
}
