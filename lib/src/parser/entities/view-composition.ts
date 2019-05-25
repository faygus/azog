import { Component } from "./component";

export class ViewComposition<T> {
	host: Component<T>;
	refs: IComponentRefs = {};

	constructor(host: Component<T>) {
		this.host = host;
	}
}

export interface IComponentRefs {
	[ref: string]: Component<any>;
}
