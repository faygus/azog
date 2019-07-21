import { ComponentTemplate } from "../../models/views/for-loop";
import { ConditionalView } from "../../models/views/if";
import { IConditionalViewJSON } from "../../interfaces/if";
import { parseValueProvider } from "../value-provider";
import { ControlParser, GetView } from "./type";

export const conditionalViewParser: ControlParser = (viewJSON: IConditionalViewJSON, getView: GetView): ConditionalView => {
	const valueProvider = parseValueProvider(viewJSON.condition);
	const component = getView(viewJSON.template.componentId);
	const template = new ComponentTemplate(component);
	const res = new ConditionalView(valueProvider, template);
	return res;
}
