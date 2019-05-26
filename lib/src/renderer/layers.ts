import { AxisPosition, AxisPositionFromCenter, AxisPositionFromEnd, AxisPositionFromStart, AxisPositionFromStartAndEnd, MainLayerPositionInsideHost, PositionInsideHost } from "../entities/layers/position";
import { convertDistanceForHtml } from "./converters/unit";
import { IBaseRenderer2 } from "./interfaces/base-renderer2";
import { IComponentRenderer2 } from "./interfaces/component-renderer2";
import { IParentView, Padding } from "./interfaces/parent-view";
import { DynamicViewModel } from "./view-model/dynamic-view-model";
import { isRefComponent } from "./utils/component-infos-cast";
import { LayersView } from "../entities/layers/layers";
import { buildViewModel } from "./utils/build-view-model";

export class LayersRenderer implements IBaseRenderer2<LayersView> {
	constructor(private _componentBuilder: IComponentRenderer2) { }

	build(view: LayersView, parentView: IParentView, viewModel?: DynamicViewModel): void {
		// mainLayer
		const mainLayer = view.mainLayer;
		const referenceZIndex = mainLayer ? mainLayer.zIndex : 0;
		if (mainLayer && !isRefComponent(mainLayer.child)) {
			this.setMainLayerPosition(mainLayer.positionner, parentView); // TODO
			const inserter: IParentView = {
				add: (childHtml: HTMLElement) => {
					childHtml.style.zIndex = '0';
					if ((<any>mainLayer.positionner.vertical).size) {
						childHtml.style.height = convertDistanceForHtml((<any>mainLayer.positionner.vertical).size);
					}
					if ((<any>mainLayer.positionner.horizontal).size) {
						childHtml.style.width = convertDistanceForHtml((<any>mainLayer.positionner.horizontal).size);
					}
					parentView.add(childHtml, false);
				},
				clear: () => {
					parentView.clear();
				},
				setPadding: (value: number) => {

				},
				centerContent: (horizontaly: boolean, verticaly: boolean) => {
					// TODO
					console.warn('centerContent not implemented');
				}
			};
			const childViewModel = buildViewModel(mainLayer.child, viewModel);
			this._componentBuilder.build(mainLayer.child, inserter, childViewModel);
		}

		// SubLayers
		for (const layer of view.children) {
			if (!isRefComponent(layer.child)) {
				const inserter: IParentView = {
					add: (childHtml: HTMLElement) => {
						childHtml.style.zIndex = layer.zIndex - referenceZIndex + '';
						childHtml.style.position = 'absolute';
						const positionStyle = this.setPosition(layer.positionner);
						Object.assign(childHtml.style, positionStyle);
						parentView.add(childHtml, false);
					},
					clear: () => {
						parentView.clear();
					},
					setPadding: (value: number) => {

					},
					centerContent: (horizontaly: boolean, verticaly: boolean) => {

					}
				};
				const childViewModel = buildViewModel(layer.child, viewModel);
				this._componentBuilder.build(layer.child, inserter, childViewModel);
			}
		}
	}

	/**
	 * return html style
	 */
	private setPosition(position: PositionInsideHost): any {
		let res: any = {};
		// horizontal
		const horizontalStyle = this.setAxisPosition(position.horizontal, 'left', 'right',
			'translateX', 'width');
		const verticalStyle = this.setAxisPosition(position.vertical, 'top', 'bottom',
			'translateY', 'height');
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

	private setMainLayerPosition(position: MainLayerPositionInsideHost, parentView: IParentView): void {
		let centerHorizontaly = false;
		let centerVerticaly = false;
		let padding: Padding = {
			top: '0px',
			right: '0px',
			bottom: '0px',
			left: '0px',
		};
		// horizontal
		let pos = <any>position.horizontal;
		if (pos.start === undefined && pos.end === undefined) {
			centerHorizontaly = true;
		} else {
			if (pos.start !== undefined) {
				padding.left = convertDistanceForHtml(pos.start);
			}
			if (pos.end !== undefined) {
				padding.right = convertDistanceForHtml(pos.end);
			}
		}
		// vertical
		pos = position.vertical;
		if (pos.start === undefined && pos.end === undefined) {
			centerVerticaly = true;
		} else {
			if (pos.start !== undefined) {
				padding.top = convertDistanceForHtml(pos.start);
			}
			if (pos.end !== undefined) {
				padding.bottom = convertDistanceForHtml(pos.end);
			}
		}
		parentView.centerContent(centerHorizontaly, centerVerticaly);
		parentView.setPadding(padding);
	}
}
