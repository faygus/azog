import { LayersView } from "../../models/views/layers/layers";
import { LayoutView } from "../../models/views/layouts/layout";
import { ViewComposition } from "../../models/view-composition";
import { IBaseRenderer2 } from "../interfaces/base-renderer2";
import { IComponentRenderer2 } from "../interfaces/component-renderer2";
import { IParentView } from "../interfaces/parent-view";
import { DynamicViewModel } from "../view-model/dynamic-view-model";
import { LayersParentRenderer } from "./layers";
import { LayoutParentRenderer } from "./layout";

export class ViewCompositionRenderer implements IBaseRenderer2<ViewComposition<any>> {

	constructor(private _componentRenderer: IComponentRenderer2) {
	}

	build(view: ViewComposition<any>, inserter: IParentView, viewModel?: DynamicViewModel): void {
		const hostView = view.host.view;
		let renderer: IBaseRenderer2<any> | undefined;
		if (hostView instanceof LayoutView) {
			renderer = new LayoutParentRenderer(this._componentRenderer);
		} else if (hostView instanceof LayersView) {
			renderer = new LayersParentRenderer(this._componentRenderer);
		}
		if (!renderer) {
			return;
		}
		renderer.build(view, inserter, viewModel);
	}
}
