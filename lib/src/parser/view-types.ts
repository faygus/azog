import { IForLoopJSON } from "./interfaces/for-loop";
import { IIconWFViewJSON } from "./interfaces/icon-wf";
import { IConditionalViewJSON } from "./interfaces/if";
import { IImageViewJSON } from "./interfaces/image";
import { ILabelWFViewJSON } from "./interfaces/label-wf";
import { ILayersViewJSON } from "./interfaces/layers";
import { ILayoutJSON } from "./interfaces/layout/layout";
import { IRouterViewJSON } from "./interfaces/router";
import { IUniColorWFViewJSON } from "./interfaces/uni-color-wf";

export enum ViewType {
	LABEL_WF = 'labelWF',
	ICON_WF = 'iconWF',
	UNI_COLOR_WF = 'uniColorWF',
	LAYERS = 'layers',
	ROUTER = 'router',
	FOR_LOOP = 'forLoop',
	LAYOUT = 'layout',
	IMAGE = 'image',
	IF = 'if'
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
	'if': IConditionalViewJSON
	// ... TODO
}
