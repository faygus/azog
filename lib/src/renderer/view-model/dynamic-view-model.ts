export class DynamicViewModel {
	protected _properties: IDynamicProperty<any>[] = [];
	protected _inputs: IDynamicProperty<any>[] = [];

	getProperty(name: string): IDynamicProperty<any> | undefined {
		return this._properties.find(p => p.name === name);
	}

	getInput(name: string): IDynamicProperty<any> | undefined {
		return this._inputs.find(p => p.name === name);
	}

	getProperties(): IDynamicProperty<any>[] {
		return this._properties;
	}

	getInputs(): IDynamicProperty<any>[] {
		return this._inputs;
	}
}

export interface IValueChange<T> {
	current: T | undefined;
	onChange(handler: (value: T) => void): void;
}

export interface IDynamicProperty<T> {
	name: string;
	type: string; // TODO
	value: IValueChange<T>;
}
