import {
	AxisPosition, AxisPositionFromCenter, AxisPositionFromEnd,
	AxisPositionFromStart, AxisPositionFromStartAndEnd, LayersView,
	PositionInsideHost
} from "../parser/entities/layers";
import { convertDistanceForHtml } from "./converters/unit";
import { DynamicViewModel } from "./dynamic-view-model";
import { IBaseRenderer2 } from "./interfaces/base-renderer2";
import { IComponentRenderer2 } from "./interfaces/component-renderer2";
import { IParentView, Padding } from "./interfaces/parent-view";

export class LayersRenderer implements IBaseRenderer2<LayersView> {
	constructor(private _componentBuilder: IComponentRenderer2) { }

	build(view: LayersView, parentView: IParentView, viewModel?: DynamicViewModel): void {
		// mainLayer
		const mainLayer = view.mainLayer!;
		const referenceZIndex = mainLayer.zIndex;
		this.setMainLayerPosition(mainLayer.positioner, parentView); // TODO
		const inserter: IParentView = {
			add: (childHtml: HTMLElement) => {
				childHtml.style.zIndex = '0';
				if ((<any>mainLayer.positioner.vertical).size) {
					childHtml.style.height = convertDistanceForHtml((<any>mainLayer.positioner.vertical).size);
				} else {
					childHtml.style.height = '100%';
				}
				if ((<any>mainLayer.positioner.horizontal).size) {
					childHtml.style.width = convertDistanceForHtml((<any>mainLayer.positioner.horizontal).size);
				}
				parentView.add(childHtml);
			},
			clear: () => {
				parentView.clear();
			},
			setPadding: (value: number) => {

			},
			centerContent: (horizontaly: boolean, verticaly: boolean) => {

			}
		};
		this._componentBuilder.build(mainLayer.child, inserter, viewModel);

		// SubLayers
		for (const layer of view.children) {
			const inserter: IParentView = {
				add: (childHtml: HTMLElement) => {
					childHtml.style.zIndex = layer.zIndex - referenceZIndex + '';
					childHtml.style.position = 'absolute';
					const positionStyle = this.setPosition(layer.positioner);
					Object.assign(childHtml.style, positionStyle);
					parentView.add(childHtml);
				},
				clear: () => {
					parentView.clear();
				},
				setPadding: (value: number) => {

				},
				centerContent: (horizontaly: boolean, verticaly: boolean) => {

				}
			};
			this._componentBuilder.build(layer.child, inserter, viewModel);
		}
	}

	/**
	 * return html style
	 */
	private setPosition(position: PositionInsideHost): any {
		let res: any = {};
		// horizontal
		const horizontalStyle = this.setAxisPosition(position.horizontal, 'left', 'right',
			'transformX', 'width');
		const verticalStyle = this.setAxisPosition(position.vertical, 'top', 'bottom',
			'transformY', 'height');
		res = { ...horizontalStyle, ...verticalStyle };
		if (horizontalStyle.transform && verticalStyle.transform) {
			res.transform = horizontalStyle.transform + ' ' + verticalStyle.transform;
		}
		return res;
	}

	private setAxisPosition(axisPosition: AxisPosition, startAttr: string,
		endAttr: string, translateAttr: string, sizeAttr: string): any {
		const res: any = {};
		const pos = <any>(axisPosition);
		if (pos.center) {
			const value = <AxisPositionFromCenter>pos;
			const distanceHtml = convertDistanceForHtml(value.center.space);
			if (value.center.relativeTo === 'start') {
				res[startAttr] = distanceHtml;
				res['transform'] = `${translateAttr}(-50%)`;
			} else {
				res[endAttr] = distanceHtml;
				res['transform'] = `${translateAttr}(50%)`;
			}
			if (value.size !== undefined) {
				res[sizeAttr] = convertDistanceForHtml(value.size);
			}
		} else if (pos.start && pos.end) {
			const value = <AxisPositionFromStartAndEnd>pos;
			const startDistanceHtml = convertDistanceForHtml(value.start);
			const endDistanceHtml = convertDistanceForHtml(value.end);
			res[startAttr] = startDistanceHtml;
			res[endAttr] = endDistanceHtml;
		} else if (pos.start) {
			const value = <AxisPositionFromStart>pos;
			const startDistanceHtml = convertDistanceForHtml(value.start.space);
			if (value.start.relativeTo === 'start') {
				res[startAttr] = startDistanceHtml;
			} else {
				res[endAttr] = startDistanceHtml;
				res['transform'] = `${translateAttr}(100%)`;
			}
			if (value.size !== undefined) {
				res[sizeAttr] = convertDistanceForHtml(value.size);
			}
		} else if (pos.end) {
			const value = <AxisPositionFromEnd>pos;
			const endDistanceHtml = convertDistanceForHtml(value.end.space);
			if (value.end.relativeTo === 'start') {
				res[startAttr] = endDistanceHtml;
				res['transform'] = `${translateAttr}(-100%)`;
			} else {
				res[endAttr] = endDistanceHtml;
			}
			if (value.size !== undefined) {
				res[sizeAttr] = convertDistanceForHtml(value.size);
			}
		}
		return res;
	}

	private setMainLayerPosition(position: PositionInsideHost, parentView: IParentView): void {
		let centerHorizontaly = false;
		let centerVerticaly = false;
		// horizontal
		let padding: Padding = {
			top: '0px',
			right: '0px',
			bottom: '0px',
			left: '0px',
		};
		let pos = <any>(position.horizontal);
		if (pos.start !== undefined && pos.end !== undefined) {
			padding.left = convertDistanceForHtml(pos.start);
			padding.right = convertDistanceForHtml(pos.end);
		} else if (pos.center) {
			// by default center horizontally in the parent
			centerHorizontaly = true;
		}
		// TODO handle the other cases
		// vertical
		pos = <any>(position.vertical);
		if (pos.start !== undefined && pos.end !== undefined) {
			padding.top = convertDistanceForHtml(pos.start);
			padding.bottom = convertDistanceForHtml(pos.end);
		} else if (pos.center) {
			centerVerticaly = true;
		}
		// TODO handle the other cases
		parentView.centerContent(centerHorizontaly, centerVerticaly);
		parentView.setPadding(padding);
	}
}
