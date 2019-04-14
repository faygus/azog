import { Component } from "../../entities/component";
import { WIREFRAME_VIEWS, VIEW_MODELS, VIEW_DATA } from "../../../app/components";
import { ViewModelParsing } from "../view-model";
import { BaseParsing } from "../base-parsing";
import { IconWF } from "../../entities/controls/wireframe/icon";
import { LabelWF } from "../../entities/controls/wireframe/label";
import { parseValueProvider } from "../value-provider";

export class WireframeParsing extends BaseParsing {

	constructor() {
		const views = {
			get: (id: number) => {
				return (<any>WIREFRAME_VIEWS)[id];
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
