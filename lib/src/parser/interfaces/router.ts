import { IValueProviderJSON } from "./value-provider";
import { IComponentWithInputsJSON } from "./utils/component-with-inputs";

/**
 * Component which holds a routing logic
 * Depending on the activated route, a different component is displayed
 */
export interface IRouterViewJSON {
	routes: IRoutesParamJSON;
	activeRoute: IValueProviderJSON<string>;
}

export interface IRouterJSONDeclaration {
	type: 'router';
	value: IRouterViewJSON;
}

type IRoutesParamJSON = {[routeName: string]: IComponentWithInputsJSON};
