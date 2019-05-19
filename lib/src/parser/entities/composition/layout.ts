import { Component } from "../component";
import { Size } from "../size";
import { ValueProvider } from "../controls/binding";

export class LayoutComposition {
	children: LayoutCompositionChild[] = [];

	constructor(public direction: 'row' | 'column') {
	}
}

export type LayoutCompositionChild = LayoutCompositionStaticChild | IfLayoutCompositionChild;

export class LayoutCompositionStaticChild {

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

export class IfLayoutCompositionChild {
	constructor(public condition: ValueProvider<boolean>,
		public child: LayoutCompositionStaticChild) { }
}
