import { Distance } from "../size";

export class PositionInsideHost {
	constructor(
		public vertical: AxisPosition,
		public horizontal: AxisPosition
	) {
	}
}

export class MainLayerPositionInsideHost {
	constructor(
		public vertical: MainLayerAxisPosition,
		public horizontal: MainLayerAxisPosition
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

export type MainLayerAxisPosition = AxisPositionFromStart | AxisPositionFromEnd |
	AxisPositionFromStartAndEnd | { size?: Distance };