import { GetView } from "./type";
import { LayersView, LayerView } from "../../entities/layers";
import { ILayersViewJSON, ILayerViewJSON } from "../../interfaces/layers";

export const layersParser = (viewJSON: ILayersViewJSON, getView: GetView): LayersView => {
	const res = new LayersView();
	const mainLayer = processLayer(viewJSON.mainLayer, getView);
	res.mainLayer = mainLayer;
	for (const child of viewJSON.subLayers) {
		const layer = processLayer(child, getView);
		res.children.push(layer);
	}
	return res;
}

function processLayer(layerJSON: ILayerViewJSON, getView: GetView): LayerView {
	const layer = new LayerView(layerJSON.zIndex);
	layer.positioner.padding = layerJSON.positionInsideHost.padding;
	layer.child = getView(layerJSON.component.componentId);
	return layer;
}
