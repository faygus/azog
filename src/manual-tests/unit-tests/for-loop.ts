import { forLoopParser } from '../../../lib/src/parser/code-analyse/parsers/for-loop';
import { IForLoopJSON } from '../../../lib/src/parser/interfaces/for-loop';
import { ForLoopRenderer } from '../../../lib/src/renderer/for-loop';
import { TestTools } from '../tools/tools';

/**
 * For loop
 */
export function run(): void {
	const dataJSON: IForLoopJSON = {
		array: ['foo', 'foo', 'foo', 'foo'],
		template: {
			componentId: 1
		},
		container: {
			direction: 'column',
			margin: 10,
			size: 110
		}
	};
	const getView = TestTools.getMockViewProvider();
	const data = forLoopParser(dataJSON, getView);
	const viewInserter = TestTools.getRootViewInserter();
	const mockComponentRenderer = TestTools.getMockComponentRenderer2({ 1: 'yellow' });
	const renderer = new ForLoopRenderer(mockComponentRenderer);
	renderer.build(data, viewInserter);
}
