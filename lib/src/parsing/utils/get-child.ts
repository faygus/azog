import { IComponentInfosJSON } from "../../interfaces/utils/component-infos";
import { GetView } from "../parsers/type";
import { IComponentInfos } from "../../entities/composition/i-component-infos";
import { isRefComponentJSON } from "./component-infos-cast";

export function getChildComponent(childJSON: IComponentInfosJSON, getView: GetView): IComponentInfos {
	let res: IComponentInfos;
	if (isRefComponentJSON(childJSON)) {
		res = childJSON.ref;
	} else {
		res = getView(childJSON.id);
		/*childJSON.inputs
		res.inputs*/ // TODO add inputs
	}
	return res;
}
