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


const componentJSON: IViewCompositionJSON = {
	hostId: 1,
	children: {
		'header': 2,
		'content': 3
	}
};

function getMockHostComponentProvider(): GetView {
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
		const view = layoutParser(layoutJSON, getView);
		const res = new Component(view);
		return res;
	};
}
