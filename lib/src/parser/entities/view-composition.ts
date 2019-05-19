import { Component } from "./component";

export class ViewComposition<T> {
	host: Component<T>;
	refs: { [ref: string]: Component<any> } = {};

	constructor(host: Component<T>) {
		this.host = host;
	}
}
