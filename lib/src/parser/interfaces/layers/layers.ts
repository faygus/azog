import { IComponentInfosJSON } from "../utils/component-infos";
import { IMainLayerPositionInsideHostJSON, IPositionInsideHostJSON } from "./position";

export interface ILayersViewJSON {
	mainLayer: IMainLayerViewJSON; // the main layer gives its dimension if the host doesn't have one
	subLayers: ILayerViewJSON[];
}

export interface ILayerViewJSON {
	zIndex: number;
	positionInsideHost: IPositionInsideHostJSON;
	component: IComponentInfosJSON
}

export interface IMainLayerViewJSON {
	zIndex: number;
	positionInsideHost: IMainLayerPositionInsideHostJSON;
	component: IComponentInfosJSON
}
