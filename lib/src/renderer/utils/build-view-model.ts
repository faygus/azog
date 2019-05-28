import { Component } from "../../entities/component";
import { Binding } from "../../entities/controls/binding";
import { CustomDynamicViewModel } from "../view-model/custom-dynamic-view-model";
import { DynamicViewModel } from "../view-model/dynamic-view-model";
import { ViewModelCreator } from "../view-model/dynamic-view-model-creator";
import { applyPipe } from "./apply-pipe";

export function buildViewModel(component: Component<any>, viewModel?: DynamicViewModel): DynamicViewModel | undefined {
	let ownViewModel = new DynamicViewModel();
	if (component.viewModelInterface) {
		ownViewModel = ViewModelCreator.createViewModel(component.viewModelInterface, component.mockViewModel);
	}
	const res = new CustomDynamicViewModel(ownViewModel);
	for (const inputName in component.inputs) {
		const input = component.inputs[inputName];
		res.addInput({
			name: inputName,
			type: 'any' // TODO
		});
		const handler = (value: any) => {
			if (input.pipe) {
				value = applyPipe(input.pipe, value);
			}
			res.changeInput(inputName, value);
		}
		if (isBinding(input.src)) {
			if (!viewModel) {
				throw new Error(`can not resolve input "${inputName}"`);
			}
			const prop = viewModel.getProperty(input.src.propertyName);
			if (!prop) {
				throw new Error(`can not resolve input "${inputName}"`);
			}
			if (prop.value.current !== undefined) {
				handler(prop.value.current);
			}
			prop.value.onChange(value => {
				handler(value);
			});
		} else {
			handler(input.src);
		}
	}
	return res;
}

function isBinding(data: any): data is Binding {
	return (<Binding>data).propertyName !== undefined;
}
