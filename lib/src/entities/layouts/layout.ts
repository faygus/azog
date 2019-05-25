import { IComponentInfos } from "../composition/i-component-infos";
import { ValueProvider } from "../controls/binding";
import { Size } from "../size";

export class LayoutView {
	children: ILayoutChild[] = [];

	constructor(public direction: 'row' | 'column') {
	}
}

export type ILayoutChild = LayoutChild | IfLayoutChild;

export class LayoutChild {
	component?: IComponentInfos;

	constructor(public size: Size) { }
}

export class IfLayoutChild {
	constructor(public condition: ValueProvider<boolean>, public child: LayoutChild) { }
}
