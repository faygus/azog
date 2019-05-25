import { IForLoopJSON } from "../for-loop";
import { IIconWFViewJSON } from "../icon-wf";
import { IConditionalViewJSON } from "../if";
import { IImageViewJSON } from "../image";
import { ILabelWFViewJSON } from "../label-wf";
import { ILayersViewJSON } from "../layers/layers";
import { ILayoutJSON } from "../layout/layout";
import { IRouterViewJSON } from "../router";
import { IUniColorWFViewJSON } from "../uni-color-wf";
import { IViewDeclarationJSON } from "./view-declaration";

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

export type IViewAnyDeclarationJSON =
	IViewDeclarationJSON<'labelWF'> |
	IViewDeclarationJSON<'iconWF'> |
	IViewDeclarationJSON<'uniColorWF'> |
	IViewDeclarationJSON<'layers'> |
	IViewDeclarationJSON<'router'> |
	IViewDeclarationJSON<'forLoop'> |
	IViewDeclarationJSON<'layout'> |
	IViewDeclarationJSON<'image'> |
	IViewDeclarationJSON<'if'>;
// ... TODO
