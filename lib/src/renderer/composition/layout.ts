import { LayoutComposition, LayoutCompositionChild, LayoutCompositionStaticChild, IfLayoutCompositionChild } from "../../parser/entities/composition/layout";
import { DynamicViewModel } from "../view-model/dynamic-view-model";
import { IBaseRenderer2 } from "../interfaces/base-renderer2";
import { IViewInserter } from "../interfaces/view-inserter";
import { IComponentRenderer2 } from "../interfaces/component-renderer2";
import { LayoutRenderer } from "../layout";
import { LayoutView, LayoutChild, IfLayoutChild } from "../../parser/entities/layout";
import { ViewComposition } from "../../parser/entities/view-composition";
import { Component } from "../../parser/entities/component";

export class LayoutCompositionRenderer implements IBaseRenderer2<ViewComposition<LayoutComposition>> {

	private _layoutRenderer: LayoutRenderer;

	constructor(componentRenderer: IComponentRenderer2) {
		this._layoutRenderer = new LayoutRenderer(componentRenderer);
	}

	build(view: ViewComposition<LayoutComposition>, inserter: IViewInserter, viewModel?: DynamicViewModel): void {
		const layout = resolveComposition(view);
		this._layoutRenderer.build(layout, inserter, viewModel);
	}
}

function resolveComposition(data: ViewComposition<LayoutComposition>): LayoutView {
	const res = new LayoutView(data.host.view.direction);
	for (const child of data.host.view.children) {
		if (child instanceof LayoutCompositionStaticChild) {
			let layoutChild = getLayoutStaticChild(child, data.refs);
			res.children.push(layoutChild);
		} else if (child instanceof IfLayoutCompositionChild) {
			let layoutChild = getIfLayoutChild(child, data.refs);
			res.children.push(layoutChild);
		}
	}
	return res;
}

function resolveComponent(componentInfos: string | Component<any>, refs: { [ref: string]: Component<any> }): Component<any> {
	let childComponent: Component<any>;
	if (typeof componentInfos === 'string') {
		childComponent = refs[componentInfos];
	} else {
		childComponent = componentInfos;
	}
	return childComponent;
}

function getLayoutStaticChild(data: LayoutCompositionStaticChild, refs: { [ref: string]: Component<any> }): LayoutChild {
	const res = new LayoutChild(data.size);
	res.component = resolveComponent(data.component, refs);
	return res;
}


function getIfLayoutChild(data: IfLayoutCompositionChild, refs: { [ref: string]: Component<any> }): IfLayoutChild {
	const child = getLayoutStaticChild(data.child, refs);
	const condition = data.condition;
	const res = new IfLayoutChild(condition, child);
	return res;
}
