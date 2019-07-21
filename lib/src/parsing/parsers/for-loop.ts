import { ControlParser, GetView } from "./type";
import { IForLoopJSON } from "../../interfaces/for-loop";
import { ForLoopView, ComponentTemplate } from "../../models/views/for-loop";
import { parseValueProvider } from "../value-provider";
import { ExtensibleContainer } from "../../models/views/layout-composition";
import { ParsingUtils } from "../utils";

export const forLoopParser: ControlParser = (viewJSON: IForLoopJSON, getView: GetView): ForLoopView => {
	const valueProvider = parseValueProvider(viewJSON.array);
	const component = getView(viewJSON.template.componentId);
	for (const inputName in viewJSON.template.inputs) {
		const valueProviderJSON = viewJSON.template.inputs[inputName];
		component.inputs[inputName] = parseValueProvider(valueProviderJSON);
	}
	const template = new ComponentTemplate(component);
	const size = ParsingUtils.getSize(viewJSON.container.size);
	// TODO the container could be anything
	const container = new ExtensibleContainer(viewJSON.container.direction, viewJSON.container.margin, size);
	const res = new ForLoopView(valueProvider, template, container);
	return res;
}
