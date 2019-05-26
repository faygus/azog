import { Pipe } from "../../entities/controls/binding";

export function applyPipe(pipe: Pipe, value: any): any {
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
	4: {
		true: false,
		false: true
	}
};