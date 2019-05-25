import { labelWFParser } from "../../../lib/src/parsing/parsers/label-wf";
import { ILabelWFViewJSON } from "../../../lib/src/interfaces/label-wf";
import { LabelWFRenderer } from "../../../lib/src/renderer/wireframe/label";
import { TestTools } from "../tools/tools";

/**
 * Icon
 */
export function run(): void {
	const labelViewJSON: ILabelWFViewJSON = {
		text: 'hello',
		style: {
			size: 1,
			color: 2
		}
	};
	const labelView = labelWFParser(labelViewJSON);
	const renderer = new LabelWFRenderer();
	const inserter = TestTools.getRootViewInserter();
	renderer.build(labelView, inserter);
}
