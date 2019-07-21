import { IValueProviders } from "../../models/component";
import { DynamicViewModel } from "../view-model/dynamic-view-model";
import { CustomDynamicViewModel } from "../view-model/custom-dynamic-view-model";
import { Binding } from "../../models/views/controls/binding";

export function extendViewModel(inputs: IValueProviders,
	viewModel?: DynamicViewModel): CustomDynamicViewModel {
	const res = new CustomDynamicViewModel(viewModel);
	for (const inputName in inputs) {
		// const input = inputs[inputName];
		res.addInput({
			name: inputName,
			type: 'string' // TODO
		});
		/*if (isBinding(input.target) &&
			input.target.propertyName === 'elementInArray') {
			res.changeInput(inputName, data);
		}*/
		// TODO watch parent props
	}
	return res;
}

function isBinding(data: any): data is Binding {
	return (<Binding>data).propertyName !== undefined;
}
