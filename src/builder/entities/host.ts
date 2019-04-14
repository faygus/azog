import { SIZE } from "./size";
import { Component } from "./component";
import { StructuralDirective } from "./directives/structural-directive";

export class Host {
	width?: SIZE;
	height?: SIZE;
	child?: Component | StructuralDirective; // TODO
	hostContent?: string; // if the host can host evrything, the string value is the name of the zone

	constructor(width?: SIZE, height?: SIZE) {
		this.width = width;
		this.height = height;
	}
}
