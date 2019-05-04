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
	padding: number; // TODO padding-top, padding-right, padding-bottom, padding-left
}
