import { ControlParser } from "./type";
import { parseValueProvider } from "../value-provider";
import { ILabelWFJSON } from "../../interfaces/labelWF";
import { LabelWF } from "../../entities/controls/wireframe/label";

export const labelWFParser: ControlParser = (componentJSON: ILabelWFJSON): LabelWF => {
	const res = new LabelWF();
	if (componentJSON && componentJSON.text) {
		res.text = parseValueProvider(componentJSON.text);
		if (componentJSON.style) {
			if (componentJSON.style.color) {
				res.style.color = parseValueProvider(componentJSON.style.color);
			}
			if (componentJSON.style.size) {
				res.style.size = parseValueProvider(componentJSON.style.size);
			}
		}
	}
	return res;
};
