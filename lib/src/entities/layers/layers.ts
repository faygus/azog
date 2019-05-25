import { MainLayerPositionInsideHost, PositionInsideHost } from "./position";
import { IComponentInfos } from "../composition/i-component-infos";

export class LayersView {
	mainLayer?: MainLayerView;
	children: LayerView[] = [];
}

export class LayerView {
	child: IComponentInfos;
	zIndex: number;
	positioner: PositionInsideHost;

	constructor(child: IComponentInfos, zIndex: number, positioner: PositionInsideHost) {
		this.child = child;
		this.zIndex = zIndex;
		this.positioner = positioner;
	}
}

export class MainLayerView {
	child: IComponentInfos;
	zIndex: number;
	positioner: MainLayerPositionInsideHost;

	constructor(child: IComponentInfos, zIndex: number, positioner: MainLayerPositionInsideHost) {
		this.child = child;
		this.zIndex = zIndex;
		this.positioner = positioner;
	}
}
