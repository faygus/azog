import { ValueProvider, Pipe } from "../entities/controls/binding";
import { IValueProviderJSON, IValueProviderWithPipe, ValueTarget, IBinding } from "../interfaces/value-provider";

export function parseValueProvider<T>(valueProvider: IValueProviderJSON<T>): ValueProvider<T> {
	let target: ValueTarget<T>;
	let pipe: Pipe | undefined = undefined;
	if (!isIValueProviderWithPipe(valueProvider)) {
		target = valueProvider;
	} else {
		if (isIBinding(valueProvider.value)) {
			target = {
				propertyName: valueProvider.value.propertyName
			};
		} else {
			target = valueProvider.value;
		}
		if (valueProvider.pipe) {
			if (typeof valueProvider.pipe === 'number') {
				pipe = {
					id: valueProvider.pipe
				};
			} else {
				pipe = valueProvider.pipe;
			}
		}
	}
	const res: ValueProvider<T> = {
		target: target,
		pipe: pipe // id of the pipe to apply on the value
	};
	return res;
}

function isIValueProviderWithPipe<T>(data: IValueProviderJSON<T>): data is IValueProviderWithPipe<T> {
	return (<IValueProviderWithPipe<T>>data).value !== undefined;
}

function isIBinding<T>(data: ValueTarget<T>): data is IBinding {
	return (<IBinding>data).propertyName !== undefined;
}