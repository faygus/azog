export interface IViewModelInterfaceJSON {
	properties: { [key: string]: typeJSON };
	inputs?: { [key: string]: typeJSON };
}

type typeJSON = 'string' | 'boolean' | 'number';
