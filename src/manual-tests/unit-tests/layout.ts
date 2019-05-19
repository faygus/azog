import { layoutParser } from "../../../lib/src/parser/code-analyse/parsers/layout";
import { ILayoutJSON } from "../../../lib/src/parser/interfaces/layout/layout";
import { LayoutRenderer } from "../../../lib/src/renderer/layout";
import { TestTools } from "../tools/tools";
import { IViewModelInterfaceJSON } from "../../../lib/src/parser/interfaces/view-model";
import { IMockViewModelJSON } from "../../../lib/src/parser/interfaces/mock-view-model";

/**
 * Try to represent a layout (horizontal or vertical)
 * with a static content
 */
export function run(): void {
	const dataJSON: ILayoutJSON = {
		direction: 'column',
		children: [
			{
				size: 100,
				componentId: 1
			},
			{
				if: {
					value: {
						propertyName: 'foo'
					}
				},
				host: {
					size: 5
				}
			},
			{
				if: {
					value: {
						propertyName: 'foo'
					}
				},
				host: {
					size: 100,
					componentId: 2
				}
			},
			{
				size: 5
			},
			{
				size: 100,
				componentId: 3
			}
		]
	};
	const viewModelInterfaceJSON: IViewModelInterfaceJSON = {
		properties: {
			foo: 'boolean'
		}
	};
	const mockViewModelJSON: IMockViewModelJSON = {
		foo: {
			loop: true,
			values: [
				{
					timeout: 0,
					value: true
				},
				{
					timeout: 1000,
					value: false
				}
			]
		}
	}
	const getView = TestTools.getMockViewProvider();
	const layout = layoutParser(dataJSON, getView);
	const viewInserter = TestTools.getRootViewInserter();
	const viewModel = TestTools.getDynamicViewModel(viewModelInterfaceJSON, mockViewModelJSON);

	const mockComponentRenderer = TestTools.getMockComponentRenderer2({
		1: 'red',
		2: 'green',
		3: 'blue',
	});
	const renderer = new LayoutRenderer(mockComponentRenderer);
	renderer.build(layout, viewInserter, viewModel);
}
