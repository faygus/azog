export interface ILayoutCompositionJSON {
	direction: 'row' | 'column';
	children: LayoutCompositionChildJSON[];
}

export type LayoutCompositionChildJSON = ILayoutCompositionStaticChildJSON | IfLayoutCompositionChildJSON;

import { ISizeJSON } from "../container";
import { IValueProviderJSON } from "../value-provider";

export interface ILayoutCompositionStaticChildJSON {
	size: ISizeJSON;
	componentInfos?: IComponentInfosJSON;
}

export interface IfLayoutCompositionChildJSON {
	if: IValueProviderJSON<boolean>;
	host: ILayoutCompositionStaticChildJSON;
}

export type IComponentInfosJSON = { ref: string } |
{
	id: number,
	inputs?: any
}
