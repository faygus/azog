import { Component } from "../component";
import { Host } from "../host";

export abstract class StructuralDirective {

	constructor(public directiveType: DirectiveType) {
	}
}

export enum DirectiveType {
	IF,
	FOR,
	ROUTER,
	// ...
}
