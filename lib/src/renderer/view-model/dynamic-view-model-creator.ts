import { DynamicViewModel, IValueChange, IDynamicProperty } from "./dynamic-view-model";
import { IViewModelInterface, Property } from "../../parser/entities/data/view-model";
import { IMockDataSource } from "../../parser/entities/data/mock-data-source";
import { IValueProviders } from "../../parser/entities/component";
import { ValueProvider } from "../../parser/entities/controls/binding";
import { watchViewProperty } from "../binding-resolver";
import { CustomDynamicViewModel } from "./custom-dynamic-view-model";

export class ViewModelCreator {

	static createViewModel(viewModelInterface: IViewModelInterface,
		mockViewModel?: IMockDataSource,
		inputs?: IValueProviders,
		parentViewModel?: DynamicViewModel): DynamicViewModel {
		const res = new CustomDynamicViewModel();
		for (const p of viewModelInterface.properties) {
			res.addProperty(p);
		}
		if (mockViewModel) {
			for (const p of mockViewModel.properties) {
				const prop = res.getProperty(p.name);
				if (prop) {
					const change = () => {
						for (const value of p.values) {
							if (value.timeout === 0) {
								res.changeProperty(p.name, value.value);
							} else {
								setTimeout(() => {
									res.changeProperty(p.name, value.value);
								}, value.timeout);
							}
						}
					};
					change();
					if (p.loop) {
						const maxTimeout = p.values.map(v => v.timeout).reduce((a, b) => Math.max(a, b));
						setInterval(() => {
							change();
						}, maxTimeout + 1000); // TODO why 1 seconde after last change ?
					}
				}
			}
		}
		// inputs
		for (const input of viewModelInterface.inputs) {
			const i = res.addInput(input);
			i.value.onChange(value => {
				res.changeProperty(input.name, value); // if a property has the same name as the input,
				// we trigger a change
			});
		}
		if (inputs) {
			for (const inputName in inputs) {
				const valueProvider: ValueProvider<any> = inputs[inputName];
				const handler = (value: any) => {
					res.changeInput(inputName, value);
				};
				watchViewProperty(valueProvider, parentViewModel, handler);
			}
		}
		return res;
	}
}
