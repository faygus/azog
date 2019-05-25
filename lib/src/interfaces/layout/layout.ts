import { ISizeJSON } from "../container";
import { IValueProviderJSON } from "../value-provider";

export interface ILayoutJSON {
	direction: 'row' | 'column';
	children: LayoutChildJSON[];
}

type LayoutChildJSON = ILayoutChildJSON | IfLayoutChildJSON;

export interface ILayoutChildJSON {
	size: ISizeJSON;
	componentId?: number;
	inputs?: any; // TODO
}

export interface IfLayoutChildJSON {
	if: IValueProviderJSON<boolean>;
	host: ILayoutChildJSON;
}
