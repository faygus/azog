import { parseValueProvider } from "../value-provider";
import { ILabelWFViewJSON } from "../../interfaces/label-wf";
import { LabelWFView } from "../../models/views/controls/wireframe/label";

export const labelWFParser = (viewJSON: ILabelWFViewJSON): LabelWFView => {
	const res = new LabelWFView();
	if (viewJSON && viewJSON.text !== undefined) {
		res.text = parseValueProvider(viewJSON.text);
		if (viewJSON.style) {
			if (viewJSON.style.color !== undefined) {
				res.style.color = parseValueProvider(viewJSON.style.color);
			}
			if (viewJSON.style.size !== undefined) {
				res.style.size = parseValueProvider(viewJSON.style.size);
			}
		}
	}
	return res;
};
