import { ILabelWFViewJSON } from "./interfaces/label-wf";
import { IIconWFViewJSON } from "./interfaces/icon-wf";
import { IUniColorWFViewJSON } from "./interfaces/uni-color-wf";
import { ILayersViewJSON } from "./interfaces/layers";
import { IRouterViewJSON } from "./interfaces/router";
import { IForLoopJSON } from "./interfaces/for-loop";
import { ILayoutJSON } from "./interfaces/layout";
import { IImageViewJSON } from "./interfaces/image";

export enum ViewType {
	LABEL_WF = 'labelWF',
	ICON_WF = 'iconWF',
	UNI_COLOR_WF = 'uniColorWF',
	LAYERS = 'layers',
	ROUTER = 'router',
	FOR_LOOP = 'forLoop',
	LAYOUT = 'layout',
	IMAGE = 'image'
	// ... TODO
}

export interface ViewTypeMap {
	'labelWF': ILabelWFViewJSON;
	'iconWF': IIconWFViewJSON;
	'uniColorWF': IUniColorWFViewJSON;
	'layers': ILayersViewJSON;
	'router': IRouterViewJSON;
	'forLoop': IForLoopJSON,
	'layout': ILayoutJSON,
	'image': IImageViewJSON,
	// ... TODO
}
