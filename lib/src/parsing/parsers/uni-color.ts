import { UniColorView } from "../../models/views/controls/uni-color";
import { IUniColorViewJSON } from "../../interfaces/controls/uni-color";
import { parseValueProvider } from "../value-provider";

export const uniColorParser = (viewJSON: IUniColorViewJSON): UniColorView => {
	const res = new UniColorView();
	if (viewJSON.color !== undefined) {
		res.color = parseValueProvider(viewJSON.color);
	}
	return res;
};
