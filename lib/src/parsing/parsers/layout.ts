import { IfLayoutChild, ILayoutChild, LayoutChild, LayoutView } from "../../entities/layouts/layout";
import { IfLayoutChildJSON, ILayoutChildJSON, ILayoutJSON, LayoutChildJSON } from "../../interfaces/layout/layout";
import { ParsingUtils } from "../utils";
import { getChildComponent } from "../utils/get-child";
import { parseValueProvider } from "../value-provider";
import { ControlParser, GetView } from "./type";

export const layoutParser: ControlParser = (componentJSON: ILayoutJSON, getView: GetView): LayoutView => {
	const res = new LayoutView(componentJSON.direction);
	for (const childJSON of componentJSON.children) {
		let child: ILayoutChild;
		if (isIfChild(childJSON)) {
			const condition = parseValueProvider(childJSON.if);
			const subChild = parseChild(childJSON.host, getView);
			child = new IfLayoutChild(condition, subChild);
		} else {
			const staticChildJSON = <ILayoutChildJSON>childJSON;
			child = parseChild(staticChildJSON, getView);
		}
		res.children.push(child);
	}
	return res;
}

function parseChild(data: ILayoutChildJSON, getView: GetView): LayoutChild {
	const size = ParsingUtils.getSize(data.size);
	const res = new LayoutChild(size);
	if (data.componentInfos) {
		const child = getChildComponent(data.componentInfos, getView);
		res.component = child;
	}
	return res;
}

function isIfChild(data: LayoutChildJSON): data is IfLayoutChildJSON {
	return (<IfLayoutChildJSON>data).if !== undefined;
}
