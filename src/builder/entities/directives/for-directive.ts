import { ValueProvider } from "../controls/binding";
import { StructuralDirective, DirectiveType } from "./structural-directive";
import { Component } from "../component";
import { Host } from "../host";

export class ForDirective extends StructuralDirective {
	input: {
		list: ValueProvider<any[]>
	};
	public template: Component | Host;

	constructor(list: ValueProvider<any[]>, template: Component | Host) {
		super(DirectiveType.FOR);
		this.template = template;
		this.input = {
			list: list
		};
	}
}
