import { ControlParser } from "./type";
import { IIconWFJSON } from "../../interfaces/iconWF";
import { IconWF } from "../../entities/controls/wireframe/icon";
import { parseValueProvider } from "../value-provider";

export const iconWFParser: ControlParser = (componentJSON: IIconWFJSON): IconWF => {
	const res = new IconWF();
	if (!componentJSON) return res;
	if (componentJSON.iconName) {
		res.iconName = parseValueProvider(componentJSON.iconName);
	}
	if (componentJSON.style) {
		res.style.color = parseValueProvider(componentJSON.style.color);
		res.style.size = parseValueProvider(componentJSON.style.size);
	}
	return res;
};
