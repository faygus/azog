import { ValueProvider, Pipe } from "../entities/controls/binding";

export function parseValueProvider<T>(value: any): ValueProvider<T> {
	let target: any;
	let pipe: Pipe | undefined = undefined;
	if (typeof value !== 'object') {
		target = value;
	} else {
		if (value.propertyName) {
			target = {
				propertyName: value.propertyName
			};
		} else {
			target = value.value;
		}
		if (typeof value.pipe === 'number') {
			pipe = {
				id: value.pipe
			};
		} else {
			pipe = value.pipe;
		}
	}
	const res: ValueProvider<T> = {
		target: target,
		pipe: pipe // id of the pipe to apply on the value
	};
	return res;
}
