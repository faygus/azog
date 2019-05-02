import { IValueProviderJSON } from "./value-provider";

/**
 * Component which holds a routing logic
 * Depending on the activated route, a different component is displayed
 */
export interface IRouterJSON {
	routes: IRoutesParamJSON;
	activeRoute: IValueProviderJSON<string>;
}

export interface IRouterJSONDeclaration {
	type: 'router';
	value: IRouterJSON;
}

type IRoutesParamJSON = {[routeName: string]: IComponentWithInputs};

interface IComponentWithInputs {
	componentId: number;
	inputs?: any; // TODO
}
