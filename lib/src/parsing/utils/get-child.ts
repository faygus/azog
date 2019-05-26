import { IComponentInfosJSON } from "../../interfaces/utils/component-infos";
import { GetView } from "../parsers/type";
import { IComponentInfos } from "../../entities/composition/i-component-infos";
import { isRefComponentJSON } from "./component-infos-cast";
import { parseValueProvider } from "../value-provider";

export function getChildComponent(childJSON: IComponentInfosJSON, getView: GetView): IComponentInfos {
	let res: IComponentInfos;
	if (isRefComponentJSON(childJSON)) {
		res = childJSON.ref;
	} else {
		res = getView(childJSON.id);
		if (childJSON.inputs) {
			for (const inputName in childJSON.inputs) {
				res.inputs[inputName] = parseValueProvider(childJSON.inputs[inputName]);
			}
		}
	}
	return res;
}
