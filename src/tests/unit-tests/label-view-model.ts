import { labelWFParser } from "../../../lib/src/parser/code-analyse/parsers/label-wf";
import { ILabelWFViewJSON } from "../../../lib/src/parser/interfaces/label-wf";
import { IMockViewModelJSON } from "../../../lib/src/parser/interfaces/mock-view-model";
import { IViewModelInterfaceJSON } from "../../../lib/src/parser/interfaces/view-model";
import { LabelWFRenderer } from "../../../lib/src/renderer/wireframe/label";
import { TestTools } from "../tools/tools";

/**
 * Icon
 */
export function run(): void {
	const labelViewJSON: ILabelWFViewJSON = {
		text: {
			value: {
				propertyName: 'text'
			}
		},
		style: {
			size: {
				value: {
					propertyName: 'size'
				}
			},
			color: {
				value: {
					propertyName: 'color'
				}
			}
		}
	};
	const viewModelJSON: IViewModelInterfaceJSON = {
		properties: {
			text: 'string',
			color: 'number',
			size: 'number',
		}
	};
	const mockViewModelJSON: IMockViewModelJSON = {
		text: {
			loop: true,
			values: [
				{
					timeout: 0,
					value: 'hello'
				},
				{
					timeout: 1000,
					value: 'dear'
				},
				{
					timeout: 2000,
					value: 'world'
				},
			]
		},
		color: {
			loop: true,
			values: [
				{
					timeout: 0,
					value: 0
				},
				{
					timeout: 1000,
					value: 1
				},
				{
					timeout: 2000,
					value: 2
				}
			]
		},
		size: {
			loop: true,
			values: [
				{
					timeout: 0,
					value: 0
				},
				{
					timeout: 1000,
					value: 1
				},
				{
					timeout: 2000,
					value: 2
				}
			]
		}
	};
	const viewModel = TestTools.getDynamicViewModel(viewModelJSON, mockViewModelJSON);
	const labelView = labelWFParser(labelViewJSON);
	const renderer = new LabelWFRenderer();
	const inserter = TestTools.getRootViewInserter();
	renderer.build(labelView, inserter, viewModel);
}
