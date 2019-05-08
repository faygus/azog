import { ILayersViewJSON } from "../../../lib/src/parser/interfaces/layers";
import { layersParser } from "../../../lib/src/parser/code-analyse/parsers/layers";
import { TestTools } from "../tools/tools";
import { LayersRenderer } from "../../../lib/src/renderer/layers";

/**
 * Test of Layers
 */
export function run(): void {
	const viewJSON: ILayersViewJSON = {
		mainLayer: {
			zIndex: 0,
			positionInsideHost: {
				vertical: {
					start: 0,
					end: 0
				},
				horizontal: {
					start: 0,
					end: 0
				}
			},
			component: {
				componentId: 1
			}
		},
		subLayers: [
			{
				zIndex: 1,
				positionInsideHost: {
					vertical: {
						start: 100,
						end: 30
					},
					horizontal: {
						start: 5,
						end: 200
					}
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
