import { LayersView } from "../../entities/layers/layers";
import { LayersParentView } from "../../entities/layers/layers-parent";
import { ViewComposition } from "../../entities/view-composition";
import { IBaseRenderer2 } from "../interfaces/base-renderer2";
import { IComponentRenderer2 } from "../interfaces/component-renderer2";
import { IParentView } from "../interfaces/parent-view";
import { LayersRenderer } from "../layers/layers";
import { DynamicViewModel } from "../view-model/dynamic-view-model";
import { resolveComponent } from "./component-resolver";

export class LayersParentRenderer implements IBaseRenderer2<ViewComposition<LayersParentView>> {

	private _renderer: LayersRenderer;

	constructor(componentRenderer: IComponentRenderer2) {
		this._renderer = new LayersRenderer(componentRenderer);
	}

	build(view: ViewComposition<LayersParentView>, parentView: IParentView, viewModel?: DynamicViewModel): void {
		console.log('LayersParentRenderer.build', view);
		const layers = resolveComposition(view);
		this._renderer.build(layers, parentView, viewModel);
	}
}

function resolveComposition(data: ViewComposition<LayersParentView>): LayersView {
	const view = data.host.view;
	let res: LayersView = <any>{};
	Object.assign(res, view);
	if (view.mainLayer) {
		const child = resolveComponent(view.mainLayer.child, data.refs);
		res.mainLayer!.child = child;
	}
	for (const layer of view.children) {
		layer.child = resolveComponent(layer.child, data.refs);
	}
	return res;
}
