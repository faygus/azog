import { LayoutParent } from "../../entities/composition/layout";
import { LayersParentView } from "../../entities/layers/layers-parent";
import { ViewComposition } from "../../entities/view-composition";
import { IBaseRenderer2 } from "../interfaces/base-renderer2";
import { IComponentRenderer2 } from "../interfaces/component-renderer2";
import { IViewInserter } from "../interfaces/view-inserter";
import { DynamicViewModel } from "../view-model/dynamic-view-model";
import { LayersParentRenderer } from "./layers";
import { LayoutParentRenderer } from "./layout";
import { IParentView } from "../interfaces/parent-view";

export class ViewCompositionRenderer implements IBaseRenderer2<ViewComposition<any>> {

	constructor(private _componentRenderer: IComponentRenderer2) {
	}

	build(view: ViewComposition<any>, inserter: IParentView, viewModel?: DynamicViewModel): void {
		const hostView = view.host.view;
		let renderer: IBaseRenderer2<any> | undefined;
		if (hostView instanceof LayoutParent) {
			renderer = new LayoutParentRenderer(this._componentRenderer);
		} else if (hostView instanceof LayersParentView) {
			renderer = new LayersParentRenderer(this._componentRenderer);
		}
		if (!renderer) {
			console.error('can not render ViewComposition');
			return;
		}
		renderer.build(view, inserter, viewModel);
	}
}
