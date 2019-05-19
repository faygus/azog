import { ValueProvider, Pipe } from "../parser/entities/controls/binding";
import { DynamicViewModel } from "./view-model/dynamic-view-model";

export function watchViewProperty<T>(data: ValueProvider<T>, viewModel: DynamicViewModel | undefined, handler: (value: T) => void) {
	const processValue = (value: T) => {
		let v = value;
		if (data.pipe !== undefined) {
			v = applyPipe(data.pipe, value);
		}
		handler(v);
	};
	let value: T | undefined;
	if (!(typeof data.target === 'object' && (<any>(data.target)).propertyName)) {
		value = <T>data.target;
	} else {
		if (!viewModel) {
			throw new Error('no view model');
		}
		const propBindedName = (<any>data.target).propertyName;
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

function applyPipe(pipe: Pipe, value: any): any {
	if (pipe.id === 3) { // equal comparison pipe
		if (!pipe.args) {
			throw new Error('no argument for equal comparison pipe');
		}
		const valueToCompare = pipe.args['comparedTo']; // TODO value may not be literal value
		return valueToCompare === value;
	} else {
		const p = PIPES[pipe.id];
		if (!p) {
			throw new Error('pipe ' + pipe.id + ' not found');
		}
		return p[value];
	}
}

const PIPES: any = {
	1: {
		true: 1,
		false: 2
	},
	2: {
		true: 0,
		false: 2
	},
};
