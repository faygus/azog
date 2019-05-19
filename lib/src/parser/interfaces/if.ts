import { IValueProviderJSON } from "./value-provider";

export interface IConditionalViewJSON {
	condition: IValueProviderJSON<boolean>;
	template: IComponentTemplateJSON;
}

export interface IComponentTemplateJSON {
	componentId: number;
	inputs?: any; // TODO
}
