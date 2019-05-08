import { ValueProvider } from "./controls/binding";
import { Component } from "./component";
import { ExtensibleContainer } from "./layout-composition";

export class ForLoopView {
	constructor(public array: ValueProvider<any[]>,
		public template: ComponentTemplate,
		public container: ExtensibleContainer
	) {

	}
}

export class ComponentTemplate {
	constructor(public component: Component) { }
}