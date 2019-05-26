import { IValueProviderJSON } from "../value-provider";

export type IComponentInfosJSON = IRefComponentJSON | IComponentWithInputsJSON;

export interface IRefComponentJSON {
	ref: string;
}

export interface IComponentWithInputsJSON {
	id: number;
	inputs?: { [key: string]: IValueProviderJSON<any> }
}
