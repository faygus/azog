import { LayoutComposition } from "../../parser/entities/composition/layout";
import { ViewComposition } from "../../parser/entities/view-composition";
import { DynamicViewModel } from "../view-model/dynamic-view-model";
import { IBaseRenderer2 } from "../interfaces/base-renderer2";
import { IComponentRenderer2 } from "../interfaces/component-renderer2";
import { IViewInserter } from "../interfaces/view-inserter";
import { LayoutCompositionRenderer } from "./layout";

export class ViewCompositionRenderer implements IBaseRenderer2<ViewComposition<any>> {

	constructor(private _componentRenderer: IComponentRenderer2) {
	}

	build(view: ViewComposition<any>, inserter: IViewInserter, viewModel?: DynamicViewModel): void {
		if (view.host.view instanceof LayoutComposition) {
			const renderer = new LayoutCompositionRenderer(this._componentRenderer);
			renderer.build(view, inserter, viewModel);
		} else {
			console.error('can not render ViewComposition');
			// TODO
		}
	}
}
