import { ValueProvider } from "./controls/binding";
import { Component } from "./component";

export class ForLoopView {
	constructor(public array: ValueProvider<any[]>,
		public template: ComponentTemplate,
		public container: any // TODO
	) {

	}
}

export class ComponentTemplate {
	constructor(public component: Component) { }
}
