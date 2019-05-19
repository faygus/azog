import { ISizeJSON } from "../../lib/src/parser/interfaces/container";
import { ILabelWFViewJSON, Component } from "../../lib";
import { ILayoutJSON } from "../../lib/src/parser/interfaces/layout/layout";
import { Size } from "../../lib/src/parser/entities/size";
import { labelWFParser } from "../../lib/src/parser/code-analyse/parsers/label-wf";
import { ParsingUtils } from "../../lib/src/parser/code-analyse/utils";
import { ViewComposition } from "../../lib/src/parser/entities/view-composition";
import { IViewCompositionJSON } from "../../lib/src/parser/interfaces/view-composition";
import { ILayoutCompositionJSON } from "../../lib/src/parser/interfaces/layout/layout-composition";
import { layoutCompositionParser } from "../../lib/src/parser/code-analyse/parsers/composition/layout";
import { TestTools } from "../manual-tests/tools/tools";
import { viewCompositionParser } from "../../lib/src/parser/code-analyse/parsers/composition/view-composition";
import { GetView } from "../../lib/src/parser/code-analyse/parsers/type";
import { ViewCompositionRenderer } from "../../lib/src/renderer/composition/view-composition";

/**
 * Try to represent a component which can host other components
 * with content projection
 */

export function run(): void {
	const getView = TestTools.getMockViewProvider();
	const getHostComponent = getMockHostComponentProvider();
	const compositionView = viewCompositionParser(componentJSON, getView, getHostComponent);
	const componentRenderer = TestTools.getMockComponentRenderer2({
		1: 'red',
		2: 'green',
		3: 'blue'
	});
	const renderer = new ViewCompositionRenderer(componentRenderer);
	renderer.build(compositionView, TestTools.getRootViewInserter());
}

const layoutJSON: ILayoutCompositionJSON = {
	direction: 'column',
	children: [
		{
			size: 100,
			componentInfos: {
				ref: 'header'
			}
		},
		{
			size: 50,
			componentInfos: {
				id: 1
			}
		},
		{
			size: 300,
			componentInfos: {
				ref: 'content'
			}
		},
	]
};

const componentJSON: IViewCompositionJSON = {
	hostId: 1,
	children: {
		'header': 2,
		'content': 3
	}
};

function getMockHostComponentProvider(): GetView {
	const getView = TestTools.getMockViewProvider();
	return (id: number) => {
		const view = layoutCompositionParser(layoutJSON, getView);
		const res = new Component(view);
		return res;
	};
}
