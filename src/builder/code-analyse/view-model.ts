import { VIEW_MODELS, VIEW_DATA } from "../../app/components";
import { IViewModelInterface, Property } from "../entities/data/view-model";
import { IMockDataSource } from "../entities/data/mock-data-source";

export class ViewModelParsing {
	static getViewModel(viewModelJSON: any): IViewModelInterface | undefined {
		if (!viewModelJSON) {
			return undefined;
		}
		const res = new ViewModelInterface();
		for (const propertyName in viewModelJSON.properties) {
			res.properties.push({
				name: propertyName,
				type: viewModelJSON.properties[propertyName]
			});
		}
		for (const inputName in viewModelJSON.inputs) {
			res.inputs.push({
				name: inputName,
				type: viewModelJSON.inputs[inputName]
			});
		}
		return res;
	}

	static getMockData(mockJSON: any): IMockDataSource | undefined {
		if (!mockJSON) {
			return undefined;
		}
		const res: IMockDataSource = {
			properties: []
		};
		for (const prop in mockJSON) {
			const data = mockJSON[prop];
			res.properties.push({
				name: prop,
				values: data.values,
				loop: data.loop
			});
		}
		return res;
	}
}

class ViewModelInterface implements IViewModelInterface {
	properties: Property[] = [];
	inputs: Property[] = [];

	getProperty(name: string): Property | undefined {
		return this.properties.find(p => p.name === name);
	}
}
