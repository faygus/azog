import { IValueProviderJSON } from "./value-provider";
import { ISizeJSON } from "./container";

export interface IForLoopJSON {
	array: IValueProviderJSON<any[]>;
	template: IComponentTemplateJSON;
	container: IExtensibleContainerJSON
}

export interface IComponentTemplateJSON {
	componentId: number;
	inputs?: { [key: string]: IValueProviderJSON<any> };
}

export interface IExtensibleContainerJSON {
	direction: 'row' | 'column';
	margin: number;
	size: ISizeJSON;
}
