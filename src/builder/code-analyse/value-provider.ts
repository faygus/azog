import { ValueProvider, Pipe } from "../entities/controls/binding";
import { ValueProviderJSON, IValueProvider } from "../interfaces/value-provider";

export function parseValueProvider<T>(valueProvider: ValueProviderJSON<T>): ValueProvider<T> {
	let target: any;
	let pipe: Pipe | undefined = undefined;
	if (typeof valueProvider !== 'object') {
		target = valueProvider;
	} else {
		const v = <IValueProvider<T>>valueProvider;
		if ((<any>v.value).propertyName) {
			target = {
				propertyName: (<any>v.value).propertyName
			};
		} else {
			target = v.value;
		}
		if (typeof v.pipe === 'number') {
			pipe = {
				id: v.pipe
			};
		} else {
			pipe = v.pipe;
		}
	}
	const res: ValueProvider<T> = {
		target: target,
		pipe: pipe // id of the pipe to apply on the value
	};
	return res;
}
