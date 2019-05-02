import { Component } from "./component";

export class ViewComposition {
	hostComponent?: Component;
	content?: Component;
}

export class ViewComposition2 {
	parentView: Component;
	children: Component[] = [];

	constructor(parentView: Component) {
		this.parentView = parentView;
	}
}
