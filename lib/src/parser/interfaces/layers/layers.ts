import { IComponentWithInputsJSON } from "../utils/component-with-inputs";
import { IMainLayerPositionInsideHostJSON, IPositionInsideHostJSON } from "./position";

export interface ILayersViewJSON {
	mainLayer: IMainLayerViewJSON; // the main layer gives its dimension if the host doesn't have one
	subLayers: ILayerViewJSON[];
}

export interface ILayerViewJSON {
	zIndex: number;
	positionInsideHost: IPositionInsideHostJSON;
	component: IComponentWithInputsJSON
}

export interface IMainLayerViewJSON {
	zIndex: number;
	positionInsideHost: IMainLayerPositionInsideHostJSON;
	component: IComponentWithInputsJSON
}
