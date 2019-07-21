import { ValueProvider } from "../controls/binding";
import { StructuralDirective, DirectiveType } from "./structural-directive";
import { Component } from "../../component";
import { Host } from "../host";

// Deprecated
export class ForDirective extends StructuralDirective {
	input: {
		list: ValueProvider<any[]>
	};
	public template: Component<any> | Host;

	constructor(list: ValueProvider<any[]>, template: Component<any> | Host) {
		super(DirectiveType.FOR);
		this.template = template;
		this.input = {
			list: list
		};
	}
}
