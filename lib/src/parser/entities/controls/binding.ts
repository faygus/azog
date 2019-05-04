export type Binding = {
	propertyName: string;
}

export type ValueProvider<T> = {
	target: ValueTarget<T>,
	pipe: Pipe | undefined; // id of the pipe to apply on the value
}

type ValueTarget<T> = T | Binding;

export interface Pipe {
	id: number;
	args?: {[key: string]: any};
}