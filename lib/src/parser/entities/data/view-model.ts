export interface IViewModelInterface {
	properties: Property[];
	inputs: Property[];

	getProperty(name: string): Property | undefined;
}

export interface Property {
	name: string;
	type: string; // TODO
}
