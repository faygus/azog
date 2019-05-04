import { IValueProviderJSON } from "./value-provider";

export interface IContainerJSON {
	direction: 'row' | 'column';
	children: IContainerChildJSON[];
}

export interface IContainerDeclaration {
	type: 'layout2';
	value: IContainerJSON;
}

export interface IContainerChildJSON {
	spaceWithPrevious: number;
	size: ISizeJSON;
	directive?: IIfDirectiveJSON | 'repeat'
}

export interface IIfDirectiveJSON {
	name: 'if';
	data: {
		condition: IValueProviderJSON<boolean>
	};
}

type Unit = 'px' | '%';
export type IDistanceJSON = { value: number, unit: Unit };
export type ISizeJSON = number | IDistanceJSON | 'full' | 'auto';
