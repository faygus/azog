import { IDistanceJSON } from "./container";
import { IComponentWithInputsJSON } from "./utils/component-with-inputs";

export interface ILayersViewJSON {
	mainLayer: ILayerViewJSON; // the main layer gives its dimension if the host doesn't have one
	subLayers: ILayerViewJSON[];
}

export interface ILayerViewJSON {
	zIndex: number;
	positionInsideHost: IPositionInsideHostJSON;
	component: IComponentWithInputsJSON
}

export interface IPositionInsideHostJSON {
	vertical: IAxisPositionJSON;
	horizontal: IAxisPositionJSON;
}

export interface IRelativeSpaceJSON {
	relativeTo: 'start' | 'end';
	space: IDistanceJSON;
}

export type IAxisPositionJSON = {
	center: IRelativeSpaceJSON,
	size?: IDistanceJSON;
} | {
	start: IRelativeSpaceJSON,
	size?: IDistanceJSON;
} | {
	end: IRelativeSpaceJSON,
	size?: IDistanceJSON;
} | {
	start: IDistanceJSON,
	end: IDistanceJSON;
}