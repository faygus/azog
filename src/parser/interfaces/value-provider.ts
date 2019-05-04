/**
 * A value provider means a hard coded value or a reference on a view model variable
 */
export type IValueProviderJSON<T> = T | IValueProviderWithPipe<T>;

export interface IValueProviderWithPipe<T> {
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
