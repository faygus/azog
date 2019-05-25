import { Component } from "../component";
import { Size } from "../size";
import { ValueProvider } from "../controls/binding";

export class LayoutParent {
	children: LayoutParentChild[] = [];

	constructor(public direction: 'row' | 'column') {
	}
}

export type LayoutParentChild = LayoutParentStaticChild | IfLayoutParentChild;

export class LayoutParentStaticChild {

	constructor(public size: Size, public component: Component<any> | string) { }

	getComponent(): Component<any> | undefined {
		if (typeof this.component !== 'string') {
			return this.component;
		}
		return undefined;
	}

	getRefName(): string | undefined {
		if (typeof this.component === 'string') {
			return this.component;
		}
		return undefined;
	}
}

export class IfLayoutParentChild {
	constructor(public condition: ValueProvider<boolean>,
		public child: LayoutParentStaticChild) { }
}
