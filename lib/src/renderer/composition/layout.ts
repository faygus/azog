import { IfLayoutChild, LayoutChild, LayoutView } from "../../models/views/layouts/layout";
import { IComponentRefs, ViewComposition } from "../../models/view-composition";
import { IBaseRenderer2 } from "../interfaces/base-renderer2";
import { IComponentRenderer2 } from "../interfaces/component-renderer2";
import { IViewInserter } from "../interfaces/view-inserter";
import { LayoutRenderer } from "../layout";
import { DynamicViewModel } from "../view-model/dynamic-view-model";
import { resolveComponent } from "./component-resolver";

export class LayoutParentRenderer implements IBaseRenderer2<ViewComposition<LayoutView>> {

	private _layoutRenderer: LayoutRenderer;

	constructor(componentRenderer: IComponentRenderer2) {
		this._layoutRenderer = new LayoutRenderer(componentRenderer);
	}

	build(view: ViewComposition<LayoutView>, inserter: IViewInserter, viewModel?: DynamicViewModel): void {
		const layout = resolveComposition(view);
		this._layoutRenderer.build(layout, inserter, viewModel);
	}
}

function resolveComposition(data: ViewComposition<LayoutView>): LayoutView {
	const res = new LayoutView(data.host.view.direction);
	for (const child of data.host.view.children) {
		if (child instanceof LayoutChild && child) {
			let layoutChild = getStaticChild(child, data.refs);
			res.children.push(layoutChild);
		} else if (child instanceof IfLayoutChild) {
			let layoutChild = getIfChild(child, data.refs);
			res.children.push(layoutChild);
		}
	}
	return res;
}

function getStaticChild(data: LayoutChild, refs: IComponentRefs): LayoutChild {
	const res = new LayoutChild(data.size);
	if (data.component) {
		res.component = resolveComponent(data.component, refs);
	}
	return res;
}


function getIfChild(data: IfLayoutChild, refs: IComponentRefs): IfLayoutChild {
	const child = getStaticChild(data.child, refs);
	const condition = data.condition;
	const res = new IfLayoutChild(condition, child);
	return res;
}
