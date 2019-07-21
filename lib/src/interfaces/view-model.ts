import { typeJSON } from "./type";

export interface IViewModelInterfaceJSON {
	properties: { [key: string]: typeJSON };
	inputs?: { [key: string]: typeJSON };
}
