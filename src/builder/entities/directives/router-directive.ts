import { ValueProvider } from "../controls/binding";
import { StructuralDirective, DirectiveType } from "./structural-directive";
import { Component } from "../component";

export class RouterDirective extends StructuralDirective {
	routes: {[key: string]: Component};
	activatedRoute: ValueProvider<string>;

	constructor(routes: {[key: string]: Component}, activatedRoute: ValueProvider<string>) {
		super(DirectiveType.ROUTER);
		this.routes = routes;
		this.activatedRoute = activatedRoute;
	}
}
