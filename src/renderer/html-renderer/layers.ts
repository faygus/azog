import { Layers } from "../../builder/entities/layers";
import { IComponentRenderer } from "./interfaces/component-renderer";
import { DynamicViewModel } from "../dynamic-view-model";
import { IParentView } from "./interfaces/parent-view";

export class LayersRenderer {
	constructor(private _componentBuilder: IComponentRenderer) { }

	show(layers: Layers, parentView: IParentView, viewModel?: DynamicViewModel): void {
		let mainLayerZIndex = layers.mainLayer ? layers.mainLayer.zIndex! : 0;
		for (const layer of layers.children) {
			const childHtml = this._componentBuilder.build(layer.child, viewModel);
			childHtml.style.zIndex = layer.zIndex! - mainLayerZIndex + '';
			const padding = layer.positioner.padding + 'px';
			if (layers.mainLayer !== layer) {
				childHtml.style.position = 'absolute';
				childHtml.style.top = padding;
				childHtml.style.bottom = padding;
				childHtml.style.left = padding;
				childHtml.style.right = padding;
			} else {
				// childHtml.style.width = '100%';
				// childHtml.style.height = '100%';
				parentView.setPadding(layer.positioner.padding);
			}
			parentView.add(childHtml);
		}
	}
}
