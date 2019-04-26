export type ValueProviderJSON<T> = T | IValueProvider<T>;

export interface IValueProvider<T> {
	value: ValueTarget<T>;
	pipe?: IPipe; // id of the pipe to apply on the value
}

type ValueTarget<T> = T | IBinding;

export interface IBinding {
	propertyName: string;
}

export interface IPipe {
	id: number;
	args?: { [key: string]: any };
}
