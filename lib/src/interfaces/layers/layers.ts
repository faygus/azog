import { IMainLayerPositionInsideHostJSON, IPositionInsideHostJSON } from "./position";
import { IComponentInfosJSON } from "../utils/component-infos";

export interface ILayersViewJSON {
	mainLayer?: IMainLayerViewJSON; // the main layer gives its dimension if the host doesn't have one
	subLayers: ILayerViewJSON[];
}

export interface ILayerViewJSON {
	zIndex: number;
	positionInsideHost?: IPositionInsideHostJSON;
	componentInfos: IComponentInfosJSON
}

export interface IMainLayerViewJSON {
	zIndex: number;
	positionInsideHost?: IMainLayerPositionInsideHostJSON;
	componentInfos: IComponentInfosJSON
}
