import { Size } from "./size";
import { Component } from "./component";
import { StructuralDirective } from "./directives/structural-directive";

export class Host {
	width?: Size;
	height?: Size;
	child?: Component | StructuralDirective; // TODO
	hostContent?: string; // if the host can host evrything, the string value is the name of the zone

	constructor(width?: Size, height?: Size) {
		this.width = width;
		this.height = height;
	}
}
