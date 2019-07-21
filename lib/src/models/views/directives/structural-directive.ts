import { Component } from "../../component";
import { Host } from "../host";

// deprecated
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
