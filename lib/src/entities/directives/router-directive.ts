import { ValueProvider } from "../controls/binding";
import { StructuralDirective, DirectiveType } from "./structural-directive";
import { Component } from "../component";

// deprecated
export class RouterDirective extends StructuralDirective {
	routes: {[key: string]: Component<any>};
	activatedRoute: ValueProvider<string>;

	constructor(routes: {[key: string]: Component<any>}, activatedRoute: ValueProvider<string>) {
		super(DirectiveType.ROUTER);
		this.routes = routes;
		this.activatedRoute = activatedRoute;
	}
}
