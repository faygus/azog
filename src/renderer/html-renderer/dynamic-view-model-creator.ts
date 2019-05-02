import { DynamicViewModel, IValueChange, IDynamicProperty } from "../dynamic-view-model";
import { IViewModelInterface, Property } from "../../parser/entities/data/view-model";
import { IMockDataSource } from "../../parser/entities/data/mock-data-source";
import { IValueProviders } from "../../parser/entities/component";
import { ValueProvider } from "../../parser/entities/controls/binding";
import { watchViewProperty } from "./binding-resolver";

export class ViewModelCreator {
	static createViewModel(viewModelInterface: IViewModelInterface,
		mockData?: IMockDataSource,
		inputs?: IValueProviders,
		parentViewModel?: DynamicViewModel): DynamicViewModel {
		const res = new CustomDynamicViewModel();
		for (const p of viewModelInterface.properties) {
			res.addProperty(p);
		}
		if (mockData) {
			for (const p of mockData.properties) {
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

export class CustomDynamicViewModel extends DynamicViewModel {

	addProperty(property: Property): IDynamicProperty<any> {
		const p = {
			name: property.name,
			type: property.type,
			value: new ValueChange()
		};
		this.properties.push(p);
		return p;
	}

	addInput(input: Property): IDynamicProperty<any> {
		const i = {
			name: input.name,
			type: input.type,
			value: new ValueChange()
		};
		this.inputs.push(i);
		return i;
	}

	changeProperty(name: string, value: any): void {
		const prop = this.getProperty(name);
		if (!prop) {
			throw new Error(`can not changeProperty ${name}`);
		}
		(<ValueChange<any>>prop.value).setValue(value);
	}

	changeInput(name: string, value: any): void {
		const input = this.getInput(name);
		if (!input) {
			throw new Error(`can not changeInput ${name}`);
		}
		(<ValueChange<any>>input.value).setValue(value);
	}
}

class ValueChange<T> implements IValueChange<T> {
	current: T | undefined;
	private _handlers: ((value: T) => void)[] = [];

	onChange(handler: (value: T) => void): void {
		this._handlers.push(handler);
		// TODO unsubscribe
	}

	setValue(value: T): void {
		this.current = value;
		for (const handler of this._handlers) {
			handler(value);
		}
	}
}
