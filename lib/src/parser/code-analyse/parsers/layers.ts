import { AxisPosition, IRelativeSpace, LayersView, LayerView, PositionInsideHost, MainLayerView, MainLayerPositionInsideHost, AxisPositionFromStartAndEnd, MainLayerAxisPosition } from "../../entities/layers";
import { IDistanceJSON } from "../../interfaces/container";
import { IAxisPositionJSON, ILayersViewJSON, ILayerViewJSON, IRelativeSpaceJSON, IMainLayerViewJSON, IMainLayerPositionInsideHostJSON, IMainLayerAxisPositionJSON } from "../../interfaces/layers/layers";
import { ParsingUtils } from "../utils";
import { GetView } from "./type";

export const layersParser = (viewJSON: ILayersViewJSON, getView: GetView): LayersView => {
	const res = new LayersView();
	const mainLayer = processMainLayer(viewJSON.mainLayer, getView);
	res.mainLayer = mainLayer;
	for (const child of viewJSON.subLayers) {
		const layer = processLayer(child, getView);
		res.children.push(layer);
	}
	return res;
}

function processLayer(layerJSON: ILayerViewJSON, getView: GetView): LayerView {
	const verticalPosition = parseAxisPosition(layerJSON.positionInsideHost.vertical);
	const horizontalPosition = parseAxisPosition(layerJSON.positionInsideHost.horizontal);
	const positionner = new PositionInsideHost(verticalPosition, horizontalPosition);

	const layer = new LayerView(layerJSON.zIndex, positionner);
	layer.child = getView(layerJSON.component.componentId);
	return layer;
}

function parseAxisPosition(positionJSON: IAxisPositionJSON): AxisPosition {
	let res: AxisPosition = <any>{};
	const pos = <any>positionJSON;
	if (pos.start !== undefined && pos.end !== undefined) {
		const startDistance = ParsingUtils.getDistance(pos.start);
		const endDistance = ParsingUtils.getDistance(pos.end);
		(<any>res).start = startDistance;
		(<any>res).end = endDistance;
	} else {
		for (const prop in positionJSON) {
			if (prop === 'center' || prop === 'start' || prop === 'end') {
				const value: IRelativeSpaceJSON = (<any>positionJSON)[prop];
				const space = ParsingUtils.getDistance(value.space);
				const relativeSpace: IRelativeSpace = {
					relativeTo: value.relativeTo,
					space
				};
				(<any>res)[prop] = relativeSpace;
			} else if (prop === 'size') {
				const value: IDistanceJSON = (<any>positionJSON)['size'];
				const size = ParsingUtils.getDistance(value);
				(<any>res).size = size;
			}
		}
	}
	return res;
}

function processMainLayer(layerJSON: IMainLayerViewJSON, getView: GetView): MainLayerView {
	const verticalPosition = parseMainLayerAxisPosition(layerJSON.positionInsideHost.vertical);
	const horizontalPosition = parseMainLayerAxisPosition(layerJSON.positionInsideHost.horizontal);
	const positionner = new MainLayerPositionInsideHost(verticalPosition, horizontalPosition);

	const layer = new MainLayerView(layerJSON.zIndex, positionner);
	layer.child = getView(layerJSON.component.componentId);
	return layer;
}

function parseMainLayerAxisPosition(positionJSON: IMainLayerAxisPositionJSON): MainLayerAxisPosition {
	let res: MainLayerAxisPosition = <any>{};
	const pos = <any>positionJSON;
	if (pos.start !== undefined && pos.end !== undefined) {
		(<any>res).start = ParsingUtils.getDistance(pos.start);
		(<any>res).end = ParsingUtils.getDistance(pos.end);
	} else {
		for (const prop in positionJSON) {
			if (prop === 'start' || prop === 'end') {
				const value: IRelativeSpaceJSON = (<any>positionJSON)[prop];
				const space = ParsingUtils.getDistance(value.space);
				const relativeSpace: IRelativeSpace = {
					relativeTo: value.relativeTo,
					space
				};
				(<any>res)[prop] = relativeSpace;
			} else if (prop === 'size') {
				const value: IDistanceJSON = (<any>positionJSON)['size'];
				const size = ParsingUtils.getDistance(value);
				(<any>res).size = size;
			}
		}
	}
	return res;
}
