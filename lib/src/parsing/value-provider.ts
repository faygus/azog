import { ValueProvider, Pipe } from "../models/views/controls/binding";
import { IValueProviderJSON, IValueProviderWithPipe, ValueTarget, IBinding } from "../interfaces/value-provider";

export function parseValueProvider<T>(valueProviderJSON: IValueProviderJSON<T>): ValueProvider<T> {
	let src: ValueTarget<T>;
	let pipe: Pipe | undefined = undefined;
	if (!isIValueProviderWithPipe(valueProviderJSON)) {
		src = valueProviderJSON;
	} else {
		if (isIBinding(valueProviderJSON.value)) {
			src = {
				propertyName: valueProviderJSON.value.propertyName
			};
		} else {
			src = valueProviderJSON.value;
		}
		if (valueProviderJSON.pipe) {
			if (typeof valueProviderJSON.pipe === 'number') {
				pipe = {
					id: valueProviderJSON.pipe
				};
			} else {
				pipe = valueProviderJSON.pipe;
			}
		}
	}
	const res: ValueProvider<T> = {
		src: src,
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
