import { IValueProviderJSON } from "./value-provider";

export interface IForLoopJSON {
	array: IValueProviderJSON<any[]>;
	template: IComponentTemplateJSON;
	containerId: number
}

export interface IComponentTemplateJSON {
	componentId: number;
	inputs?: any; // TODO
}
