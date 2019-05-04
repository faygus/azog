import { ValueProvider } from "./controls/binding";
import { Component } from "./component";

export class RouterView {
	constructor(
		public routes: IRoutesParam,
		public activeRoute: ValueProvider<string>) {
	}
}

export type IRoutesParam = { [routeName: string]: IComponentWithInputs };

interface IComponentWithInputs {
	component: Component;
	inputs?: any; // TODO
}
