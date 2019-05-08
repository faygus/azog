import { Distance } from "./size";

export class LayersView {
	mainLayer?: LayerView;
	children: LayerView[] = [];
}

export class LayerView {
	child: any;

	constructor(public zIndex: number, public positioner: PositionInsideHost) {
	}
}

export class PositionInsideHost {
	constructor(
		public vertical: AxisPosition,
		public horizontal: AxisPosition
	) {
	}
}

export type AxisPosition = AxisPositionFromCenter | AxisPositionFromStart |
	AxisPositionFromEnd | AxisPositionFromStartAndEnd;

export interface IRelativeSpace {
	relativeTo: 'start' | 'end';
	space: Distance;
}

export type AxisPositionFromCenter = {
	center: IRelativeSpace,
	size?: Distance;
}

export type AxisPositionFromStart = {
	start: IRelativeSpace,
	size?: Distance;
}

export type AxisPositionFromEnd = {
	end: IRelativeSpace,
	size?: Distance;
}

export type AxisPositionFromStartAndEnd = {
	start: Distance,
	end: Distance
}
