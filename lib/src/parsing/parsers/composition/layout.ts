import { LayoutParent, LayoutParentChild, LayoutParentStaticChild, IfLayoutParentChild } from "../../../entities/composition/layout";
import { IfLayoutCompositionChildJSON, ILayoutCompositionStaticChildJSON, ILayoutCompositionJSON, LayoutCompositionChildJSON } from "../../../interfaces/layout/layout-composition";
import { ParsingUtils } from "../../utils";
import { GetView } from "../type";
import { parseValueProvider } from "../../value-provider";

export const layoutCompositionParser = (viewJSON: ILayoutCompositionJSON, getView: GetView): LayoutParent => {
	const res = new LayoutParent(viewJSON.direction);
	for (const childJSON of viewJSON.children) {
		let child: LayoutParentChild | undefined = undefined;
		if (isStaticChildJSON(childJSON)) {
			child = parseStaticChild(childJSON, getView);
		} else if (isIfChildJSON(childJSON)) {
			const staticChild = parseStaticChild(childJSON.host, getView);
			const condition = parseValueProvider(childJSON.if);
			child = new IfLayoutParentChild(condition, staticChild);
		}
		if (child) {
			res.children.push(child);
		}
	}
	return res;
};

function isStaticChildJSON(data: LayoutCompositionChildJSON): data is ILayoutCompositionStaticChildJSON {
	return (<ILayoutCompositionStaticChildJSON>data).componentInfos !== undefined;
}

function isIfChildJSON(data: LayoutCompositionChildJSON): data is IfLayoutCompositionChildJSON {
	return (<IfLayoutCompositionChildJSON>data).if !== undefined;
}

function parseStaticChild(childJSON: ILayoutCompositionStaticChildJSON, getView: GetView): LayoutParentStaticChild {
	const size = ParsingUtils.getSize(childJSON.size);
	let componentInfos;
	if ((<any>childJSON.componentInfos).ref !== undefined) {
		componentInfos = (<any>childJSON.componentInfos).ref;
	} else {
		const id = (<any>childJSON.componentInfos).id;
		componentInfos = getView(id);
	}
	return new LayoutParentStaticChild(size, componentInfos);
}
