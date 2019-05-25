import { IfLayoutParentChild, LayoutParent, LayoutParentStaticChild } from "../../entities/composition/layout";
import { IfLayoutChild, LayoutChild, LayoutView } from "../../entities/layout";
import { IComponentRefs, ViewComposition } from "../../entities/view-composition";
import { IBaseRenderer2 } from "../interfaces/base-renderer2";
import { IComponentRenderer2 } from "../interfaces/component-renderer2";
import { IViewInserter } from "../interfaces/view-inserter";
import { LayoutRenderer } from "../layout";
import { DynamicViewModel } from "../view-model/dynamic-view-model";
import { resolveComponent } from "./component-resolver";

export class LayoutParentRenderer implements IBaseRenderer2<ViewComposition<LayoutParent>> {

	private _layoutRenderer: LayoutRenderer;

	constructor(componentRenderer: IComponentRenderer2) {
		this._layoutRenderer = new LayoutRenderer(componentRenderer);
	}

	build(view: ViewComposition<LayoutParent>, inserter: IViewInserter, viewModel?: DynamicViewModel): void {
		const layout = resolveComposition(view);
		this._layoutRenderer.build(layout, inserter, viewModel);
	}
}

function resolveComposition(data: ViewComposition<LayoutParent>): LayoutView {
	const res = new LayoutView(data.host.view.direction);
	for (const child of data.host.view.children) {
		if (child instanceof LayoutParentStaticChild) {
			let layoutChild = getStaticChild(child, data.refs);
			res.children.push(layoutChild);
		} else if (child instanceof IfLayoutParentChild) {
			let layoutChild = getIfChild(child, data.refs);
			res.children.push(layoutChild);
		}
	}
	return res;
}

function getStaticChild(data: LayoutParentStaticChild, refs: IComponentRefs): LayoutChild {
	const res = new LayoutChild(data.size);
	res.component = resolveComponent(data.component, refs);
	return res;
}


function getIfChild(data: IfLayoutParentChild, refs: IComponentRefs): IfLayoutChild {
	const child = getStaticChild(data.child, refs);
	const condition = data.condition;
	const res = new IfLayoutChild(condition, child);
	return res;
}
