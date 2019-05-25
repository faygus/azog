import { Component } from "../../lib";
import { ILayoutJSON } from "../../lib/src/interfaces/layout/layout";
import { IViewCompositionJSON } from "../../lib/src/interfaces/view-composition";
import { viewCompositionParser } from "../../lib/src/parsing/parsers/composition/view-composition";
import { layoutParser } from "../../lib/src/parsing/parsers/layout";
import { GetView } from "../../lib/src/parsing/parsers/type";
import { ViewCompositionRenderer } from "../../lib/src/renderer/composition/view-composition";
import { TestTools } from "../manual-tests/tools/tools";

/**
 * Try to represent a component which can host other components
 * with content projection
 */

export function run(): void {
	const getView = getMockComponentProvider();
	const compositionView = viewCompositionParser(componentJSON, getView);
	const componentRenderer = TestTools.getMockComponentRenderer2({
		2: 'green',
		3: 'blue'
	});
	const renderer = new ViewCompositionRenderer(componentRenderer);
	renderer.build(compositionView, TestTools.getRootViewInserter());
}


const componentJSON: IViewCompositionJSON = {
	hostId: 1,
	children: {
		'header': 2,
		'content': 3
	}
};

function getMockComponentProvider(): GetView {
	const layoutJSON: ILayoutJSON = {
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
	const getView = TestTools.getMockViewProvider();
	return (id: number) => {
		let res: Component<any>;
		if (id === 1) {
			const view = layoutParser(layoutJSON, getView);
			res = new Component(view);
		} else {
			res = getView(id);
		}
		return res;
	};
}
