import { MainLayerPositionInsideHost, PositionInsideHost } from "./position";
import { IComponentInfos } from "../composition/i-component-infos";

export class BaseLayersView<T extends IComponentInfos> {
	mainLayer?: BaseMainLayerView<T>;
	children: BaseLayerView<T>[] = [];
}

export class BaseLayerView<T> {
	child: T;
	zIndex: number;
	positioner: PositionInsideHost;

	constructor(child: T, zIndex: number, positioner: PositionInsideHost) {
		this.child = child;
		this.zIndex = zIndex;
		this.positioner = positioner;
	}
}

export class BaseMainLayerView<T> {
	child: T;
	zIndex: number;
	positioner: MainLayerPositionInsideHost;

	constructor(child: T, zIndex: number, positioner: MainLayerPositionInsideHost) {
		this.child = child;
		this.zIndex = zIndex;
		this.positioner = positioner;
	}
}
