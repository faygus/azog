import { forLoopParser } from '../../../lib/src/parser/code-analyse/parsers/for-loop';
import { LayoutComposition } from '../../../lib/src/parser/entities/layout-composition';
import { Unit } from '../../../lib/src/parser/entities/unit';
import { IForLoopJSON } from '../../../lib/src/parser/interfaces/for-loop';
import { ContentManager, ForLoopRenderer, IContentManagerProvider } from '../../../lib/src/renderer/for-loop';
import { IViewInserter } from '../../../lib/src/renderer/interfaces/view-inserter';
import { TestTools } from '../tools/tools';
import { IViewModelInterfaceJSON } from '../../../lib/src/parser/interfaces/view-model';
import { IMockViewModelJSON } from '../../../lib/src/parser/interfaces/mock-view-model';

/**
 * For loop
 */
export function run(): void {
	console.log('show forLoopView with view model');
	const dataJSON: IForLoopJSON = {
		array: {
			value: {
				propertyName: 'data'
			}
		},
		template: {
			componentId: 1
		},
		containerId: 2
	};
	const viewModelInterfaceJSON: IViewModelInterfaceJSON = {
		properties: {
			data: 'string' // TODO array type
		}
	};
	const mockViewModelJSON: IMockViewModelJSON = {
		data: {
			loop: true,
			values: [
				{
					timeout: 0,
					value: ['foo', 'foo', 'foo', 'foo']
				},
				{
					timeout: 1000,
					value: ['foo', 'foo']
				},
				{
					timeout: 2000,
					value: ['foo', 'foo', 'foo']
				},
				{
					timeout: 3000,
					value: ['foo']
				},
				{
					timeout: 4000,
					value: []
				}
			]
		}
	};
	const getView = TestTools.getMockViewProvider();
	const data = forLoopParser(dataJSON, getView);
	const viewModel = TestTools.getDynamicViewModel(viewModelInterfaceJSON, mockViewModelJSON);
	const viewInserter = TestTools.getRootViewInserter();
	const mockComponentRenderer = TestTools.getMockComponentRenderer2({ 1: 'yellow' });
	const contentManagerProvider: IContentManagerProvider = {
		get: (container: any, inserter: IViewInserter) => {
			const layoutHost = new LayoutComposition('row', 20, { value: 170, unit: Unit.PX });
			let res = new ContentManager(layoutHost, inserter);
			if (container === 2) {
				const layoutHost = new LayoutComposition('column', 10, { value: 110, unit: Unit.PX });
				res = new ContentManager(layoutHost, inserter);
			}
			return res;
		}
	};
	const renderer = new ForLoopRenderer(mockComponentRenderer, contentManagerProvider);
	renderer.build(data, viewInserter, viewModel);
}
