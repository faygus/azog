import { ISizeJSON } from "../parser/interfaces/container";
import { Size } from "../parser/entities/size";
import { ParsingUtils } from "../parser/code-analyse/utils";
import { IViewInserter } from "../renderer/html-renderer/interfaces/view-inserter";
import { applySize } from "../renderer/html-renderer/utils/apply-size";
import { IContentManager } from "../renderer/html-renderer/for-loop";

/**
 * Try to represent a layout (horizontal or vertical)
 * with content projection
 */

/**
 * Definition of a layout with constant margin between children
 * which can hold any children
 */
interface ILayoutHostJSON {
	direction: 'row' | 'column';
	margin: number; // px
	size: ISizeJSON;
}

export function run(): void {
	// TODO
	// const dataJSON: ILayoutHostJSON = {};
	// const data = parser(dataJSON);
	// render(data);
}
