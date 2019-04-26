export interface IViewCompositionJSON {
	parentView: number;
	children: { id: number }[];
}

export interface IViewCompositionDeclaration {
	type: 'viewComposition';
	value: IViewCompositionJSON;
}
