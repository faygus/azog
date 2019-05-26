import { MainLayerPositionInsideHost, PositionInsideHost } from "./position";
import { IComponentInfos } from "../composition/i-component-infos";
import { Unit } from "../unit";

export class LayersView {
	mainLayer?: MainLayerView;
	children: LayerView[] = [];
}

export class LayerView {
	child: IComponentInfos;
	zIndex: number;
	positionner: PositionInsideHost;

	constructor(child: IComponentInfos, zIndex: number, positionner?: PositionInsideHost) {
		this.child = child;
		this.zIndex = zIndex;
		this.positionner = positionner ? positionner : getDefaultPositionner();
	}
}

export class MainLayerView {
	child: IComponentInfos;
	zIndex: number;
	positionner: MainLayerPositionInsideHost;

	constructor(child: IComponentInfos, zIndex: number, positionner?: MainLayerPositionInsideHost) {
		this.child = child;
		this.zIndex = zIndex;
		if (positionner) {
			this.positionner = positionner;
		} else {
			this.positionner = getDefaultMainPositionner();
		}
	}
}

function getDefaultMainPositionner(): MainLayerPositionInsideHost {
	const vertical = {
		start: { value: 0, unit: Unit.PX },
		end: { value: 0, unit: Unit.PX }
	};
	const horizontal = {
		start: { value: 0, unit: Unit.PX },
		end: { value: 0, unit: Unit.PX }
	};
	const positionner = new MainLayerPositionInsideHost(vertical, horizontal);
	return positionner;
}

function getDefaultPositionner(): PositionInsideHost {
	const vertical = {
		start: { value: 0, unit: Unit.PX },
		end: { value: 0, unit: Unit.PX }
	};
	const horizontal = {
		start: { value: 0, unit: Unit.PX },
		end: { value: 0, unit: Unit.PX }
	};
	const positionner = new PositionInsideHost(vertical, horizontal);
	return positionner;
}
