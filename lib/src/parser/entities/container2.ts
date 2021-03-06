import { Size } from "./size";
import { ValueProvider } from "./controls/binding";

export class Container2 {
	direction: Direction = Direction.COLUMN;
	children: ContainerChild[] = [];

	constructor() {
	}

	addChild(spaceWithPrevious: number, size: Size): ContainerChild {
		const child = new ContainerChild(size);
		child.spaceWithPrevious = spaceWithPrevious;
		this.children.push(child);
		return child;
	}
}

export enum Direction {
	ROW,
	COLUMN,
}

export class ContainerChild {
	spaceWithPrevious: number = 0;
	size: Size;
	directive?: ContainerChildDirective;

	constructor(size: Size) {
		this.size = size;
	}
}

export abstract class ContainerChildDirective {
	name: string;

	constructor(name: string) {
		this.name = name;
	}
}

export class IfDirective extends ContainerChildDirective {
	condition: ValueProvider<boolean>;

	constructor(condition: ValueProvider<boolean>) {
		super('if');
		this.condition = condition;
	}
}

export class RepeatDirective extends ContainerChildDirective {
	constructor() {
		super('repeat');
	}
}
