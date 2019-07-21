import { Property } from "../../models/data/view-model";
import { DynamicViewModel, IDynamicProperty, IValueChange } from "./dynamic-view-model";

export class CustomDynamicViewModel extends DynamicViewModel {

	constructor(parentViewModel?: DynamicViewModel) {
		super();
		if (parentViewModel) {
			this._inputs = parentViewModel.getInputs().map(i => cloneDynamicProperty(i));
			this._properties = parentViewModel.getProperties().map(p => cloneDynamicProperty(p));
		}
	}

	addProperty(property: Property): IDynamicProperty<any> {
		const p = new CustomDynamicProperty(property.name, property.type);
		this._properties.push(p);
		return p;
	}

	addInput(input: Property): IDynamicProperty<any> {
		const i = new CustomDynamicProperty(input.name, input.type);
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

export class CustomDynamicProperty<T> {
	name: string;
	type: string; // TODO
	value: ValueChange<T>;

	constructor(name: string, type: string, value?: ValueChange<T>) {
		this.name = name;
		this.type = type;
		this.value = value ? value : new ValueChange();
	}
}

function cloneDynamicProperty(value: IDynamicProperty<any>): CustomDynamicProperty<any> {
	const res = new CustomDynamicProperty(value.name, value.type);
	if (value.value.current !== undefined) {
		res.value.setValue(value.value.current);
	}
	value.value.onChange(v => {
		res.value.setValue(v);
	});
	return res;
}