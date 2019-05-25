export type IComponentInfosJSON = IRefComponentJSON | IComponentWithInputsJSON;

export interface IRefComponentJSON {
	ref: string;
}

export interface IComponentWithInputsJSON {
	id: number;
	inputs?: any;
}
