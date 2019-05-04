import { ISizeJSON } from "../../lib/src/parser/interfaces/container";

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
