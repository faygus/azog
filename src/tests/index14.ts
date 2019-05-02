import { forLoopParser } from '../parser/code-analyse/parsers/for-loop';
import { LayoutComposition } from '../parser/entities/layout-composition';
import { Unit } from '../parser/entities/unit';
import { IForLoopJSON } from '../parser/interfaces/for-loop';
import { ContentManager, ForLoopRenderer, IContentManagerProvider } from '../renderer/html-renderer/for-loop';
import { IViewInserter } from '../renderer/html-renderer/interfaces/view-inserter';
import { TestTools } from './tools/tools';

/**
 * For loop
 */
export function run(): void {
	console.log('show forLoopView');
	const dataJSON: IForLoopJSON = {
		array: ['foo', 'foo', 'foo', 'foo'],
		template: {
			componentId: 1
		},
		containerId: 2
	};
	const getView = TestTools.getMockViewProvider();
	const data = forLoopParser(dataJSON, getView);
	const rootHtml = TestTools.getRootHtml();
	const viewInserter = TestTools.getViewInserter(rootHtml);
	const mockComponentRenderer = TestTools.getMockComponentRenderer({ 1: 'yellow' });
	const contentManagerProvider: IContentManagerProvider = {
		get: (container: any, inserter: IViewInserter) => {
			const layoutHost = new LayoutComposition('row', 20, { value: 170, unit: Unit.PX });
			let res = new ContentManager(layoutHost, inserter);
			if (container === 2) {
				const layoutHost = new LayoutComposition('column', 10, { value: 170, unit: Unit.PX });
				res = new ContentManager(layoutHost, inserter);
			}
			return res;
		}
	};
	const renderer = new ForLoopRenderer(mockComponentRenderer, contentManagerProvider);
	renderer.build(data, viewInserter);
}
