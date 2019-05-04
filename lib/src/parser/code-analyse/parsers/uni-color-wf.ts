import { UniColorWFView } from "../../entities/controls/wireframe/uniColor";
import { IUniColorWFViewJSON } from "../../interfaces/uni-color-wf";
import { parseValueProvider } from "../value-provider";

export const uniColorWFParser = (viewJSON: IUniColorWFViewJSON): UniColorWFView => {
	const res = new UniColorWFView();
	if (viewJSON.color !== undefined) {
		res.color = parseValueProvider(viewJSON.color);
	}
	return res;
};
