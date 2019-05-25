import { viewCompositionParser } from "../../../lib/src/parsing/parsers/composition/view-composition";
import { layersParser } from "../../../lib/src/parsing/parsers/layers";
import { ILayersViewJSON } from "../../../lib/src/interfaces/layers/layers";
import { IViewCompositionJSON } from "../../../lib/src/interfaces/view-composition";
import { LayersParentRenderer } from "../../../lib/src/renderer/composition/layers";
import { TestTools } from "../tools/tools";

/**
 * Test of Layers
 */
export function run(): void {
	const viewJSON: ILayersViewJSON = {
		mainLayer: {
			zIndex: 1,
			positionInsideHost: {
				vertical: {
					size: 100
				},
				horizontal: {
					size: 100
				}
			},
			component: {
				id: 1
			}
		},
		subLayers: [
			{
				zIndex: 0,
				positionInsideHost: {
					vertical: {
						start: 20,
						end: 20
					},
					horizontal: {
						start: 10,
						end: 10
					}
				},
				component: {
					id: 2
				}
			}
		]
	};
	const compositionJSON: IViewCompositionJSON = {
		hostId: 32,
		children: {}
	};

	const getView = TestTools.getMockViewProvider();
	const layersView = layersParser(viewJSON, getView);
	const componentRenderer = TestTools.getMockComponentRenderer2({
		1: 'red',
		2: 'green'
	});
	const renderer = new LayersParentRenderer(componentRenderer);
	const parentView = TestTools.getRootViewInserter();
	const getHost = TestTools.getMockViewProvider({
		32: layersView
	});
	const view = viewCompositionParser(compositionJSON, getView, getHost);
	renderer.build(view, parentView);
}
