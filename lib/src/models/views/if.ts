import { Component } from "../component";
import { ValueProvider } from "./controls/binding";

export class ConditionalView {
	constructor(public condition: ValueProvider<boolean>,
		public template: ComponentTemplate
	) {

	}
}

export class ComponentTemplate {
	constructor(public component: Component<any>) { }
}
