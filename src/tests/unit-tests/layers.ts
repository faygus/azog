import { ILayersViewJSON } from "../../parser/interfaces/layers";
import { layersParser } from "../../parser/code-analyse/parsers/layers";
import { TestTools } from "../tools/tools";
import { LayersRenderer } from "../../renderer/layers";

/**
 * Test of Layers
 */
export function run(): void {
	const viewJSON: ILayersViewJSON = {
		mainLayer: {
			zIndex: 1,
			positionInsideHost: {
				padding: 30
			},
			component: {
				componentId: 1
			}
		},
		subLayers: [
			{
				zIndex: 0,
				positionInsideHost: {
					padding: 10
				},
				component: {
					componentId: 2
				}
			}
		]
	};

	const getView = TestTools.getMockViewProvider();
	const view = layersParser(viewJSON, getView);
	const componentRenderer = TestTools.getMockComponentRenderer2({
		1: 'red',
		2: 'green'
	});
	const renderer = new LayersRenderer(componentRenderer);
	const parentView = TestTools.getRootViewParent();
	renderer.build(view, parentView);
}
