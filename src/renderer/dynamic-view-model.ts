export class DynamicViewModel {
	properties: IDynamicProperty<any>[] = [];
	inputs: IDynamicProperty<any>[] = [];

	getProperty(name: string): IDynamicProperty<any> | undefined {
		return this.properties.find(p => p.name === name);
	}

	getInput(name: string): IDynamicProperty<any> | undefined {
		return this.inputs.find(p => p.name === name);
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
