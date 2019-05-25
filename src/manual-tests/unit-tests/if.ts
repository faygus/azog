import { conditionalViewParser } from '../../../lib/src/parsing/parsers/if';
import { IConditionalViewJSON } from '../../../lib/src/interfaces/if';
import { ConditionalViewRenderer } from '../../../lib/src/renderer/if';
import { TestTools } from '../tools/tools';

export function run(): void {
	const dataJSON: IConditionalViewJSON = {
		condition: true,
		template: {
			componentId: 1
		}
	};
	const getView = TestTools.getMockViewProvider();
	const data = conditionalViewParser(dataJSON, getView);
	const viewInserter = TestTools.getRootViewInserter();
	const mockComponentRenderer = TestTools.getMockComponentRenderer2({ 1: 'yellow' });
	const renderer = new ConditionalViewRenderer(mockComponentRenderer);
	renderer.build(data, viewInserter);
}
