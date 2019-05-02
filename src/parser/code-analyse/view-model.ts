import { VIEW_MODELS, VIEW_DATA } from "../../json/components";
import { IViewModelInterface, Property } from "../entities/data/view-model";
import { IMockDataSource } from "../entities/data/mock-data-source";
import { IViewModelInterfaceJSON } from "../interfaces/view-model";
import { IMockViewModelJSON } from "../interfaces/mock-view-model";

export class ViewModelParsing {
	static getViewModel(viewModelInterfaceJSON: IViewModelInterfaceJSON): IViewModelInterface {
		const res = new ViewModelInterface();
		for (const propertyName in viewModelInterfaceJSON.properties) {
			res.properties.push({
				name: propertyName,
				type: viewModelInterfaceJSON.properties[propertyName]
			});
		}
		for (const inputName in viewModelInterfaceJSON.inputs) {
			res.inputs.push({
				name: inputName,
				type: viewModelInterfaceJSON.inputs[inputName]
			});
		}
		return res;
	}

	static getMockData(mockJSON: IMockViewModelJSON): IMockDataSource {
		const res: IMockDataSource = {
			properties: []
		};
		for (const prop in mockJSON) {
			const data = mockJSON[prop];
			res.properties.push({
				name: prop,
				values: data.values,
				loop: (data.loop !== undefined) ? data.loop : false
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
