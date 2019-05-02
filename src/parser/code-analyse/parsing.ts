import { VIEWS, VIEW_MODELS, VIEW_DATA } from "../../json/components";
import { LabelView } from "../entities/controls/label";
import { IconView } from "../entities/controls/icon";
import { ViewModelParsing } from "./view-model";
import { Component } from "../entities/component";
import { BaseParsing } from "./base-parsing";
import { parseValueProvider } from "./value-provider";

/**
 * parse real components (and not wireframe components)
 */
export class Parsing extends BaseParsing {

	constructor() {
		const views = {
			get: (id: number) => {
				return (<any>VIEWS)[id];
			}
		};
		const viewModels = {
			get: (id: number) => {
				return (<any>VIEW_MODELS)[id];
			}
		};
		const viewMockData = {
			get: (id: number) => {
				return (<any>VIEW_DATA)[id];
			}
		}
		super({ views, viewModels, viewMockData });
	}
}
