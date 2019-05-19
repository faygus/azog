import { ViewComposition } from "../../../entities/view-composition";
import { IViewCompositionJSON } from "../../../interfaces/view-composition";
import { GetView } from "../type";

export const viewCompositionParser = (viewJSON: IViewCompositionJSON, getView: GetView, getHostComponent: GetView): ViewComposition<any> => {
	const host = getHostComponent(viewJSON.hostId);
	const res = new ViewComposition(host);
	for (const ref in viewJSON.children) {
		const childComponentId = viewJSON.children[ref];
		const childComponent = getView(childComponentId);
		res.refs[ref] = childComponent;
	}
	return res;
};
