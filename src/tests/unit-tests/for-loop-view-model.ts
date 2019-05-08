import { forLoopParser } from '../../../lib/src/parser/code-analyse/parsers/for-loop';
import { IForLoopJSON } from '../../../lib/src/parser/interfaces/for-loop';
import { IMockViewModelJSON } from '../../../lib/src/parser/interfaces/mock-view-model';
import { IViewModelInterfaceJSON } from '../../../lib/src/parser/interfaces/view-model';
import { ForLoopRenderer } from '../../../lib/src/renderer/for-loop';
import { TestTools } from '../tools/tools';

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
		container: {
			direction: 'column',
			margin: 10,
			size: 110
		}
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
	const renderer = new ForLoopRenderer(mockComponentRenderer);
	renderer.build(data, viewInserter, viewModel);
}
