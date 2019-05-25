import { Property } from "../../entities/data/view-model";
import { DynamicViewModel, IDynamicProperty, IValueChange } from "./dynamic-view-model";

export class CustomDynamicViewModel extends DynamicViewModel {

	constructor(parentViewModel?: DynamicViewModel) {
		super();
		if (parentViewModel) {
			this._inputs = [...parentViewModel.getInputs()];
			this._properties = [...parentViewModel!.getProperties()];
		}
	}

	addProperty(property: Property): IDynamicProperty<any> {
		const p: ICustomDynamicProperty<any> = {
			name: property.name,
			type: property.type,
			value: new ValueChange()
		};
		this._properties.push(p);
		return p;
	}

	addInput(input: Property): IDynamicProperty<any> {
		const i: ICustomDynamicProperty<any> = {
			name: input.name,
			type: input.type,
			value: new ValueChange()
		};
		this._inputs.push(i);
		this._properties.push(i); // an input is automatically exposed as a property for the view
		return i;
	}

	changeProperty(name: string, value: any): void {
		const prop = this.getProperty(name);
		if (!prop) {
			throw new Error(`can not changeProperty ${name}`);
		}
		if (prop.value instanceof ValueChange) {
			prop.value.setValue(value);
		} else {
			console.error('can not change property ' + name);
		}
	}

	changeInput(name: string, value: any): void {
		const input = this.getInput(name);
		if (!input) {
			throw new Error(`can not changeInput ${name}`);
		}
		if (input.value instanceof ValueChange) {
			input.value.setValue(value);
			this.changeProperty(name, value);
		} else {
			console.error('can not change input ' + name);
		}
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

export interface ICustomDynamicProperty<T> {
	name: string;
	type: string; // TODO
	value: ValueChange<T>;
}
