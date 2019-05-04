import { Component } from "./component";
import { Size } from "./size";
import { ValueProvider } from "./controls/binding";

export class LayoutView {
	children: (LayoutChild | IfLayoutChild)[] = [];

	constructor(public direction: 'row' | 'column') {
	}
}

export class LayoutChild {
	component?: Component;

	constructor(public size: Size) { }
}

export class IfLayoutChild {
	constructor(public condition: ValueProvider<boolean>, public child: LayoutChild) { }
}
