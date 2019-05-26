import { Component } from "./component";
import { IComponentInfos } from "./composition/i-component-infos";

export class ViewComposition<T> {
	host: Component<T>;
	refs: IComponentRefs = {};

	constructor(host: Component<T>) {
		this.host = host;
	}
}

export interface IComponentRefs {
	[ref: string]: IComponentInfos;
}
