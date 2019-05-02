import { ControlParser, GetView } from "./type";
import { IForLoopJSON } from "../../interfaces/for-loop";
import { ForLoopView, ComponentTemplate } from "../../entities/for-loop";
import { parseValueProvider } from "../value-provider";

export const forLoopParser: ControlParser = (componentJSON: IForLoopJSON, getView: GetView): ForLoopView => {
	const valueProvider = parseValueProvider(componentJSON.array);
	const component = getView(componentJSON.template.componentId);
	const template = new ComponentTemplate(component);
	const container = componentJSON.containerId; // TODO
	const res = new ForLoopView(valueProvider, template, container);
	return res;
}
