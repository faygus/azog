import { ControlParser, GetView } from "./type";
import { IForLoopJSON } from "../../interfaces/for-loop";
import { ForLoopView, ComponentTemplate } from "../../entities/for-loop";
import { parseValueProvider } from "../value-provider";

export const forLoopParser: ControlParser = (viewJSON: IForLoopJSON, getView: GetView): ForLoopView => {
	const valueProvider = parseValueProvider(viewJSON.array);
	const component = getView(viewJSON.template.componentId);
	const template = new ComponentTemplate(component);
	const container = viewJSON.containerId; // TODO
	const res = new ForLoopView(valueProvider, template, container);
	return res;
}
