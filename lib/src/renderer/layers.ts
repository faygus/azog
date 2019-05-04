import { LayersView } from "../parser/entities/layers";
import { DynamicViewModel } from "./dynamic-view-model";
import { IComponentRenderer2 } from "./interfaces/component-renderer2";
import { IParentView } from "./interfaces/parent-view";
import { IViewInserter } from "./interfaces/view-inserter";
import { IBaseRenderer2 } from "./interfaces/base-renderer2";

export class LayersRenderer implements IBaseRenderer2<LayersView> {
	constructor(private _componentBuilder: IComponentRenderer2) { }

	build(view: LayersView, parentView: IParentView, viewModel?: DynamicViewModel): void {
		// mainLayer
		const mainLayer = view.mainLayer!;
		const referenceZIndex = mainLayer.zIndex;
		parentView.setPadding(mainLayer.positioner.padding);
		const inserter: IParentView = {
			add: (childHtml: HTMLElement) => {
				childHtml.style.zIndex = '0';
				childHtml.style.height = '100%';
				parentView.add(childHtml);
			},
			clear: () => {
				parentView.clear();
			},
			setPadding: (value: number) => {

			}
		};
		this._componentBuilder.build(mainLayer.child, inserter, viewModel);

		// SubLayers
		for (const layer of view.children) {
			const inserter: IParentView = {
				add: (childHtml: HTMLElement) => {
					const padding = layer.positioner.padding + 'px';
					childHtml.style.zIndex = layer.zIndex - referenceZIndex + '';
					childHtml.style.position = 'absolute';
					childHtml.style.top = padding;
					childHtml.style.bottom = padding;
					childHtml.style.left = padding;
					childHtml.style.right = padding;
					parentView.add(childHtml);
				},
				clear: () => {
					parentView.clear();
				},
				setPadding: (value: number) => {
	
				}
			};
			this._componentBuilder.build(layer.child, inserter, viewModel);
		}
	}
}
