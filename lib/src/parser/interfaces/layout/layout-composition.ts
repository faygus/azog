import { ISizeJSON } from "../container";
import { IValueProviderJSON } from "../value-provider";
import { IComponentInfosJSON } from "../utils/component-infos";

export interface ILayoutCompositionJSON {
	direction: 'row' | 'column';
	children: LayoutCompositionChildJSON[];
}

export type LayoutCompositionChildJSON = ILayoutCompositionStaticChildJSON | IfLayoutCompositionChildJSON;

export interface ILayoutCompositionStaticChildJSON {
	size: ISizeJSON;
	componentInfos?: IComponentInfosJSON;
}

export interface IfLayoutCompositionChildJSON {
	if: IValueProviderJSON<boolean>;
	host: ILayoutCompositionStaticChildJSON;
}
