import { ISizeJSON } from "../container";
import { IValueProviderJSON } from "../value-provider";
import { IComponentInfosJSON } from "../utils/component-infos";

export interface ILayoutJSON {
	direction: 'row' | 'column';
	children: LayoutChildJSON[];
}

export type LayoutChildJSON = ILayoutChildJSON | IfLayoutChildJSON;

export interface ILayoutChildJSON {
	size: ISizeJSON;
	componentInfos?: IComponentInfosJSON;
}

export interface IfLayoutChildJSON {
	if: IValueProviderJSON<boolean>;
	host: ILayoutChildJSON;
}
