import { LayoutView, LayoutChild, IfLayoutChild } from "../../entities/layout";
import { ILayoutJSON } from "../../interfaces/layout";
import { ParsingUtils } from "../utils";
import { ControlParser, GetView } from "./type";
import { IfLayoutChildJSON } from "../../interfaces/layout-child/if-host";
import { ILayoutChildJSON } from "../../interfaces/layout-child/layout-child";
import { parseValueProvider } from "../value-provider";

export const layoutParser: ControlParser = (componentJSON: ILayoutJSON, getView: GetView): LayoutView => {
	const res = new LayoutView(componentJSON.direction);
	for (const childJSON of componentJSON.children) {
		let child: LayoutChild | IfLayoutChild;
		if ((<IfLayoutChildJSON>childJSON).if !== undefined) {
			const ifChildJSON = <IfLayoutChildJSON>childJSON;
			const condition = parseValueProvider(ifChildJSON.if);
			const subChild = parseChild(ifChildJSON.host, getView);
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
	if (data.componentId !== undefined) {
		res.component = getView(data.componentId);
	}
	return res;
}
