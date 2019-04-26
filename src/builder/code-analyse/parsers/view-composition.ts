import { GetView } from "./type";
import { ViewComposition2 } from "../../entities/view-composition";
import { IViewCompositionJSON } from "../../interfaces/view-composition";

export const viewCompositionParser = (componentJSON: IViewCompositionJSON, getView: GetView): ViewComposition2 => {
	const parentView = getView(componentJSON.parentView);
	const res = new ViewComposition2(parentView);
	for (const child of componentJSON.children) {
		const childComponent = getView(child.id);
		res.children.push(childComponent);
	}
	return res;
};
