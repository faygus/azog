import { ValueProvider } from "../controls/binding";
import { StructuralDirective, DirectiveType } from "./structural-directive";
import { Component } from "../component";
import { Host } from "../host";

export class IfDirective extends StructuralDirective {
	input: {
		condition: ValueProvider<boolean>
	};
	public template: Component | Host;

	constructor(condition: ValueProvider<boolean>, template: Component) {
		super(DirectiveType.IF);
		this.template = template;
		this.input = {
			condition: condition
		};
	}
}
