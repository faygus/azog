import { ViewComposition } from "../../../entities/view-composition";
import { IViewCompositionJSON } from "../../../interfaces/view-composition";
import { getChildComponent } from "../../utils/get-child";
import { GetView } from "../type";

export const viewCompositionParser = (viewJSON: IViewCompositionJSON, getView: GetView): ViewComposition<any> => {
	const host = getView(viewJSON.hostId);
	const res = new ViewComposition(host);
	for (const ref in viewJSON.children) {
		const childComponentInfos = viewJSON.children[ref];
		res.refs[ref] = getChildComponent(childComponentInfos, getView);
	}
	return res;
};
