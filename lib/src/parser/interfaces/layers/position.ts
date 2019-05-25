import { IDistanceJSON } from "../container";

export interface IPositionInsideHostJSON {
	vertical: IAxisPositionJSON;
	horizontal: IAxisPositionJSON;
}

export interface IRelativeSpaceJSON {
	relativeTo: 'start' | 'end';
	space: IDistanceJSON;
}

export type IAxisPositionJSON = {
	center: IRelativeSpaceJSON,
	size?: IDistanceJSON
} | {
	start: IRelativeSpaceJSON,
	size?: IDistanceJSON
} | {
	end: IRelativeSpaceJSON,
	size?: IDistanceJSON
} | {
	start: IDistanceJSON,
	end: IDistanceJSON
}

export interface IMainLayerPositionInsideHostJSON {
	vertical: IMainLayerAxisPositionJSON;
	horizontal: IMainLayerAxisPositionJSON;
}

export type IMainLayerAxisPositionJSON = {
	start: IDistanceJSON,
	end: IDistanceJSON
} | {
	start: IRelativeSpaceJSON,
	size?: IDistanceJSON
} | {
	end: IRelativeSpaceJSON,
	size?: IDistanceJSON
} | {
	size?: IDistanceJSON
}
