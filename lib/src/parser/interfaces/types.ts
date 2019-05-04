import { ILabelWFViewJSON } from "./label-wf";
import { IIconWFViewJSON } from "./icon-wf";
import { IUniColorWFViewJSON } from "./uni-color-wf";
import { ILayersViewJSON } from "./layers";
import { IRouterViewJSON } from "./router";

export enum ViewType {
	LABEL_WF = 'labelWF',
	ICON_WF = 'iconWF',
	UNI_COLOR_WF = 'uniColorWF',
	LAYERS = 'layers',
	ROUTER = 'router'
	// ... TODO
}

export interface ViewTypeMap {
	'labelWF': ILabelWFViewJSON;
	'iconWF': IIconWFViewJSON;
	'uniColorWF': IUniColorWFViewJSON;
	'layers': ILayersViewJSON;
	'router': IRouterViewJSON;
	// ... TODO
}
