import { IIconWFViewJSON } from "../../interfaces/icon-wf";
import { IconWFView } from "../../entities/controls/wireframe/icon";
import { parseValueProvider } from "../value-provider";

export const iconWFParser = (viewJSON: IIconWFViewJSON): IconWFView => {
	const res = new IconWFView();
	if (!viewJSON) return res;
	if (viewJSON.iconName !== undefined) {
		res.iconNameIndex = parseValueProvider(viewJSON.iconName);
	}
	if (viewJSON.style) {
		res.style.color = parseValueProvider(viewJSON.style.color);
		res.style.size = parseValueProvider(viewJSON.style.size);
	}
	return res;
};
