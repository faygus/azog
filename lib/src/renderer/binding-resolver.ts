import { ValueProvider, Binding } from "../entities/controls/binding";
import { applyPipe } from "./utils/apply-pipe";
import { DynamicViewModel } from "./view-model/dynamic-view-model";
import { ValueTarget } from "../interfaces/value-provider";

export function watchViewProperty<T>(data: ValueProvider<T>, viewModel: DynamicViewModel | undefined, handler: (value: T) => void) {
	const processValue = (value: T) => {
		let v = value;
		if (data.pipe !== undefined) {
			console.warn('pipe', data.pipe);
			v = applyPipe(data.pipe, value);
		}
		handler(v);
	};
	let value: T | undefined;
	if (!isBinding(data.src)) {
		value = data.src;
	} else {
		if (!viewModel) {
			throw new Error('no view model');
		}
		const propBindedName = data.src.propertyName;
		const prop = viewModel.getProperty(propBindedName);
		if (!prop) {
			throw new Error(`no property ${propBindedName} in view model`);
		} else {
			const currentValue = prop.value.current;
			if (currentValue !== undefined) {
				value = currentValue;
			}
			prop.value.onChange(value => {
				processValue(value);
			});
		}
	}
	// apply pipe
	if (value !== undefined) {
		processValue(value);
	}
}

function isBinding<T>(data: ValueTarget<T>): data is Binding {
	return (<Binding>data).propertyName !== undefined;
}
